import React from 'react';
import ReactDOM from 'react-dom';
import './normalize.css';
import App from './routers/index'
import AppStore from './stores'
import {configure} from 'mobx'

// mobx开启严格模式
configure({ enforceActions: "observed"}) 

// 将导出的store类成store实例
let pageStore = new AppStore()

ReactDOM.render(
  // 需要在哪个组件用这个store直接将其作为props传给这个组件即可,不需要Provider
  <App testStore={pageStore}/>,
  document.getElementById('root')
);
