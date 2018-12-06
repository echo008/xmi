import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { appStore } from '../stores'
import { gotoLoginPage } from '../services'

const Authorized = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        if (appStore.isAuthenticated) {
            return <Component {...props} />
        }

        gotoLoginPage()
        return null
    }}/>
)

Authorized.propTypes = {
    component: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.element
    ])
}

Authorized.defaultProps = {
    component: () => null
}

export default Authorized
