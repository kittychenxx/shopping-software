import React, {useEffect, useState} from 'react'
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
  function isPassword(isPassword: number|undefined){
    if(isPassword){
      return <div className='login-input-container'>
        <label className='login-input-label'>Password</label>
        <input value={password} type='password' onChange={inputPasswordChange} className='login-input'></input>
      </div>
    }
  }
  function inputEmailChange(e:any){
    setEmail(e.target.value)
  }
  function inputPasswordChange(e:any){
    setPassword(e.target.value)
  }

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

  function getEmailInput(pageType: number){    
    if(pageType === 3){
      return <input value={store.email} onChange={inputEmailChange} className='login-input'></input>
    }else{
      return <input value={email} onChange={inputEmailChange} className='login-input'></input>
    }
  }

  useEffect(()=>{
    if(props.pageType === 3){
      if(store.email === ''){
        message.warning('当前页面您无法访问')
        setTimeout(()=>{
          history.push('/login')
        }, 1000)
      }
    }
  })

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