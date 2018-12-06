import React from 'react'
import { Switch, Route as AntRoute, Redirect } from 'react-router-dom'
import loadable from './loadable'
import Authorized from '../../components/authorized'

/**
 * 动态加载组件的require.context，默认以src/views为上下文，后缀为.jsx的组件
 */
const requireContext = require.context('../../views', true, /\.jsx$/, 'lazy')
const requireContextKeys = requireContext.keys()

/**
 * 获取组件的相对（相对于src/views）路径，后缀为.jsx的文件，目录的话默认为index.jsx
 */
const getComponentPath = path => requireContextKeys.find(n => n === `${path}.jsx` || n === `${path}/index.jsx`)

/**
 * Route组件key，默认以组件path为标识，当path不存在时，以name为标识
 */
const createRouteKey = routeConfig => routeConfig.path || `route_${routeConfig.name}`

/**
 * 业务组件（页面）路由
 */
const generatePageRoutes = routeConfig => {
    const routes = []
    const mergeRouter = pageRoutes => {
        pageRoutes.forEach(item => {
            // Route.exact 默认设为true
            const { exact = true, path, component, redirect, routes: childRoutes } = item
            const routeProps = { key: createRouteKey(item), path, exact }

            if (redirect) {
                routeProps.render = () => <Redirect to={redirect} />
            } else if (component) {
                const componentPath = getComponentPath(component)
                const LoadableComponent = loadable(() => requireContext(componentPath))
                routeProps.component = LoadableComponent
            }

            routes.push(<AntRoute {...routeProps}/>)

            // 递归子路由
            if (childRoutes && childRoutes.length) {
                mergeRouter(childRoutes)
            }
        })
    }
    mergeRouter(routeConfig)
    return routes
}

/**
 * 通过路由配置生成App Routes
 *
 * @param  {Array[Object]} routeConfig 路由配置信息，
 * 按约定，最外层数据为Layout组件，Layout.routes为业务组件（页面），格式如：
 *   [{
 *     name: 'App',
 *     path: '/',
 *     component: './layout/basic-layout',
 *     routes: [{...}]
 *   }]
 * @return {Array[Route]}              返回一个Route组件的数组
 */
export const generateRoutes = routeConfig => {
    const appRoutes = routeConfig.map(item => {
        const { path, component, authorized, routes: childRoutes } = item
        const routeKey = createRouteKey(item)
        const componentPath = getComponentPath(component)
        let pageRoutes = null

        if (childRoutes && childRoutes.length) {
            pageRoutes = generatePageRoutes(childRoutes)
        }

        const LoadableComponent = loadable({
            loader: () => requireContext(componentPath),
            render: (loaded, props) => {
                // 把props(包括appStore, react-router)以及子路由注入到Component中
                const Component = loaded.default
                return (
                    <Component {...props}>
                        <Switch>
                            {pageRoutes}
                        </Switch>
                    </Component>
                )
            }
        })

        const Route = authorized === true ? Authorized : AntRoute

        return (
            <Route key={routeKey} path={path} component={LoadableComponent}/>
        )
    })

    return appRoutes
}
