import React from 'react'
import PropTypes from 'prop-types'

const sizes = {
    sm: 15,
    md: 24,
    lg: 30
}
const WhiteSpace = props => {
    const height = sizes[props.size]
    return (
        <div style={{height: `${height}px`}}></div>
    )
}

WhiteSpace.propTypes = {
    size: PropTypes.oneOf(['sm', 'md', 'lg'])
}

WhiteSpace.defaultProps = {
    size: 'md'
}

export default WhiteSpace

