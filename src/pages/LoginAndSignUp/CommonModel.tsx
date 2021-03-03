import React, {useEffect, useState, useCallback, useRef} from 'react'
import '../../sass/login.sass'
import {Link, useHistory} from 'react-router-dom'
import { Button, message } from 'antd'
import {CloseOutlined} from '@ant-design/icons'
import {IUserInfoType} from '../../stores/Login'
import {
  getLoginResult, 
  getSignUpResult,
  getEmailResult,
  getUpdatePwdResult
} from '../../api/Xiqi'
import {setCookie} from '../../components/Cookie'

export interface IModelType{
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

function Transfer(transferText:string|undefined, transferTo: string|undefined){
  if(transferText){
    // 类型断言要这样写
    transferTo = transferTo as string
    return <Link className='toSwitchPageLink' to={transferTo}>{transferText}</Link>
  }
}

function isForget(isForget: number|undefined){
  if(isForget){
    return <div className='forget-password'>
      <Link className='forget-text' to='/forgetPassword'>Forget password</Link>
    </div>
  }
}

const CommonModel:React.FC<IModelType> = (props)=>{
  let {store} = props
  let [email, setEmail] = useState("")  
  let [password, setPassword] = useState("") 
  let pwd = useRef("")
  pwd.current = password
  // 这种没有依赖的函数可以用useCallback优化,永远不更新
  const inputEmailChange = useCallback((e:any)=>{
    setEmail(e.target.value)
  },[])
  const inputPasswordChange = useCallback((e:any)=>{
    setPassword(e.target.value)
  },[])
  // 用下面这种方式优化,性能未必会提高
  // useCallback优化,查看依赖变了创建新函数,没变返回函数缓存地址
  // 不用useCallback优化,视图更新创建新的函数
  // 创建函数的性能开销不一定比查看依赖是否变化了小
  const isPassword = useCallback((isPassword: number|undefined)=>{
    if(isPassword){
      return <div className='login-input-container'>
        <label className='login-input-label'>Password</label>
        <input value={pwd.current} type='password' onChange={inputPasswordChange} className='login-input'></input>
      </div>
    }
  // 依赖的pwd是不变化的,useCallback对依赖进行浅比较,为何要使用useRef为了避免esLint对使用却不依赖的变量报警告
  }, [inputPasswordChange, pwd])    
  let history = useHistory();
  function formSubmit(pageType: number, email: string, password: string):void{    
    let regEmail = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
    let reg1 = /^[0-9a-zA-Z]{6,16}$/
    let reg2 = /[0-9]+/
    let reg3 = /[a-z]+/
    let reg4 = /[A-Z]+/
    if(!regEmail.test(email)){
      message.warning('邮箱格式不正确')
      return
    }
    if((!(reg1.test(password)&&reg2.test(password)&&reg3.test(password)&&reg4.test(password)))&&(pageType!==2)){
      message.warning('密码必须包含大写字母,小写字母,数字,且长度是6-16位')
      return
    }
    if(pageType === 0){
      if(email==='' || password===''){
        message.error('邮箱或密码不能为空')
      }else{
        getLoginResult({email: email, password: password}).then(res=>{
          if(res){
            message.success('登录成功')
            setCookie('isLogin', 1, 1 / (24 * 60))
            setCookie('uname', email, 1 / (24 * 60))
            history.push('/')
          }else{
            message.error('用户信息不正确')
          }
        })
      }
    }else if(pageType === 1){
      if(email==='' || password===''){
        message.error('邮箱或密码不能为空')
      }else{
        getSignUpResult({email: email, password: password}).then(res=>{                
          if(res){
            message.success('注册成功')
            history.push('/login')
          }else{
            message.warning('email已经注册过了')
          }          
        })
      }   
    }else if(pageType === 2){
      getEmailResult({email: email}).then(res=>{        
        if(res === 1){
          message.success('请输入新的密码')
          store.changeEmail(email)
          history.push('/createNewPwd')
        }else{
          message.warning('没有这个用户')
        }     
      })
    }else if(pageType === 3){
      getUpdatePwdResult({email: email, password: password}).then(res=>{
        if(res === 0){
          message.info('新密码与旧密码相同')
        }else if(res === 1){
          message.success('修改成功')
          store.changeEmail('')
          history.push('/login')
        }else{message.error('修改失败,请重试')}
      })   
    }
  }
  // 这个函数就不用useCallback优化
  function getEmailInput(pageType: number){    
    if(pageType === 3){
      return <input value={store.email} onChange={inputEmailChange} className='login-input'></input>
    }else{
      return <input value={email} onChange={inputEmailChange} className='login-input'></input>
    }
  }
  // 这个useEffect需要用依赖,只要mounted执行就行,updated不需要执行
  useEffect(()=>{
    if(props.pageType === 3){
      if(store.email === ''){
        message.warning('当前页面您无法访问')
        setTimeout(()=>{
          history.push('/login')
        }, 1000)
      }
    }
  }, [props,store,history])

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
        <button className='login-submit' onClick={()=>{formSubmit(props.pageType, store.email!==''?store.email:email, password)}}>{props.submitText}</button>
      </div>
    </div>
    <Button onClick={()=>{history.push('/')}} className="close-btn" type='text' icon={<CloseOutlined/>}></Button>
  </div>
}

export default CommonModel