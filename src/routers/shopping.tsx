// 使用react路由懒加载需要引入Suspense
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const Shopping = React.lazy(() => import(/*webpackChunkName:"Shopping" */ '../pages/Shopping/index'))
const FAQ = React.lazy(() => import(/*webpackChunkName:"FAQ" */ '../pages/FAQ/index'))
const Contact = React.lazy(() => import(/*webpackChunkName:"Contact" */ '../pages/Contact/index'))
const NotFound = React.lazy(() => import(/*webpackChunkName:"NotFound" */ '../components/NotFound'))
const Login = React.lazy(() => import(/*webpackChunkName:"Login" */ '../pages/LoginAndSignUp/index'))

const ShopRouters: React.FC = function () {
  return <BrowserRouter>
    <Switch>
      <Route path='/index' exact component={Shopping}></Route>
      <Route path='/index/FAQ' component={FAQ}></Route>
      <Route path='/index/Contact' component={Contact}></Route>
      {/* /login要在重新匹配一次,因为子路由表不能去匹配父路由表的内容 */}
      <Route path='/login' component={Login}></Route>
      <Route path='/*' component={NotFound}></Route>
    </Switch>
  </BrowserRouter>
}

export default ShopRouters