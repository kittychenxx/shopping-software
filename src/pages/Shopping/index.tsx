import React from 'react'
import {useHistory} from 'react-router-dom'
import {clearCookie} from '../../components/Cookie'

const Shopping:React.FC = ()=>{
  let history = useHistory()
  function loginOut(){
    clearCookie()
    history.push('/')
  }
  return <>
    <h1>shopping</h1>
    <button onClick={loginOut}>登出</button>
  </>
}

export default Shopping