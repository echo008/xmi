import { observable, action, computed } from 'mobx'
import Cookies from 'js-cookie'

const TOKEN_KEY = '__TOKEN__'
const LOGIN_USER_KEY = '__LOGIN_USER__'

class Store {
    @observable loading = false;

    // 系统异常时的错误信息，格式保持和后端接口返回的异常报文一致：{ message, ... }
    @observable error = null;

    @computed get isAuthenticated() {
        const loginUser = this.loginUser
        // status 帐户状态，1 正常，2 审核中，3 审核未通过
        const accountStatus = loginUser.status
        return !!this.token && accountStatus === 1
    }

    @computed get loginUser() {
        const loginUser = Cookies.get(LOGIN_USER_KEY)
        return loginUser ? JSON.parse(loginUser) : {}
    }

    @computed get token() {
        return Cookies.get(TOKEN_KEY)
    }

    @action setLoading(loading) {
        this.loading = loading
        return this
    }

    @action setError(error) {
        this.error = error
        return this
    }

    @action setLoginUser(user) {
        if (user) {
            Cookies.set(LOGIN_USER_KEY, JSON.stringify(user))
        } else {
            Cookies.remove(LOGIN_USER_KEY)
        }
        return this
    }

    @action setToken(token) {
        if (token) {
            // token 默认2小时后失效（这里取小于2小时的值），在每次接口请求成功后，会刷新失效时间
            // const expires = new Date()
            // expires.setTime(expires.getTime() + 2 * 60 * 60 * 1000 - 10000)
            Cookies.set(TOKEN_KEY, token/* , { expires } */)
        } else {
            Cookies.remove(TOKEN_KEY)
        }
        return this
    }

    @action updateTokenExpires() {
        return this.setToken(this.token)
    }
}

export default new Store()
