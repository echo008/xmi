import React from 'react'
import { Layout } from 'antd'

import Siderbar from './components/siderbar'
import PageHeader from './components/header'

import '../../styles/layout.less'

const BasicLayout = props => (
    <div className="basic-layout">
        <Siderbar {...props} />
        <div className="container">
            <PageHeader {...props} />
            <Layout.Content className="content">
                {props.children}
            </Layout.Content>
        </div>
    </div>
)

export default BasicLayout
