import React from 'react'
import CommonModel from './CommonModel'

const Login:React.FC = ()=>{
  return <CommonModel title="Log In" message="New to this site?" transferText="Sign Up"
  transferTo="/signup" isPassword={1} isForget={1} submitText="Log In"/>
}

export default Login