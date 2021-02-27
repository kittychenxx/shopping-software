import React from 'react'
import {observer} from 'mobx-react'
import {IHomeType} from '../../stores/Home'

const Home: React.FC<IHomeType> = observer(props=>{   
  let {pageName, countCompute, colorChange} = props 
  return <div className='box'>
    <h1>{pageName}</h1>
    <h2>{countCompute.count}</h2>
    <h2 style={{color: colorChange.color}}>{countCompute.twoCount}</h2>
    <button onClick={countCompute.addFive}>+5</button>
    <button onClick={countCompute.minusFive}>-5</button>
    <button onClick={colorChange.changeYellow}>黄色</button>
    <button onClick={colorChange.changeRed}>红色</button>
  </div>
})

export default Home