import React from 'react'
import CommonModel from './CommonModel'

const SignUp:React.FC = ()=>{
  return <CommonModel title="Sign Up" message="Already a member?" transferText="Log In"
  transferTo="/login" isPassword={1} isForget={0} submitText="Sign Up"/>
}

export default SignUp