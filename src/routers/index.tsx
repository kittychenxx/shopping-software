// 使用react路由懒加载需要引入Suspense
import React, { Suspense } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Loading from '../components/Loading'

const Login = React.lazy(() => import(/*webpackChunkName:"Login" */ '../pages/LoginAndSignUp/index'))
const SignUp = React.lazy(() => import(/*webpackChunkName:"Login" */ '../pages/LoginAndSignUp/SignUp'))
const ForgetPassword = React.lazy(() => import(/*webpackChunkName:"Login" */ '../pages/LoginAndSignUp/ForgetPassword'))
const NotFound = React.lazy(() => import(/*webpackChunkName:"NotFound" */ '../components/NotFound'))

const App: React.FC = function () {
  return <BrowserRouter>
    <Suspense fallback={<Loading/>}>
      <Switch>
        <Route path='/login' exact component={Login}></Route>
        <Route path='/signup' exact component={SignUp}></Route>
        <Route path='/forgetPassword' exact component={ForgetPassword}></Route>
        <Route path='/*' component={NotFound}></Route>
      </Switch>
    </Suspense>
  </BrowserRouter>
}

export default App