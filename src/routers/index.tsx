import React from 'react'
import '../sass/index.sass'
import {observer, inject} from 'mobx-react'
import {autorun, reaction} from 'mobx'
import HomeStore, {IHomeType} from '../stores/Home'
import Home from '../pages/Home/'

// observer(()=>{})用来监控hooks组件
// inject('存储store的属性名')() 是个高阶组件类似redux的connect
// autorun, reaction都是用来对

let PageHomeStore:IHomeType = new HomeStore()

interface IProps{
  testStore: any
}

const App: React.FC<IProps> = observer(props=>{
  let {testStore} = props
  let add =  testStore.addTodo
  let unbound = testStore.unbound
  let a = { add }
  a.add = add
  a.add('nihao')
  unbound()
  testStore.fn()
  // 如果组件不用observer,还想监控数据采用autorun/reaction
  // 前提是store中用过@observable修饰,不管当前组件有没有用observer修饰,
  // 只要相应的数据变化了,reaction和autorun都会执行(推荐使用reaction)
  autorun(()=>{console.log(testStore.name)})
  reaction(()=>testStore.time, time=>{console.log(`time修改了: ${time}`)})
    
  return <div className='box'>
    <h1>{testStore.time}</h1>
    <h1>{testStore.name}</h1>
    <Home {...PageHomeStore}></Home>
  </div>
})

export default inject('testStore')(App)