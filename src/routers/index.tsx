// 使用react路由懒加载需要引入Suspense
import React, { Suspense } from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import Loading from '../components/Loading'

const Login = React.lazy(() => import(/*webpackChunkName:"Login" */ '../pages/Login/index'))
const NotFound = React.lazy(() => import(/*webpackChunkName:"NotFound" */ '../components/NotFound'))

const App: React.FC = function () {
  return <HashRouter>
    <Suspense fallback={<Loading/>}>
      <Redirect path='/' exact to='/index'></Redirect>
      <Switch>
        <Route path='/login' exact component={Login}></Route>
        <Route path='/*' component={NotFound}></Route>
      </Switch>
    </Suspense>
  </HashRouter>
}

export default App