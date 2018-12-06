import React from 'react'
import PropTypes from 'prop-types'
import iconLogo from '../../assets/logo.png'
import './style.less'

const PageHeader = ({ title, subTitle }) => {
    const eleTitle = typeof title === 'function' ? title() : title
    const eleSubTitle = typeof subTitle === 'function' ? subTitle() : subTitle

    return (
        <div className="page-header fixed-top">
            <div className="content">
                <img className="logo" src={iconLogo} alt="" />
                <span>{eleTitle}</span>
                {
                    eleSubTitle && (
                        <span className="sub-title">{eleSubTitle}</span>
                    )
                }
            </div>
        </div>
    )
}

PageHeader.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.element
    ]),
    subTitle: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.element
    ])
}

PageHeader.defaultProps = {
    title: '云票儿',
    subTitle: '集团商户平台'
}

export default PageHeader
