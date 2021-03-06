import React, { useEffect, useState, useCallback, useRef } from 'react'
import '../../sass/login.sass'
import { Link, useHistory } from 'react-router-dom'
import { Button, message } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { IUserInfoType } from '../../stores/Login'
import {
  getToken,
  getLoginResult, 
  getSignUpResult,
  getEmailResult,
  getUpdatePwdResult
} from '../../api/Xiqi'
import {setCookie} from '../../components/Cookie'
import md5 from 'js-md5'
import {emailTest,passwordTest} from '../../components/Reg'

export interface IModelType {
  title: string
  submitText: string
  pageType: number
  isPassword: number
  isForget: number
  store: IUserInfoType
  message?: string
  transferText?: string
  transferTo?: string
}

function Transfer(transferText: string | undefined, transferTo: string | undefined) {
  if (transferText) {
    // 类型断言要这样写
    transferTo = transferTo as string
    return <Link className='toSwitchPageLink' to={transferTo}>{transferText}</Link>
  }
}

function isForget(isForget: number | undefined) {
  if (isForget) {
    let a = '/forgetPassword'
    return <div className='forget-password'>
      <Link className='forget-text' to={a}>Forget password</Link>
    </div>
  }
}

const CommonModel: React.FC<IModelType> = (props) => {
  let { store } = props
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let pwd = useRef("")
  pwd.current = password
  // 这种没有依赖的函数可以用useCallback优化,永远不更新
  const inputEmailChange = useCallback((e:any)=>{
    // 可以通过e.target.propsName来获取受控组件的属性值
    // console.log(e.target.name);  
    setEmail(e.target.value)
  }, [])
  const keySubmit = (e:any)=>{
    if(e.keyCode === 13){
      formSubmit(props.pageType, store.email !== '' ? store.email : email, password)
    }
  }
  const inputPasswordChange = useCallback((e: any) => {
    setPassword(e.target.value)
  }, [])
  // 用下面这种方式优化,性能未必会提高
  // useCallback优化,查看依赖变了创建新函数,没变返回函数缓存地址
  // 不用useCallback优化,视图更新创建新的函数
  // 创建函数的性能开销不一定比查看依赖是否变化了小
  const isPassword = (isPassword: number | undefined) => {
    if (isPassword) {
      return <div className='login-input-container'>
        <label className='login-input-label'>Password</label>
        <input className='login-input' value={pwd.current} type='password' onChange={inputPasswordChange} onKeyDown={keySubmit}></input>
      </div>
    }
    // 依赖的pwd是不变化的,useCallback对依赖进行浅比较,为何要使用useRef为了避免esLint对使用却不依赖的变量报警告
  }
  let history = useHistory();
  function formSubmit(pageType: number, email: string, password: string): void {
    if (!emailTest(email)) {
      message.warning('邮箱格式不正确')
      return
    }
    if ((!passwordTest(password)) && (pageType !== 2)) {
      message.warning('密码必须包含大写字母,小写字母,数字,且长度是6-16位')
      return
    }
    if(pageType === 0){
      getToken().then(res=>{
        let token = res;
        password = md5(md5(password) + token + '二层加密应该更加复杂')
        getLoginResult({email: email, password: password}).then(res=>{                       
          if(res){
            message.success('登录成功')
            setCookie('isLogin', 1, 1 / (24))
            setCookie('uname', email, 1 / (24))
            history.push('/index')
          }else{
            message.error('用户信息不正确')  
          }
        })    
      })
    }else if(pageType === 1){
      password = md5(password)
      getSignUpResult({email: email, password: password}).then(res=>{                
        if(res){
          message.success('注册成功')
          history.push('/login')
        }else{
          message.warning('email已经注册过了')
        }          
      })   
    }else if(pageType === 2){
      getEmailResult({email: email}).then(res=>{        
        if(res === 1){
          message.success('请输入新的密码')
          store.changeEmail(email)
          history.push('/createNewPwd')
        } else {
          message.warning('没有这个用户')
        }
      })
    }else if(pageType === 3){
      password = md5(password)
      getUpdatePwdResult({email: email, password: password}).then(res=>{
        if(res === 0){
          message.info('新密码与旧密码相同')
        } else if (res === 1) {
          message.success('修改成功')
          store.changeEmail('')
          history.push('/login')
        } else { message.error('修改失败,请重试') }
      })
    }
  }
  // 这个函数就不用useCallback优化
  function getEmailInput(pageType: number) {
    if (pageType === 3) {
      return <input value={store.email} onChange={inputEmailChange} className='login-input' onKeyDown={keySubmit}></input>
    }else{
      return <input value={email} name='email' onChange={inputEmailChange} className='login-input' onKeyDown={keySubmit}></input>
    }
  }

  // 这个useEffect需要用依赖,只要mounted执行就行,updated不需要执行
  useEffect(() => {
    if (props.pageType === 3) {
      if (store.email === '') {
        message.warning('当前页面您无法访问')
        setTimeout(() => {
          history.push('/login')
        }, 1000)
      }
    }
  }, [props, store, history])

  return <div className='login-container'>
    <div className='login-box'>
      <h1 className='login-title'>{props.title}</h1>
      <div className='toSignOrLogin'>
        <span className='to-text'>{props.message}</span>
        {Transfer(props.transferText, props.transferTo)}
      </div>
      <div className='login-form'>
        <div className='login-input-container'>
          <label className='login-input-label'>Email</label>
          {getEmailInput(props.pageType)}
        </div>
        {isPassword(props.isPassword)}
        {isForget(props.isForget)}
        {/* button不能监听onKeyDown input才可以 因为监听事件需要聚焦,button聚焦的时候就已经被click了 */}
        <button className='login-submit' onClick={() => { formSubmit(props.pageType, store.email !== '' ? store.email : email, password) }}>{props.submitText}</button>
      </div>
    </div>
    <Button onClick={() => { history.push('/') }} className="close-btn" type='text' icon={<CloseOutlined />}></Button>
  </div>
}

export default CommonModel