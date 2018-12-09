import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { message, Button } from 'antd'

import SubmitButton from '../../components/submit-button'
import enhance from '../../plugins/exception'
import UserForm from './components/user-form'
import { REG_EMAIL, REG_PASS, REG_MOBILE, REG_PHONE } from '../../constants/regexp'

import '../../styles/register.less'

/**
 * 注册页面
 */
@enhance
@inject('userStore')
@observer
class Register extends Component {
    state = {
        time: 0,
        timer: null,
        confirmDirty: ''
    }

    // 倒计时默认时长
    defaultTime = 120

    formRef = React.createRef()

    componentWillUnmount() {
        // 清除验证码定时器
        window.clearInterval(this.state.timer)
    }

    // 发送短信验证码
    handleSendSMSCaptcha = () => {
        const { userStore } = this.props
        let { timer } = this.state
        const form = this.formRef.current
        const fieldName = 'mobile'
        // 如果定时器已存在，直接返回
        if (timer) {
            return false
        }

        // 校验是否输入了正确的手机号码
        form.validateFields([fieldName], (errors, values) => {
            if (!errors) {
                // 发送短信验证码
                userStore.sendSMSCaptcha({
                    mobile: values[fieldName]
                }).then(() => {
                    // 限定规定时间内不能重新发请求
                    timer = window.setInterval(() => {
                        const { time } = this.state
                        if (time <= 1) {
                            window.clearInterval(this.state.timer)
                            this.setState({ time: 0, timer: null })
                            return false
                        }

                        this.setState({ time: time - 1 })
                    }, 1000)

                    // 更新定时器
                    this.setState({ time: this.defaultTime, timer })
                    message.info('短信验证码已发送到您的手机，请注意查收')
                })
            }
        })
    }

    // 失去焦点确认
    handleConfirmBlur = e => {
        const { value } = e.target
        const { confirmDirty } = this.state
        this.setState({
            confirmDirty: confirmDirty || !!value
        })
    }

    // 验证确认密码与登录密码是否一致
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.formRef.current
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不一致，请重新输入')
        } else {
            callback()
        }
    }

    // 验证与确认密码是否一致
    validateToNextPassword = (rule, value, callback) => {
        const { confirmDirty } = this.state
        const form = this.formRef.current
        if (value && confirmDirty) {
            form.validateFields(['confirm_password'], { force: true })
        }
        callback()
    }

    // 注册处理
    handleSubmit = formData => {
        const { userStore } = this.props
        userStore.handleRegister(formData).then(() => {
            message.success('注册成功，请耐心等待管理员审核', userStore.backLoginPage)
        })
    }

    renderFooter = () => {
        const { userStore } = this.props
        return (
            <Fragment>
                <Button onClick={userStore.backLoginPage}>取消</Button>
                <SubmitButton
                    type="primary"
                    form={this.formRef.current}
                    onSubmit={this.handleSubmit}
                >
                    提交
                </SubmitButton>
            </Fragment>
        )
    }

    renderCaptchaAddonAfter = () => {
        const { time, timer } = this.state
        return timer && time > 0 ? (
            <span>{`${time}s 后重试`}</span>
        ) : (
            <Button onClick={this.handleSendSMSCaptcha}>获取验证码</Button>
        )
    }

    render() {
        const { formData } = this.props.userStore
        const disableFields = []

        const formOptions = {
            itemOptions: {
                labelCol: { span: 8 },
                wrapperCol: { span: 10 }
            }
        }

        const formFields = [
            {
                type: 'input',
                name: 'email',
                itemOptions: {
                    label: '邮箱地址'
                },
                validate: {
                    rules: [{ required: true, pattern: REG_EMAIL, message: '请输入正确的邮箱地址' }],
                    initialValue: formData.email
                },
                options: {
                    disabled: disableFields.includes('email'),
                    placeholder: '邮箱地址作为登录帐号'
                }
            },
            {
                type: 'input',
                name: 'password',
                itemOptions: {
                    label: '登录密码'
                },
                validate: {
                    rules: [{
                        required: true,
                        pattern: REG_PASS,
                        message: '仅支持8-18位数字、大小写字母、符号任意两种组合'
                    }, {
                        validator: this.validateToNextPassword
                    }]
                },
                options: {
                    type: 'password',
                    placeholder: '8-18位数字、大小写字母、符号任意两种组合'
                }
            },
            {
                type: 'input',
                name: 'confirm_password',
                itemOptions: {
                    label: '确认登录密码'
                },
                validate: {
                    rules: [{
                        required: true,
                        message: '仅支持8-18位数字、大小写字母、符号任意两种组合'
                    }, {
                        validator: this.compareToFirstPassword
                    }]
                },
                options: {
                    type: 'password',
                    placeholder: '请再次确认密码',
                    onBlur: this.handleConfirmBlur
                }
            },
            {
                type: 'input',
                name: 'group_name',
                itemOptions: {
                    label: '集团名称（简称）'
                },
                validate: {
                    rules: [{ required: true, max: 100, message: '长度不得超过100字符' }],
                    initialValue: formData.group_name
                },
                options: {
                    placeholder: '请输入集团名称'
                }
            },
            {
                type: 'input',
                name: 'enterprise_phone',
                itemOptions: {
                    label: '企业电话'
                },
                validate: {
                    rules: [{ pattern: REG_PHONE, message: '请输入正确的电话号码' }],
                    initialValue: formData.enterprise_phone
                },
                options: {
                    placeholder: '请输入企业电话'
                }
            },
            {
                type: 'input',
                name: 'mobile',
                itemOptions: {
                    label: '申请人手机号'
                },
                validate: {
                    rules: [{ required: true, pattern: REG_MOBILE, message: '请输入正确的手机号码' }],
                    initialValue: formData.mobile
                },
                options: {
                    placeholder: '手机号是登录平台条件之一'
                }
            },
            {
                type: 'input',
                name: 'mobile_code',
                itemOptions: {
                    className: 'field-captcha',
                    label: '短信验证码'
                },
                validate: {
                    rules: [{ required: true, max: 8, message: '请输入短信验证码' }]
                },
                options: {
                    placeholder: '请输入短信验证码',
                    addonAfter: this.renderCaptchaAddonAfter()
                }
            },
            {
                itemOptions: {
                    className: 'field-buttons',
                    wrapperCol: {
                        xs: { span: 24, offset: 0 },
                        sm: { span: 16, offset: 8 }
                    }
                },
                render: this.renderFooter
            }
        ]

        return (
            <section className="page-register">
                <div className="title">新用户注册</div>
                <UserForm ref={this.formRef} options={formOptions} fields={formFields} />
            </section>
        )
    }
}

export default Register
