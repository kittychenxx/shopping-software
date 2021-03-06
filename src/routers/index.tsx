// 使用react路由懒加载需要引入Suspense
import React, { Suspense } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Loading from '../components/Loading'
import '../normalize.css';
import '../sass/common.sass'

const Login = React.lazy(() => import(/*webpackChunkName:"Login" */ '../pages/LoginAndSignUp/index'))
const Shopping = React.lazy(() => import(/*webpackChunkName:"Shopping" */ './shopping'))
const SignUp = React.lazy(() => import(/*webpackChunkName:"SignUp" */ '../pages/LoginAndSignUp/SignUp'))
const ForgetPassword = React.lazy(() => import(/*webpackChunkName:"ForgetPassword" */ '../pages/LoginAndSignUp/ForgetPassword'))
const CreateNewPwd = React.lazy(() => import(/*webpackChunkName:"CreateNewPwd" */ '../pages/LoginAndSignUp/CreateNewPwd'))
const NotFound = React.lazy(() => import(/*webpackChunkName:"NotFound" */ '../components/NotFound'))

const App: React.FC = function () {
  return <BrowserRouter>
    <Suspense fallback={<Loading />}>
      <Switch>
        {/* 问题记录: Redirect必须在switch里,否则一定会重定向 */}
        <Redirect exact path='/' to='/index'></Redirect>
        <Route path='/login' component={Login}></Route>
        <Route path='/signup' component={SignUp}></Route>
        <Route path='/forgetPassword' component={ForgetPassword}></Route>
        <Route path='/createNewPwd' component={CreateNewPwd}></Route>
        <Route path='/index' component={Shopping}></Route>
        <Route path='/*' component={NotFound}></Route>
      </Switch>
    </Suspense>
  </BrowserRouter>
}

export default App