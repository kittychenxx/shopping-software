import React, { useState } from 'react'
import '../sass/footer.sass'
import {getSubscribeResult} from '../api/Xiqi'
import {emailTest} from './Reg'
import { message } from 'antd'

const Footer: React.FC = () => {
  let [ipt, setIpt] = useState("")

  const subscribe = ()=>{
    if(!emailTest(ipt)){
      message.error("邮箱格式不正确")
      return
    }
    getSubscribeResult({email: ipt}).then(res=>{
      if(res === 1){
        message.success("订阅成功!!!")
      }else if(res === 0){
        message.warn("该邮箱已经订阅过了")
      }else if(res === -1){
        message.error("订阅失败,请重试")
      }
    })
  }

  return <footer className="footer-container">
    <div className="footer-contact-container">
      <div className="main-content">
        <ul className="content-left">
          <li>Shipping & Returns</li>
          <li>Store Policy</li>
          <li>Payment Methods</li>
        </ul>
        <ul className="content-middle">
          <li>Contact</li>
          <li>Tel: 123-456-7890</li>
          <li>info@my-domain.com</li>
        </ul>
        <ul className="content-right">
          <li>Facebook</li>
          <li>Instagram</li>
          <li>Pinterest</li>
        </ul>
        <div className="footer-subscribe">
          <p>Join our mailing list and never miss an update</p>
          <label>Email</label>
          <div className="sub-input-container">
            <input value={ipt} onChange={(e)=>{setIpt(e.target.value)}} placeholder="Enter your email here*" className='sub-input'></input>
            <button className="sub-btn" onClick={subscribe}>Subscribe Now</button>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-copyright">© 2023 by Tote. Proudly created with Wix.com</div>
  </footer>
}

export default Footer