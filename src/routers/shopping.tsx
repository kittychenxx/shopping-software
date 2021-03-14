// 使用react路由懒加载需要引入Suspense
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const Shopping = React.lazy(() => import(/*webpackChunkName:"Shopping" */ '../pages/Shopping/index'))
const FAQ = React.lazy(() => import(/*webpackChunkName:"FAQ" */ '../pages/FAQ/index'))
const Contact = React.lazy(() => import(/*webpackChunkName:"Contact" */ '../pages/Contact/index'))
const NotFound = React.lazy(() => import(/*webpackChunkName:"NotFound" */ '../components/NotFound'))

const ShopRouters: React.FC = function () {
  return <BrowserRouter>
    <Switch>
      <Route path='/index' exact component={Shopping}></Route>
      <Route path='/index/FAQ' component={FAQ}></Route>
      <Route path='/index/Contact' component={Contact}></Route>
      <Route path='/*' component={NotFound}></Route>
    </Switch>
  </BrowserRouter>
}

export default ShopRouters