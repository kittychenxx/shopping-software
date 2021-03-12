import React from 'react'
import { Spin } from 'antd'
import '../sass/common.sass'

const Loading: React.FC = function(){
    return <div className="common-loading">
      <Spin tip="Loading..." size="large" />
    </div>
}

export default Loading