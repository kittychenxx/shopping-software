import React from 'react'
import CommonModel from './CommonModel'
import LoginStore from '../../stores/Login'

const Login:React.FC = ()=>{
  return <CommonModel store={LoginStore} title="Log In" message="New to this site?" transferText="Sign Up"
  transferTo="/signup" isPassword={1} isForget={1} submitText="Log In" pageType={0} />
}

export default Login