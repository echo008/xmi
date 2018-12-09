import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Row, Col, Input, Select, DatePicker, Cascader } from 'antd'
import './style.less'

const controls = {
    input: Input,
    textarea: Input.TextArea,
    select: Select,
    'date-picker': DatePicker,
    'range-picker': DatePicker.RangePicker,
    'week-picker': DatePicker.WeekPicker,
    'month-picker': DatePicker.MonthPicker,
    cascader: Cascader
}
const labelWrapCls = 'label-wrapper'
const controlWrapCls = 'control-wrapper'

class FormSearch extends React.Component {
    render() {
        const { fields, footer } = this.props
        return fields && fields.length ? (
            <div className="form-search">
                { this.renderFields() }
                { footer() }
            </div>
        ) : null
    }

    renderFields() {
        const { fields } = this.props

        return (
            <Row gutter={16}>
                {
                    fields.map((field, colIndex) => field && (
                        <Col key={colIndex} lg={12} xl={8} xxl={6} className="ant-col">
                            <div className={classnames('field-wrapper', `field-${field.type}-wrapper`, field.wrapperClassName)}>
                                { this.renderFieldControl(field) }
                            </div>
                        </Col>
                    ))
                }
            </Row>
        )
    }

    renderFieldLabel(text) {
        return (
            <div className={labelWrapCls}><span>{text}：</span></div>
        )
    }

    renderFieldControl(field) {
        const { type, render } = field
        const Control = controls[type]

        if (typeof render === 'function') {
            return field.render()
        }

        if (type === 'select') {
            return this.renderSelect(field)
        }

        return Control ? (
            <React.Fragment>
                {this.renderFieldLabel(field.label)}
                <div className={controlWrapCls}><Control {...field.options} onChange={field.onChange}/></div>
            </React.Fragment>
        ) : null
    }

    renderSelect(field) {
        const { label, data, options } = field
        return (
            <React.Fragment>
                {this.renderFieldLabel(label)}
                <div className={controlWrapCls}>
                    <Select {...options} onChange={field.onChange}>
                        {
                            data && data.length && data.map((item, index) => (
                                <Select.Option key={index} value={item.value}>{item.text}</Select.Option>
                            ))
                        }
                    </Select>
                </div>
            </React.Fragment>
        )
    }
}

FormSearch.propTypes = {
    fields: PropTypes.arrayOf(PropTypes.shape({
        // 表单组件，可通过render自定义渲染
        type: PropTypes.string,
        // 组件需要显示的label
        label: PropTypes.string,
        // 部分组件可能需要通过data进行渲染，如select
        data: PropTypes.any,
        // antd-design组件的一些属性设置
        options: PropTypes.object,
        // 组件的onChange回调
        onChange: PropTypes.func,
        // 按钮的onClick回调
        onClick: PropTypes.func,
        // 自定义渲染组件方法
        render: PropTypes.func,
        // wrapper样式
        wrapperClassName: PropTypes.string
    })).isRequired,
    footer: PropTypes.func
}

FormSearch.defaultProps = {
    footer: () => null
}

export default FormSearch
