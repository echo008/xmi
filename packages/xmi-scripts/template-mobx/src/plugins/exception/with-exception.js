import React from 'react'
import { observer, inject } from 'mobx-react'
import { Modal, Button } from 'antd'
import { getDisplayName } from '../../utils'

const IconCloseCircle = () => (
    <i className="icon-close-circle">
        <svg viewBox="64 64 896 896" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true">
            <path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z" />
            <path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
        </svg>
    </i>
)

function withException(WrappedComponent) {
    @inject('appStore')
    @observer
    class Wrapper extends React.Component {
        // 为方便在React Developer Tools中调试，这里显式指定高阶组件的displayName
        static displayName = `withException(${getDisplayName(WrappedComponent)})`;

        state = {
            // 用于缓存之前的错误信息，避免在设置appStore.error = null后，弹窗的message显示为空
            message: null
        }

        render() {
            const { appStore, ...rest } = this.props
            const { error } = appStore

            if (error) {
                this.setState({
                    message: error.message || '系统出错了，请稍候重试'
                })
            }

            return (
                <React.Fragment>
                    <WrappedComponent {...rest} />
                    <Modal
                        className="ant-modal-error"
                        width={430}
                        transparent
                        maskClosable={false}
                        visible={error !== null}
                        onCancel={this.closeDialog}
                        footer={<Button type="primary" onClick={this.closeDialog}>确定</Button>}
                    >
                        <React.Fragment>
                            <IconCloseCircle />
                            <span className="ant-modal-confirm-title">错误提示</span>
                            <div className="ant-modal-confirm-content">
                                {this.state.message}
                            </div>
                        </React.Fragment>
                    </Modal>
                </React.Fragment>
            )
        }

        closeDialog = () => {
            this.props.appStore.setError(null)
        }
    }

    return Wrapper
}

export default withException
