import React from 'react'
import CommonModel from './CommonModel'
import LoginStore from '../../stores/Login'

const ForgetPassword:React.FC = ()=>{
  return <CommonModel store={LoginStore} title="Create New Password" message="Please enter your email address"
  isPassword={0} isForget={0} submitText="Create Password" pageType={2} />
}

export default ForgetPassword