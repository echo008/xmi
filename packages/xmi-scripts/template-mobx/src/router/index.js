/* eslint-disable indent */
/**
 * 系统路由配置
 * {
 *   name: '',          // 路由名称，系统导航面包屑会用到
 *   path: '',          // 路由地址
 *   component: '',     // 组件path，相对于src/views的路径
 *   redirect: '',      // 重定向路径
 *   authorized: true,  // 是否需要鉴权认证，目前只允许设置为true|false，后面可考虑自定义Authorized类
 *   routes: [{...}],   // 子路由配置
 * }
 *
 * 1. 组件以src/views为相对路径，文件后缀为.jsx的文件，目录中的，默认为index.jsx;
 * 2. 按约定，一级路由为Layout组件，其子路由为业务组件（页面），
 *    业务组件路由参数exact默认为true，可手动设为false，但要注意路由的顺序;
 * 3. 业务组件（页面）路由命名按以下约定格式定义，可以展开、高亮选中其关联的菜单项，如：
 *    a. /users（用户列表）
 *    b. /users/detail/:userID（用户详情）
 *    如果其内置页（用户详情）路由地址包含了用户列表路由地址（/users），
 *    那么在路由到该页面时，会自动展开并高亮选中对应的菜单项（用户列表菜单项）。
 */
export default [
    // user
    {
        path: '/user',
        component: './layouts/user-layout',
        routes: [{
            path: '/user',
            redirect: '/user/login'
        }, {
            path: '/user/login',
            component: './user/login'
        }, {
            path: '/user/register',
            component: './user/register'
        }]
    },
    // app
    {
        path: '/',
        component: './layouts/layout',
        authorized: true,
        routes: [{
            path: '/',
            redirect: '/home',
        }, {
            name: '首页',
            path: '/home',
            component: './home'
        }, {
            name: '开票数据',
            path: '/invoice',
            redirect: '/invoice/records',
            routes: [{
                name: '开票明细记录',
                path: '/invoice/records',
                component: './invoice/records'
            }, {
                name: '发票月度汇总',
                path: '/invoice/summary',
                component: './invoice/summary'
            }]
        }, {
            name: '集团管理',
            path: '/groups',
            redirect: '/groups/merchant',
            routes: [{
                name: '商户管理',
                path: '/groups/merchant',
                component: './groups/merchant'
            }, {
                name: '商户信息',
                path: '/groups/merchant/info/:clientID',
                component: './groups/merchant-info'
            }, {
                name: '门店信息',
                path: '/groups/merchant/shop/:clientID',
                component: './groups/merchant-shop'
            }, {
                name: '商户批量导入',
                path: '/groups/merchant-import',
                component: './groups/merchant-import'
            }]
        }, {
            name: '系统设置',
            path: '/system',
            redirect: '/system/interface-config',
            routes: [{
                name: '接口配置',
                path: '/system/interface-config',
                component: './system/interface-config'
            }]
        }, {
            name: '404',
            component: './404'
        }]
    }
]
