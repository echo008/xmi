import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button, message as Message } from 'antd'

import { sendSMSCaptcha } from '@/services'

const FormItem = Form.Item
const defaultTime = 120

class FormItemSMSCaptcha extends React.Component {
    state = {
        time: 0,
        timer: null
    }

    componentWillUnmount() {
        window.clearInterval(this.state.timer)
    }

    render() {
        const { form, fieldName, ...rest } = this.props
        const { getFieldDecorator } = form
        return (
            <FormItem {...rest}>
                {getFieldDecorator(fieldName, {
                    rules: [{ required: true, max: 8, message: '请输入短信验证码' }],
                })(
                    <Input placeholder="请输入短信验证码" addonAfter={this.getFieldCaptchaAddonAfter()} />
                )}
            </FormItem>
        )
    }

    getFieldCaptchaAddonAfter() {
        const { time, timer } = this.state
        return timer && time > 0 ? (
            <span>{`${time}s 后重试`}</span>
        ) : (
            <Button onClick={this.handleSendSMSCaptcha}>获取验证码</Button>
        )
    }

    handleSendSMSCaptcha = () => {
        const { form, mobileFieldName } = this.props
        let timer = this.state.timer

        // 如果定时器已存在，直接返回
        if (timer) {
            return false
        }

        // 校验是否输入了正确的手机号码
        form.validateFields([mobileFieldName], (errors, values) => {
            if (!errors) {
                // 发送短信验证码
                this.props.send({
                    mobile: values[mobileFieldName]
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
                    this.setState({ time: defaultTime, timer })
                    Message.info('短信验证码已发送到您的手机，请注意查收')
                })
            }
        })
    }
}

FormItemSMSCaptcha.propTypes = {
    // 使用Antd Form.create() 注入到组件的对象
    form: PropTypes.object.isRequired,
    // FormItem 的field name
    fieldName: PropTypes.string.isRequired,
    // 发送验证码前做的 form.validateFields 校验所对应的手机号field name
    mobileFieldName: PropTypes.string,
    // 发送短信接口
    send: PropTypes.func
}

FormItemSMSCaptcha.defaultProps = {
    send: sendSMSCaptcha,
    mobileFieldName: 'phone'
}

export default FormItemSMSCaptcha
