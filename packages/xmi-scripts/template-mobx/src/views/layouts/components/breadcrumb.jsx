import React from 'react'
import pathToRegexp from 'path-to-regexp'
import { Link } from 'react-router-dom'
import { Breadcrumb as AntBreadcrumb, Icon } from 'antd'

import { urlToList } from '../../../utils'
import routes from '../../../router'

const BreadcrumbItem = AntBreadcrumb.Item
// 系统 home 页面路径
const homePath = '/home'

// 默认的面包屑项
const DefaultBreadcrumbItem = (
    <BreadcrumbItem key="home">
        <Icon type="home" />
        <Link to={homePath}>首页</Link>
    </BreadcrumbItem>
)

// 通过路由配置生成面包屑map数据，以便后面通过route path查找
const breadcrumbNameMap = (function generateBreadcrumbNameMap() {
    const nameMap = {}
    const mergeRoute = pageRoutes => {
        pageRoutes.forEach(item => {
            const { name, path, routes: childRoutes } = item
            // 递归子路由
            if (childRoutes && childRoutes.length) {
                mergeRoute(childRoutes)
            }

            path && name && (nameMap[path] = name)
        })
    }
    mergeRoute(routes)
    return nameMap
})()

// 所有的路由地址数组
const routePaths = Object.keys(breadcrumbNameMap)

// 通过pathname获取面包屑子项名称（即路由名称）
const getBreadcrumbName = pathname => {
    let breadcrumbName
    routePaths.forEach(path => {
        // 把路由path转成regexp，然后匹配当前pathname，以便得到当前路由名称
        if (pathToRegexp(path).test(pathname)) {
            breadcrumbName = breadcrumbNameMap[path]
        }
    })
    return breadcrumbName
}

// 通过pathname获取除home外，所有的面包屑项
const getExtraBreadcrumbItems = pathname => {
    // 这里排除 home 项
    const pathSnippets = urlToList(pathname).filter(path => path !== homePath)
    const extraBreadcrumbItems = pathSnippets.map((path, index) => {
        const breadcrumbName = getBreadcrumbName(path)
        // 最后一项时，直接显示文件，否则显示Link链接
        const isLast = index === pathSnippets.length - 1
        const children = isLast ? breadcrumbName : <Link to={path}>{breadcrumbName}</Link>
        // breadcrumbName 不存在时，显示null元素，避免显示一个空的BreadcrumbItem，却无法点击
        return breadcrumbName ? (
            <BreadcrumbItem key={path}>{children}</BreadcrumbItem>
        ) : null
    })
    return extraBreadcrumbItems
}

class Breadcrumb extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            breadcrumbItems: null
        }
    }

    static getDerivedStateFromProps(props, state) {
        const { pathname } = props.location
        // 路由发生变化时，更新面包屑
        if (state.pathname !== pathname) {
            return {
                pathname,
                breadcrumbItems: [DefaultBreadcrumbItem].concat(getExtraBreadcrumbItems(pathname))
            }
        }
        return null
    }

    render() {
        const { breadcrumbItems } = this.state
        return (
            <AntBreadcrumb>{breadcrumbItems}</AntBreadcrumb>
        )
    }
}

export default Breadcrumb
