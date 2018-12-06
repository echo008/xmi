import request from '../plugins/network/request'
import {
    USER_LOGIN,
    USER_REGISTER,
    USER_REPLENISH_REGISTER
} from '../constants/apis'

/**
 * 用户登录
 * @param {Object} params 接口参数
 * @return {Promise}
 */
export function login(params) {
    return request({ url: USER_LOGIN, data: params })
}

/**
 * 用户注册
 * @param {Object} params 接口参数
 * @return {Promise}
 */
export function register(params) {
    return request({ url: USER_REGISTER, data: params })
}

/**
 * 用户注册
 * @param {Object} params 接口参数
 * @return {Promise}
 */
export function replenishRegister(params) {
    return request({ url: USER_REPLENISH_REGISTER, data: params })
}
