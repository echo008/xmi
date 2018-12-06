import 'react-app-polyfill/ie9'
import React from 'react'
import ReactDOM from 'react-dom'

import LocaleProvider from 'antd/lib/locale-provider'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'

import App from './app'
import 'antd/dist/antd.css'
import './styles/index.less'

ReactDOM.render(
    <LocaleProvider locale={zhCN}>
        <App />
    </LocaleProvider>,
    document.getElementById('root')
)
