import React, {useState} from 'react'
import '../../sass/shopping/product.sass'

interface IProps{
  background: string
  backgroundHover: string
  productName: string
  price: string
  markText?: string
}

const ProductItem: React.FC<IProps> = (props) => {
  let [isHover, setIsHover] = useState(false)
  const toggleHover = ()=>{
    setIsHover(!isHover)
  }
  let hoverStyle = !isHover ? {backgroundImage: `url(${props.background})`}
      :{backgroundImage: `url(${props.backgroundHover})`}
  return <li className="goods-item" onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
    <div className="image-container">
      <div className="image-content" style={hoverStyle}>
        <div className="image-info">Quick View</div>
      </div>
    </div>
    {
      props.markText ? <div className="goods-mark">{props.markText}</div> : null
    }
    <div className="goods-text-container">
      <h3>{props.productName}</h3>
      <hr></hr>
      <span>${props.price}</span>
    </div>
    <div className="Add-to-Cart-container">
      <div className="Add-to-Cart">Add to Cart</div>
    </div>
  </li>
}

export default ProductItem