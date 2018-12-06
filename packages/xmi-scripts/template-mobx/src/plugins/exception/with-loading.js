import React from 'react'
import { observer, inject } from 'mobx-react'
import { Spin } from 'antd'
import { getDisplayName } from '../../utils'

function withLoading(WrappedComponent) {
    @inject('appStore')
    @observer
    class Wrapper extends React.Component {
        // 为方便在React Developer Tools中调试，这里显式指定高阶组件的displayName
        static displayName = `withLoading(${getDisplayName(WrappedComponent)})`;

        render() {
            const { appStore, ...rest } = this.props
            const { loading } = appStore

            return (
                <Spin spinning={loading} delay={200}>
                    <WrappedComponent {...rest} />
                </Spin>
            )
        }
    }

    return Wrapper
}

export default withLoading
