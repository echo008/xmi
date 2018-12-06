import request from '../plugins/network/request'
import {
    SERVICE_SEND_SMS_CAPTCHA,
    SERVICE_GET_PICTURE_CAPTCHA,
} from '../constants/apis'
import { appStore } from '../stores'

/**
 * 跳转到登录页
 */
export function gotoLoginPage() {
    window.location = '/#/user/login'
}

/**
 * 用户登出
 */
export function logout() {
    appStore.setLoginUser(null).setToken(null)
    gotoLoginPage()
}

/**
 * 获取图片验证码
 */
export function getPictureCaptcha() {
    return request({url: SERVICE_GET_PICTURE_CAPTCHA, params: { t: Date.now() }, method: 'get'})
}

/**
 * 发送短信验证码
 * @param {Object} params 接口参数
 * @return {Promise}
 */
export function sendSMSCaptcha(params) {
    return request({ url: SERVICE_SEND_SMS_CAPTCHA, data: params })
}
