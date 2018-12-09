import { action } from 'mobx'

import { logout } from '../services'
import { getMenuList } from '../services/layout'

class Store {
    // 退出登录
    @action handleLogout() {
        return logout()
    }

    // 获取菜单列表
    @action getMenuList() {
        return getMenuList()
    }
}

export default new Store()
