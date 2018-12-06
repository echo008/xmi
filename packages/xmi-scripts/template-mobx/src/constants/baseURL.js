const NODE_ENV = process.env.NODE_ENV
let baseURL

if (NODE_ENV === 'production') {
    baseURL = '//backend-jt.fapiaoer.cn'
} else if (NODE_ENV === 'testing') {
    // baseURL = '//backend-jt.yewifi.com'
    baseURL = '/mock'
} else {
    baseURL = '/mock'
    // baseURL = '//backend-jt.yewifi.com'
    // baseURL = '//rap2api.taobao.org/app/mock/87078'
}

module.exports = baseURL
