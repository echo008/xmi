import React from 'react'
import { inject, observer } from 'mobx-react'
import { Layout } from 'antd'

import withException from '../../../plugins/exception/with-exception'
import { concatArray, urlToList } from '../../../utils'

import Menu from './menu'
import iconLogo from '../../../assets/logo.png'

const { Sider } = Layout

// 根据路由地址找到展开的菜单项
const getOpenMenuMatches = (pathname, menus = []) => menus.filter(n => pathname.includes(n.link)).map(n => n.link)

// 当前展开的菜单项
const getOpenMenuKeys = (props, state) => {
    const { location } = props
    const { menus, openKeys } = state
    const menuMatches = getOpenMenuMatches(location.pathname, menus)
    // 合并并去除重复项
    return concatArray(openKeys, menuMatches)
}

// 根据路由地址找到选中的菜单项
const getSelectedMenuKeys = pathname => urlToList(pathname)

const SiderHeader = () => (
    <div className="logo">
        <img src={iconLogo} alt="logo" />
        <span className="title">云票儿</span>
        <span className="sub-title">集团商户平台</span>
    </div>
)

@withException
@inject('layoutStore')
@observer
class Siderbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            menus: [],
            openKeys: [],
            selectedKeys: []
        }

        this.fetchData()
    }

    static getDerivedStateFromProps(props, state) {
        const { pathname } = props.location
        // 路由发生变化时，更新菜单展开、选中项
        if (state.pathname !== pathname) {
            return {
                pathname,
                openKeys: getOpenMenuKeys(props, state),
                selectedKeys: getSelectedMenuKeys(pathname)
            }
        }
        return null
    }

    render() {
        const { menus, openKeys, selectedKeys } = this.state

        return (
            <Sider width={256}>
                <SiderHeader />
                <Menu
                    data={menus}
                    selectedKeys={selectedKeys}
                    openKeys={openKeys}
                    onOpenChange={this.handleOpenChange} />
            </Sider>
        )
    }

    fetchData() {
        const { location, layoutStore: { getMenuList } } = this.props
        getMenuList().then(res => {
            const menus = res.data || []
            // 更新菜单数据以及菜单展开项
            this.setState({ menus, openKeys: getOpenMenuMatches(location.pathname, menus) })
        })
    }

    handleOpenChange = openKeys => {
        this.setState({ openKeys })
    }
}

export default Siderbar
