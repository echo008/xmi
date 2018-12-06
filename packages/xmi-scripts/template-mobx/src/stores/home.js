import { observable, action } from 'mobx'

import { getHomeData } from '../services/layout'

class Store {
    @observable.shallow data = {}

    // 获取首页数据
    @action fetchData() {
        return getHomeData().then(res => {
            this.data = res.data
        })
    }
}

export default new Store()
