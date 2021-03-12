import React from 'react'
import Header from '../../components/Header'
import HeaderStore from '../../models/Shopping/Header'

const FAQ: React.FC = () => {
  return <div className="box">
    <Header pageType={HeaderStore.type} changePageType={HeaderStore.changeType}/>,
    <h1>FAQ</h1>
  </div>
}

export default FAQ