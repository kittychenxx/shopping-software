import React, {useState} from 'react'
import Header from '../../components/Header'
import '../../sass/shopping/shopping.sass'
import HeaderStore from '../../models/Shopping/Header'
import About from '../Shopping/About'
import Footer from '../../components/Footer'
import ProductItem from './Product'
import ViewQuick from './ViewQuick'

const Shopping: React.FC = () => {
  let goods = [
    {
      id: "1",
      backgroundImg: "https://static.wixstatic.com/media/45d10e_dd5d9543998c4c0f9ecf120fac20ffb0~mv2.jpg/v1/fill/w_370,h_370,al_c,q_80,usm_0.66_1.00_0.01/45d10e_dd5d9543998c4c0f9ecf120fac20ffb0~mv2.webp",
      markText: "Top Sellers",
      backgroundHover: "https://static.wixstatic.com/media/45d10e_35c84fb1d48540f1886b2ceb7a342c37~mv2_d_3500_1968_s_2.jpg/v1/fill/w_370,h_370,al_c,q_80,usm_0.66_1.00_0.01/45d10e_35c84fb1d48540f1886b2ceb7a342c37~mv2_d_3500_1968_s_2.webp",
      productName: "I'm a product",
      price: "15.00",
    },
    {
      id: "2",
      backgroundImg: "https://static.wixstatic.com/media/45d10e_dd5d9543998c4c0f9ecf120fac20ffb0~mv2.jpg/v1/fill/w_370,h_370,al_c,q_80,usm_0.66_1.00_0.01/45d10e_dd5d9543998c4c0f9ecf120fac20ffb0~mv2.webp",
      backgroundHover: "https://static.wixstatic.com/media/45d10e_35c84fb1d48540f1886b2ceb7a342c37~mv2_d_3500_1968_s_2.jpg/v1/fill/w_370,h_370,al_c,q_80,usm_0.66_1.00_0.01/45d10e_35c84fb1d48540f1886b2ceb7a342c37~mv2_d_3500_1968_s_2.webp",
      productName: "I'm a product",
      price: "15.00",
    },
    {
      id: "3",
      backgroundImg: "https://static.wixstatic.com/media/45d10e_dd5d9543998c4c0f9ecf120fac20ffb0~mv2.jpg/v1/fill/w_370,h_370,al_c,q_80,usm_0.66_1.00_0.01/45d10e_dd5d9543998c4c0f9ecf120fac20ffb0~mv2.webp",
      markText: "Top Sellers",
      backgroundHover: "https://static.wixstatic.com/media/45d10e_35c84fb1d48540f1886b2ceb7a342c37~mv2_d_3500_1968_s_2.jpg/v1/fill/w_370,h_370,al_c,q_80,usm_0.66_1.00_0.01/45d10e_35c84fb1d48540f1886b2ceb7a342c37~mv2_d_3500_1968_s_2.webp",
      productName: "I'm a product",
      price: "15.00",
    },
    {
      id: "4",
      backgroundImg: "https://static.wixstatic.com/media/45d10e_dd5d9543998c4c0f9ecf120fac20ffb0~mv2.jpg/v1/fill/w_370,h_370,al_c,q_80,usm_0.66_1.00_0.01/45d10e_dd5d9543998c4c0f9ecf120fac20ffb0~mv2.webp",
      markText: "Sale",
      backgroundHover: "https://static.wixstatic.com/media/45d10e_35c84fb1d48540f1886b2ceb7a342c37~mv2_d_3500_1968_s_2.jpg/v1/fill/w_370,h_370,al_c,q_80,usm_0.66_1.00_0.01/45d10e_35c84fb1d48540f1886b2ceb7a342c37~mv2_d_3500_1968_s_2.webp",
      productName: "I'm a product",
      price: "15.00",
    },
    {
      id: "5",
      backgroundImg: "https://static.wixstatic.com/media/45d10e_dd5d9543998c4c0f9ecf120fac20ffb0~mv2.jpg/v1/fill/w_370,h_370,al_c,q_80,usm_0.66_1.00_0.01/45d10e_dd5d9543998c4c0f9ecf120fac20ffb0~mv2.webp",
      backgroundHover: "https://static.wixstatic.com/media/45d10e_35c84fb1d48540f1886b2ceb7a342c37~mv2_d_3500_1968_s_2.jpg/v1/fill/w_370,h_370,al_c,q_80,usm_0.66_1.00_0.01/45d10e_35c84fb1d48540f1886b2ceb7a342c37~mv2_d_3500_1968_s_2.webp",
      productName: "I'm a product",
      price: "15.00",
    }
  ]
  let [modelStyle, setModelStyle] = useState({display: "none"})
  let [modelDislay, setModelDisplay] = useState(true)
  const toggleModelDisplay = ()=>{
    setModelDisplay(!modelDislay)
    if(modelDislay){
      setModelStyle({display: "block"})
    }else{
      setModelStyle({display: "none"})
    }
  } 
  return <div className="box">
    <Header pageType={HeaderStore.type} changePageType={HeaderStore.changeType}/>
    <main className="shopping-main-content">
      <div className="goods-container">
        <ul className="goods-list">
          {
            goods.map(item=>{
              return <ProductItem 
                key={item.id} 
                background={item.backgroundImg} 
                markText={item.markText} 
                backgroundHover={item.backgroundHover} 
                productName={item.productName} 
                price={item.price}
                toggleModel={toggleModelDisplay}>
              </ProductItem>
            })
          }
        </ul>
      </div>
      <About></About>
    </main>
    <Footer></Footer>
    <ViewQuick 
      modelStyle={modelStyle}
      toggleModelDisplay={toggleModelDisplay}>
    </ViewQuick>
  </div>
}

export default Shopping