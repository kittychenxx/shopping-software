import React, { useState } from 'react'
import '../sass/footer.sass'

const Footer: React.FC = () => {
  let [ipt, setIpt] = useState("")

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
            <button className="sub-btn">Subscribe Now</button>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-copyright">© 2023 by Tote. Proudly created with Wix.com</div>
  </footer>
}

export default Footer