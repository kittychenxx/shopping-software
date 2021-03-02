import React from 'react'
import CommonModel from './CommonModel'
import LoginStore from '../../stores/Login'

const SignUp:React.FC = ()=>{
  return <CommonModel store={LoginStore} title="Sign Up" message="Already a member?" transferText="Log In"
  transferTo="/login" isPassword={1} isForget={0} submitText="Sign Up" pageType={1} />
}

export default SignUp