import { observable, action } from 'mobx'
import { login, register } from '../services/user'
import { getPictureCaptcha, sendSMSCaptcha, gotoLoginPage } from '../services'

class Store {
    // 图片验证码
    @observable.shallow pictureCaptcha = {
        uniqueCode: '',
        picture: ''
    }

    // 注册表单
    @observable.shallow formData = {}

    // 登录
    @action postLogin(params) {
        return login(params)
    }

    // 获取图片二维码
    @action getPictureCaptcha() {
        getPictureCaptcha().then(({ data: { unique_code: uniqueCode, picture } }) => {
            this.pictureCaptcha = {
                ...this.pictureCaptcha,
                uniqueCode,
                picture: `data:image/jpeg;base64,${picture}`
            }
        })
    }

    // 发送短信验证码
    @action sendSMSCaptcha(params) {
        return sendSMSCaptcha(params)
    }

    // 返回登录页面
    @action backLoginPage() {
        return gotoLoginPage()
    }

    // 注册处理
    @action handleRegister(params) {
        return register(params)
    }
}

export default new Store()
