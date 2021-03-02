import React from 'react'
import CommonModel from './CommonModel'
import LoginStore from '../../stores/Login'

const SignUp:React.FC = ()=>{
  return <CommonModel store={LoginStore} title="Create New Password" isPassword={1} isForget={0} submitText="Confirm" pageType={3} />
}

export default SignUp