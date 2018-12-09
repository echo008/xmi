import request from '../plugins/network/request'
import {
    SYSTEM_GET_ORDER_URL,
    SYSTEM_SET_ORDER_URL
} from '@/constants/apis'

/**
 * 获取拉单地址信息
 */
export function fetchOrderAddress() {
    return request({ url: SYSTEM_GET_ORDER_URL, method: 'get' })
}

/**
 * 保存拉单地址配置
 */
export function saveOrderAddress(params) {
    return request({ url: SYSTEM_SET_ORDER_URL, data: params })
}
