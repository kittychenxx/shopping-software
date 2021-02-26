import React from 'react'
import '../sass/index.sass'
import {
  inject,
  observer,
} from 'mobx-react'
// 数据引入
@inject('store')
// 事件监听
@observer

class App extends React.Component<any, any>{
  render(){
    let {store} = this.props 
    return <div className='box'>{store.time}</div>
  }
}

export default App