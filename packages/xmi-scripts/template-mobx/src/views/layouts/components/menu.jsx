import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Menu as AntMenu, Icon } from 'antd'

const defaultIcon = 'appstore-o'
const { SubMenu, Item: MenuItem } = AntMenu

class Menu extends React.Component {
    render() {
        const { data: menus, ...rest } = this.props
        return (
            <AntMenu
                {...rest}
                theme="dark"
                mode="inline"
                style={{ height: '100%', borderRight: 0 }}
            >
                {
                    menus && menus.length && menus.map(item => {
                        const { text, link, icon, disabled, children } = item

                        if (disabled) {
                            return null
                        }

                        return children && children.length ? (
                            <SubMenu key={link} data-key={link} title={<span><Icon type={icon || defaultIcon} />{text}</span>}>
                                {children.map(child => {
                                    if (child.disabled) {
                                        return null
                                    }
                                    return this.renderSubMenu(child, item)
                                })}
                            </SubMenu>
                        ) : this.renderSubMenu(item)
                    })
                }
            </AntMenu>
        )
    }

    renderSubMenu(data, parent) {
        // 菜单路由地址，截取末尾'/', 如：/a/ => /a
        const link = data.link.replace(/\/$/, '')
        // 子菜单项默认不显示icon
        const showIcon = !parent
        // 当target=true时，转为默认的_blank
        const target = data.target === true ? '_blank' : data.target
        // 菜单项，如果设置了target，即用a链接，否则用Link路由
        const Component = target ? 'a' : Link
        const componentProps = target ? { href: link, target } : { to: link }

        return (
            <MenuItem key={link} data-key={link}>
                <Component {...componentProps}>
                    { showIcon && <Icon type={data.icon || defaultIcon} /> }
                    <span>{data.text}</span>
                </Component>
            </MenuItem>
        )
    }
}

Menu.propTypes = {
    // 菜单数据，格式如下：
    // [{text, link, icon, children: [{text, link}, ...], target, disabled}, ...]
    data: PropTypes.arrayOf(PropTypes.shape({
        // 菜单项显示文本
        text: PropTypes.string.isRequired,
        // 菜单项链接地址
        link: PropTypes.string.isRequired,
        // 外链接时，需要设置target，与a链接的target属性一致（有_blank, _self, _parent, _top, framename），
        // 可设值为ture，默认在新窗口中打开，即_blank
        target: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
        // 菜单图标，值为antd design Icon组件的type，仅一级菜单项有
        icon: PropTypes.string,
        // 是否禁用菜单项，禁用的菜单项不显示
        disabled: PropTypes.bool,
        // 子菜单项数据列表，其数据格式和父菜单项一致
        children: PropTypes.array
    })).isRequired
}

export default Menu
