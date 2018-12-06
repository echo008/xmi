import React from 'react'

import PageHeader from '../../components/page-header'
import PageFooter from '../../components/page-footer'

import '../../styles/user-layout.less'

const UserLayout = props => (
    <div className="user-layout">
        <PageHeader />
        <div className="container">
            {props.children}
        </div>
        <PageFooter />
    </div>
)

export default UserLayout
