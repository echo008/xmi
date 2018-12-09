/* eslint-disable react/prop-types */
import React from 'react'
import reactLoadable from 'react-loadable'

/**
 * react-loadable 的Loding组件
 */
const Loading = props => {
    const { error, timedOut, pastDelay } = props
    if (error || timedOut) {
        return <div>JS加载失败，请刷新重试。</div>
    }
    if (pastDelay) {
        return <div>JS加载中...</div>
    }
    return null
}

/**
 * react-loadable 的默认配置
 *
 * delay, 加载组件超过设定值时（单位毫秒），Loading.pastDelay会变为ture
 * timeout, 加载组件超过设定值时（单位毫秒），Loading.timeOut会变为ture
 * loading, Loading组件
 */
const defalutLoadableOptions = {delay: 200, timeout: 5000, loading: Loading}

/**
 * react-loadable 的封装函数
 *
 * @param  {Function || Object} loadableOptions
 *   当loadableOptions为Function时，即react-loadable加载组件用的loader，
 *   当loadableOptions为Object时，即react-loadable的options，可在外边自定义loader, render, loading等参数
 * @return {ReactElement}
 */
const loadable = loadableOptions => {
    let options = loadableOptions

    if (typeof loadableOptions === 'function') {
        options = { loader: loadableOptions }
    }

    options = {
        ...defalutLoadableOptions,
        ...options
    }

    return reactLoadable(options)
}

export default loadable
