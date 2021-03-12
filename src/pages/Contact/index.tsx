import React from 'react'
import Header from '../../components/Header'
import HeaderStore from '../../models/Shopping/Header'

const Contact: React.FC = () => {
  return <div className="box">
    <Header pageType={HeaderStore.type} changePageType={HeaderStore.changeType}/>,
    <h1>Contact</h1>
  </div>
}

export default Contact