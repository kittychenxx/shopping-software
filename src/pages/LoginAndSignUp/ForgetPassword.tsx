import React from 'react'
import CommonModel from './CommonModel'

const ForgetPassword:React.FC = ()=>{
  return <CommonModel title="Create New Password" message="Please enter your email address"
  isPassword={0} isForget={0} submitText="Create Password"/>
}

export default ForgetPassword