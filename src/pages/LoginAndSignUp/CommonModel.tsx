import React from 'react'
import '../../sass/login.sass'
import {Link} from 'react-router-dom'
import { Button } from 'antd'
import {CloseOutlined} from '@ant-design/icons'

export interface IModelType{
  title: string
  message: string
  transferText?: string
  transferTo?: string
  isPassword?: number
  isForget?: number
  submitText: string
}

function Transfer(transferText:string|undefined, transferTo: string|undefined){
  if(transferText){
    // 类型断言要这样写
    transferTo = transferTo as string
    return <Link className='toSwitchPageLink' to={transferTo}>{transferText}</Link>
  }
}

function isPassword(isPassword: number|undefined){
  if(isPassword){
    return <div className='login-input-container'>
      <label className='login-input-label'>Password</label>
      <input className='login-input'></input>
    </div>
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
  return <div className='login-container'>
    <div className='login-box'>
      <h1 className='login-title'>{props.title}</h1>
      <div className='toSignOrLogin'>
        <span className='to-text'>{props.message}</span>
        {Transfer(props.transferText, props.transferTo)}
      </div>
      <form className='login-form'>
        <div className='login-input-container'>
          <label className='login-input-label'>Email</label>
          <input className='login-input'></input>
        </div>
        {isPassword(props.isPassword)}
        {isForget(props.isForget)}
        <button className='login-submit'>{props.submitText}</button>
      </form>
    </div>
    <Button className="close-btn" type='text' icon={<CloseOutlined/>}></Button>
  </div>
}

export default CommonModel