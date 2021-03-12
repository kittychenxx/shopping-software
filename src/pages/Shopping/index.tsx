import React from 'react'
import Header from '../../components/Header'
import '../../sass/shopping/shopping.sass'
import HeaderStore from '../../models/Shopping/Header'
import About from '../Shopping/About'
import Footer from '../../components/Footer'

const Shopping: React.FC = () => {
  return <div className="box">
    <Header pageType={HeaderStore.type} changePageType={HeaderStore.changeType}/>
    <main className="shopping-main-content">
      <About></About>
    </main>
    <Footer></Footer>
  </div>
}

export default Shopping