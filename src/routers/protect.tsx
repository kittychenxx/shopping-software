// 路由守卫
import {Route, Redirect} from 'react-router-dom'
import HeaderStore from '../models/Shopping/Header'
import {getCookie} from '../components/Cookie'

interface IProps{
    path: string
    component: any
    [key: string]: any
}
const Protect: React.FC<IProps> = (props: IProps) => {
    let isLogin = getCookie('isLogin')
    HeaderStore.changeIsLogin(Number(isLogin))
    if(!HeaderStore.isLogin){
        return <Redirect to='/login'/>
    }
    return <Route {...props}></Route>
}

export default Protect