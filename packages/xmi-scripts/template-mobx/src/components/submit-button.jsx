import React from 'react'
import PropTypes from 'prop-types'
import { throttle } from 'lodash'
import { Button } from 'antd'

const handleSubmit = throttle((evt, form, onSubmit) => {
    const { validateFields } = form

    evt.preventDefault()

    if (validateFields && typeof validateFields === 'function') {
        validateFields((err, values) => {
            if (!err) {
                onSubmit(values)
            }
        })
    } else {
        onSubmit()
    }
}, 1000, { trailing: false })

const SubmitButton = props => {
    const { form, children, onSubmit, ...rest } = props
    return (
        <Button {...rest} htmlType="submit" onClick={evt => handleSubmit(evt, form, onSubmit)}>{children}</Button>
    )
}

SubmitButton.propTypes = {
    form: PropTypes.object,
    onSubmit: PropTypes.func.isRequired
}

SubmitButton.defaultProps = {
    form: {}
}

export default SubmitButton
