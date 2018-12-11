import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// 普通路由渲染
const RouteWithProps = ({ path, exact, strict, render, location, ...rest }) => (
    <Route
        path={path}
        exact={exact}
        strict={strict}
        location={location}
        render={props => render({ ...props, ...rest })}
    />
)

// 权限路由渲染
function withRoutes(AuthRoute) {
    return args => {
        const { render, ...rest } = args
        return (
            <AuthRoute {...rest} component={props => render(props)} />
        )
    }
}

// 渲染组件配置列表
export function renderRouter(
    routes,
    extraProps = {},
    switchProps = {}
) {
    return routes ? (
        <Switch {...switchProps}>
            {
                routes.map((route, i) => {
                    if (route.redirect) {
                        return (
                            <Redirect
                                key={route.key || i}
                                from={route.path}
                                to={route.redirect}
                                exact={true}
                                strict={route.strict}
                            />
                         )
                    }
                    const RouteRoute = route.authRoute ? withRoutes(route.authRoute) : RouteWithProps
                    return (
                        <RouteRoute
                            key={route.key || i}
                            path={route.path}
                            exact={route.exact}
                            strict={route.strict}
                            render={props => {
                                const childRoutes = renderRouter(
                                    route.routes,
                                    {},
                                    { location: props.location }
                                )
                                if (route.component) {
                                    return (
                                        <route.component {...props} {...extraProps}>
                                            {childRoutes}
                                        </route.component>
                                    )
                                } else {
                                    return childRoutes
                                }
                            }}
                        />
                    )
                })
            }
        </Switch>
    ) : null
}
