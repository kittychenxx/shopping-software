import React, {useState, useEffect, useRef} from 'react'
import '../../sass/shopping/viewQuick.sass'
import { Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import {
  DownOutlined,
  UpOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom'

interface IProps{
  modelStyle: {display: string}
  toggleModelDisplay: any
}

const ViewQuick: React.FC<IProps> = (props) => {
  let [quickShowAreaStyle, setQuickShowAreaStyle] = useState({})
  let ref = useRef(quickShowAreaStyle)
  let [goodNum, setGoodNum] = useState(1)
  let [numControlStyle, setNumControlStyle] = useState({})

  useEffect(()=>{
    if(goodNum === 1){
      setNumControlStyle({opacity: '.3', cursor: "default"})
    }else{
      setNumControlStyle({})
    }
  }, [goodNum])

  const changeGoodNum = (num: number)=>{
    if(goodNum === 1 && num === -1) return
    setGoodNum(goodNum + num)
  }

  useEffect(()=>{
    if(goodNum < 1){
      setGoodNum(1)
    } 
  },[goodNum])

  useEffect(()=>{    
    let viewHeight = document.documentElement.clientHeight
    if(viewHeight > 750){
      setQuickShowAreaStyle({...ref.current, marginTop: "130px"})
    }
  }, [ref])

  let colorList = [
    {
      id: '1',
      color: 'rgb(255, 85, 0)'
    },
    {
      id: '2',
      color: 'rgb(255, 192, 203)'
    }
  ]
  const changeGoodColor = (e: any)=>{   
    colorList.forEach((item,index)=>{
      // 注意: 直接用document.querySelector获取的DOM ts会报上面无style属性
      e.target.parentNode.parentNode.childNodes[index].style.border = ``
      if(item.color === e.target.style.backgroundColor){
        e.target.parentNode.style.border = `1px solid ${item.color}`
      }
    })
  }
  
  return <div className="shopping-mask" style={props.modelStyle}>
    <div className="quick-view-container" style={quickShowAreaStyle}>
      <div className="img-show-area">
        <img alt="这放产品的名子" src="https://static.wixstatic.com/media/45d10e_15641be40e0c43d89f5426f8949b51bd~mv2.jpg/v1/fill/w_492,h_492,al_c,q_85,usm_0.66_1.00_0.01/45d10e_15641be40e0c43d89f5426f8949b51bd~mv2.webp"></img>
        <div className="img-switch-dot">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <section className="goods-quick-view">
        <h1>I'm a product</h1>
        <div className="quickView-price-sku">
          <span className="price">$15.00</span>
          <span className="sku">SKU: 0012</span>
        </div>
        <div className="quickView-color-quantity">
          <span className="color-label">Color: Light green</span>
          <ul className="color-list" onClick={(e)=>{changeGoodColor(e)}}>
            {
              colorList.map(item=>{
                return <li key={item.id}><span style={{backgroundColor: item.color}}></span></li>
              })
            }
          </ul>
          <span className="quantity-label">Quantity</span>
          <div className="quantity-select">
            <input value={goodNum} onChange={(e)=>{setGoodNum(Number(e.target.value))}} className="goods-number-ipt"/>
            <div className="goodNum-control">
              <span onClick={()=>{changeGoodNum(1)}}><UpOutlined /></span>
              <span style={numControlStyle} onClick={()=>{changeGoodNum(-1)}}><DownOutlined /></span>
            </div>
          </div>
        </div>
        <div className="quick-view-addToCart">Add to Cart</div>
        <Link className="view-more-details" to="/index">View More Details</Link>
      </section>
      <Button onClick={props.toggleModelDisplay} className="goods-select-close" type='text' icon={<CloseOutlined />}></Button>
    </div>
  </div>
}

export default ViewQuick