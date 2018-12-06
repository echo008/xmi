import axios from 'axios'

import { appStore } from '../../stores'
import baseURL from '../../constants/baseURL'
import { getIEVersion } from '../../utils'
import '../../__mock__'

const defaultErrorMessage = '系统出错了，请稍候重试'
const service = axios.create({
    baseURL,
    method: 'post',
    timeout: 15000
})

service.interceptors.request.use(
    options => {
        console.log('request: ', options.url, options)
        const config = options
        // const method = options.method.toUpperCase()
        const field = 'params' // method === 'GET' ? 'params' : 'data'
        const token = appStore.token
        // config.headers['TOKEN'] = 'token'

        // 添加token到查询参数中
        if (token) {
            config[field] = { ...options[field], token }
        }

        // 由于IE9只支持XDomainRequest方式跨域，且它有许多的限制，如：不能加入自定义header，只支持text/plain格式报文等
        // 所以这里通过代理的方式处理跨域请求
        const ie = getIEVersion()
        if (ie > 0 && ie < 10) {
            config.baseURL = '/api'
        }
        return config
    },
    error => Promise.reject(error)
)

service.interceptors.response.use(
    response => {
        console.log('response: ', response.data)
        const { data } = response
        const code = +data.code
        // Do something
        if (code === 0) {
            return data
        }

        return Promise.reject(response)
    },
    error => Promise.reject(error)
)

function wrap(errorMessage) {
    return { message: errorMessage }
}

/**
 * 请求未发出，如：
 * 1. interceptors.request拦截器reject的错误
 * 2. 跨域请求，在OPTIONS请求出错后，真实的请求将不会发送，会直接报错
 * 3. 请求地址错误
 * 4. 其它未知情况
 *
 * @param  {Object} error 错误对象
 * @return {Object}       返回包装后的错识信息对象，如 { message: '' }
 */
function handleRequestError(error) {
    console.error('handleRequestError', error)
    let reason
    const errorMessage = error.message

    if (errorMessage === 'Network Error') { // Axios.onerror 拦截后，统一返回 Network Error
        reason = wrap(defaultErrorMessage)
    } else if (errorMessage && errorMessage.indexOf('timeout of') !== -1) { // 请求超时
        reason = wrap('系统繁忙，请稍候重试')
    } else {
        reason = error
    }

    return reason
}

/**
 * 请求已发出，但http状态码不为2xx的错误
 *
 * @param  {Object} error 错误对象
 * @return {Object}       返回包装后的错识信息对象，如 { message: '' }
 */
function handleResponseError(error) {
    console.error('handleResponseError', error)
    let reason
    const status = error.response.status

    if (status === 404) {
        reason = wrap('接口不存在')
    } else {
        reason = wrap(defaultErrorMessage)
    }

    return reason
}

/**
 * 业务异常，由interceptors.response拦截器reject的错误
 *
 * @param  {Object} error 错误对象
 * @return {Object}       返回包装后的错识信息对象，如 { message: '' }
 */
function handleServiceError(error) {
    console.error('handleServiceError', error)
    // data 为服务器端返回的报文
    const data = error.data || {}
    const code = +data.code

    // 401 token失效
    if (code === 401) {
        // 当前系统使用的是 HashRouter，所以这里取hash部分
        const href = window.location.hash
        const loginPath = '/#/user/login'

        // 清空token
        appStore.setToken(null)

        // 如果当前不是在登录页，即跳转到登录
        if (href.indexOf(loginPath.substring(1)) === -1) {
            window.location = loginPath
        }
        // 这里返回值会被外层捕获，并且设值为appStore.error
        // 为避免在跳转页面后，弹出错误提示，这里需要返回null
        return null
    }

    // 其它业务异常，由外边处理
    return data
}

/**
 * 异常处理
 * @param  {Object} error        错误对象
 * @param  {Boolean} ignoreError 是否忽略错误
 * @return {Promise}             返回一个异常处理的promise对象
 */
function handleError(error, ignoreError) {
    appStore.setLoading(false)
    let reason

    if (error.response) {
        reason = handleResponseError(error)
    } else if (error.status >= 200 && error.status < 300) {
        reason = handleServiceError(error)
    } else {
        reason = handleRequestError(error)
    }

    if (ignoreError !== true) {
        appStore.setError(reason)
    }

    return Promise.reject(reason)
}

/**
 * 成功处理
 * @param  {Object} res response对象
 * @return {Object}     返回一个response对象，以便在外层捕获
 */
function handleSuccess(res) {
    appStore.updateTokenExpires().setLoading(false)
    return res
}

/**
 * axios封装
 * @param  {Object} params       axios 的请求参数
 * @return {Promise}             返回一个Promise对象
 */
function request(params, ...args) {
    // 老接口ignoreError在args中传递，这里做兼容
    const ignoreError = params.ignoreError || args[0]
    // loading
    appStore.setLoading(true)
    return service(params).then(res => handleSuccess(res)).catch(error => handleError(error, ignoreError))
}

export default request
