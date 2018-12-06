import React, { Component, Fragment } from 'react'
import { Icon } from 'antd'
import { inject, observer } from 'mobx-react'

import SubmitButton from '../../components/submit-button'
import enhance from '../../plugins/exception'
import UserForm from './components/user-form'

import loginBanner from '../../assets/login-banner.svg'
import { merchantSystemURL } from '../../constants/env-const'

import '../../styles/login.less'

/**
 * 登录页面
 */
@enhance
@inject('appStore', 'userStore')
@observer
class Login extends Component {
    formRef = React.createRef()

    componentDidMount() {
        // 获取图片二维码
        this.props.userStore.getPictureCaptcha()
    }

    // 登录处理
    handleSubmit = ({ account, password, captcha }) => {
        const { appStore, userStore } = this.props
        const { uniqueCode } = userStore.pictureCaptcha

        userStore.postLogin({
            account,
            password,
            picture_code: captcha,
            unique_code: uniqueCode
        }).then(({ data: { user, group, token } }) => {
            const loginUser = user
            // status 帐户状态，1 正常，2 审核中，3 审核未通过
            const status = +loginUser.status
            loginUser.group_name = group ? group.group_name : ''
            appStore.setToken(token).setLoginUser(loginUser)
            window.location = status === 1 ? '/#/home' : '/#/user/register/guide'
        })
    }

    renderFooter = () => (
        <Fragment>
            <a href={merchantSystemURL}>普通帐号登录</a>
            <SubmitButton
                type="primary"
                size="large"
                className="login-form-button"
                form={this.formRef.current}
                onSubmit={this.handleSubmit}
            >
                登录
            </SubmitButton>
            还没有账户？<a href="/#/user/register">立即注册</a>
        </Fragment>
    )

    render() {
        const { userStore } = this.props
        const { picture } = userStore.pictureCaptcha
        const headerNode = <title>欢迎登录集团商户平台</title>
        const captchaNode = <img src={picture} alt="验证码" onClick={() => userStore.getPictureCaptcha()} />

        const formOptions = {
            className: 'login-form'
        }

        const formFields = [
            {
                type: 'input',
                name: 'account',
                validate: {
                    rules: [{ required: true, message: '请输入帐号' }]
                },
                options: {
                    prefix: <Icon type="user" />,
                    placeholder: '帐号'
                }
            },
            {
                type: 'input',
                name: 'password',
                validate: {
                    rules: [{ required: true, message: '请输入密码' }]
                },
                options: {
                    prefix: <Icon type="lock" />,
                    type: 'password',
                    placeholder: '密码'
                }
            },
            {
                type: 'input',
                name: 'captcha',
                itemOptions: {
                    className: 'field-captcha'
                },
                validate: {
                    rules: [{ required: true, message: '请输入验证码' }]
                },
                options: {
                    prefix: <Icon type="qrcode" />,
                    addonAfter: captchaNode,
                    placeholder: '验证码'
                }
            },
            {
                render: this.renderFooter
            }
        ]

        return (
            <div className="page-login">
                <div className="content">
                    <div className="left logo-wrapper">
                        <img src={loginBanner} alt="logo" />
                    </div>
                    <div className="left form-wrapper">
                        <UserForm ref={this.formRef} options={formOptions} header={headerNode} fields={formFields} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
