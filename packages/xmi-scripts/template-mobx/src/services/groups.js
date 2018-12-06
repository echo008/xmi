import request from '../plugins/network/request'
import {
    GROUPS_STORE_MACHINES,
    GROUPS_STORE_LIST,
    GROUPS_CLIENT_LIST
} from '@/constants/apis'

/**
 * 税盘列表
 */
export function fetchMachines(clientID) {
    const params = {
        client_id: clientID
    }
    return request({ url: GROUPS_STORE_MACHINES, data: params })
}

/**
 * 门店列表
 */
export function fetchShops(clientID) {
    const params = {
        client_id: clientID
    }
    return request({ url: GROUPS_STORE_LIST, data: params })
}

/**
 * 商户列表
 */
export function fetchMerchantList(params) {
    return request({ url: GROUPS_CLIENT_LIST, data: params }).then(res => {
        const data = res.data || {}
        data.total_count = Number(data.total_count || 0)
        data.page = Number(data.page || 1)
        data.page_size = Number(data.page_size || 10)
        return data
    })
}
