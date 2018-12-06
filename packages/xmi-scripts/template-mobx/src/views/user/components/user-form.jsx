import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'

class UserForm extends PureComponent {
    static propTypes = {
        options: PropTypes.object,
        header: PropTypes.element,
        fields: PropTypes.array.isRequired
    }

    static defaultProps = {
        options: {},
        header: null
    }

    getField(type, options) {
        switch (type) {
            case 'input':
            default:
                return <Input {...options} />
        }
    }

    render() {
        const { form, options: { itemOptions: formItemOptions, ...formOptions }, header, fields } = this.props
        const { getFieldDecorator } = form

        return (
            <Form {...formOptions}>
                { header }
                {
                    fields.map(({type, name, validate, options, itemOptions, render}, index) => (
                        <Form.Item {...formItemOptions} {...itemOptions} key={index}>
                            {
                                render
                                    ? render()
                                    : getFieldDecorator(name, {...validate})(this.getField(type, options))
                            }
                        </Form.Item>
                    ))
                }
            </Form>
        )
    }
}

export default Form.create()(UserForm)
