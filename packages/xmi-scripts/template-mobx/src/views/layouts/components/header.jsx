import React from 'react'
import { inject, observer } from 'mobx-react'
import { Layout, Icon } from 'antd'

import Breadcrumb from './breadcrumb'

@inject('appStore', 'layoutStore')
@observer
class Header extends React.Component {
    render() {
        const { appStore: { loginUser }, layoutStore: { handleLogout }, ...rest } = this.props

        return (
            <Layout.Header className="header">
                <Breadcrumb {...rest}/>
                <ul className="user-nav">
                    <li>
                        <Icon type="user" /> { loginUser.group_name || loginUser.nickname || '--' }
                    </li>
                    <li style={{ cursor: 'pointer' }}>
                        <a href="void" onClick={handleLogout}><Icon type="logout" /> 退出</a>
                    </li>
                </ul>
            </Layout.Header>
        )
    }
}

export default Header
