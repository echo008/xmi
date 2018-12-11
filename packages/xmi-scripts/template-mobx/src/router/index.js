import { dynamic } from 'xmi-router'

export default [
  {
    path: '/user',
    component: dynamic(import('../views/layouts/user-layout')),
    routes: [
      {
        path: '/user',
        redirect: '/user/login'
      },
      {
        path: '/user/login',
        component: dynamic(import('../views/user/login'))
      },
      {
        path: '/user/register',
        component: dynamic(import('../views/user/register'))
      }
    ]
  },
  {
    path: '/',
    component: dynamic(import('../views/layouts/layout')),
    authRoute: dynamic(import('../components/authorized')),
    routes: [
      {
        path: '/',
        redirect: '/home'
      },
      {
        name: '首页',
        path: '/home',
        component: dynamic(import('../views/home'))
      },
      {
        name: '404',
        component: dynamic(import('../views/404'))
      }
    ]
  }
]
