import React, { useEffect, useState, useRef } from 'react'
import '../sass/header.sass'
import {
  UserOutlined,
  WechatFilled,
  WeiboCircleFilled,
  TwitterOutlined,
  createFromIconfontCN
} from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { clearCookie } from '../components/Cookie'
import HeaderStore from '../models/Shopping/Header'
import {getCookie} from './Cookie'

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js', // icon-javascript, icon-java, icon-shoppingcart (overrided)
    '//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js', // icon-shoppingcart, icon-python
  ],
});

export interface IHeaderPropsType{
  pageType: number
  changePageType(newType: number):void
}

const Header: React.FC<IHeaderPropsType> = (props: IHeaderPropsType) => {
  let history = useHistory()
  function loginOut() {
    clearCookie()
    history.push('/index')
  }
  let isLogin = getCookie('isLogin')
  HeaderStore.changeIsLogin(Number(isLogin))
  let urls = ['/index', '', '/index/FAQ', '/index/Contact']
  
  let [pageType, setPageType] = useState([
    <li key='1' className="header-list-item-active">Shop</li>,
    <li key='2'>About</li>,
    <li key='3'>FAQ</li>,
    <li key='4'>Contact</li>,
  ])

  let pageTypeRef = useRef(pageType)

  useEffect(()=>{
    pageTypeRef.current = pageTypeRef.current.map((item, index)=>{      
      item = item.props.className === "header-list-item-active" ? <li key={item.key}>{item.props.children}</li> : item
      item = index === HeaderStore.type ? <li className="header-list-item-active" key={item.key}>{item.props.children}</li> : item
      return item
    })
    setPageType(pageTypeRef.current)
  }, [])
  
  const changePageType = (e:any) => {
      pageType.forEach(item => {
      if(item.props.children === e.target.innerText){
        let key = Number(item.key) - 1
        props.changePageType(key) 
        history.push(urls[key])       
      }      
    })
  }
  
  return <header className="header-container">
    <div className="header-left-title">
      <Link to='/index' className="header-logo">Tote</Link>
      <Link to='/index' className="header-logo-des">Funky Printed Bags</Link>
    </div>
    <div className="header-middle-list">
      <ul className="header-list-item" onClick={(e)=>{changePageType(e)}}>
        {
          pageType.map(item=>item)
        }
      </ul>
    </div>
    <div className="header-right-select">
      <ul className="header-right-list">
        <li className="header-login">
          {
            HeaderStore.isLogin ? 
            <span className="header-loginOut-container">
              <UserOutlined />
              <span className="header-login-text" onClick={loginOut}>Log Out</span>
            </span>
            : 
            <Link to="/login">
              <UserOutlined />
              <span className="header-login-text">Log In</span>
            </Link>
          }
        </li>
        <li>
          <a href='https://www.baidu.com/'><WechatFilled /></a>
        </li>
        <li>
          <a href='https://www.baidu.com/'><WeiboCircleFilled /></a>
        </li>
        <li>
          <a href='https://www.baidu.com/'><TwitterOutlined /></a>
        </li>
        <li><IconFont type="icon-shoppingcart" /></li>
      </ul>
    </div>
  </header>
}

export default Header