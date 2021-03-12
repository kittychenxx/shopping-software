import React from 'react';
import ReactDOM from 'react-dom';
import App from './routers/index'
import {configure} from 'mobx'
import zhCN from 'antd/lib/locale/zh_CN';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import {ConfigProvider} from 'antd'

configure({ enforceActions: "observed"}) 

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <App/>
  </ConfigProvider>,
  document.getElementById('root')
);
