import React from 'react';
import ReactDOM from 'react-dom';
import './normalize.css';
import App from './routers/index'
import { Provider } from 'mobx-react'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
