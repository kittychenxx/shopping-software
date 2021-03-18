import React, { useState } from 'react'
import { getMockResult, getMockPostResult } from '../../api/Xiqi'

const TestMock: React.FC = () => {
  let [result, setResult] = useState('')
  getMockResult().then(res=>{
    setResult(res)
  })
  const postSend = ()=>{
    getMockPostResult({name: 'dingsiwen'})
  }
  return <>
    <h1>{result}</h1>
    <button onClick={postSend}>post请求</button>
  </> 
}

export default TestMock