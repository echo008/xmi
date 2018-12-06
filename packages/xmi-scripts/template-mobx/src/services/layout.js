import request from '../plugins/network/request'
import {
    SERVICE_MENU_LIST,
    HOME_INVOICE_STAT
} from '../constants/apis'

/**
 * 获取菜单列表
 * @return {Promise}
 */
export function getMenuList() {
    return request({
        url: SERVICE_MENU_LIST,
        method: 'GET'
    })
}

/**
 * 获取菜单列表
 * @return {Promise}
 */
export function getHomeData() {
    return request({
        url: HOME_INVOICE_STAT,
        method: 'GET'
    })
}
