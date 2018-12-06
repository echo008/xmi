import React from 'react'
import { inject, observer } from 'mobx-react'
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'

import enhance from '../plugins/exception'
import iconTag from '../assets/tag-circle.svg'
import iconTag2 from '../assets/tag-circle2.svg'
import imgOrgMap from '../assets/home_org_map.png'
import '../styles/home.less'

const colLayout = {
    className: 'ant-col',
    lg: 12,
    xl: 8,
    xxl: 7
}

@enhance
@inject('homeStore')
@observer
class Home extends React.Component {
    componentDidMount() {
        this.props.homeStore.fetchData()
    }

    render() {
        const {
            has_client: hasClient,
            invoice_statistics: invoiceStatistics = {}
        } = this.props.homeStore.data

        if (typeof hasClient === 'undefined') {
            return null
        }

        return (
            <div className="page-home">
                {
                    hasClient === 1 ? (
                        <section className="statistic-info">
                            <Row gutter={16}>
                                <Col {...colLayout}>
                                    <div className="panel">
                                        <img src={iconTag} alt="" />
                                        <title>昨日开具电子发票数（张）</title>
                                        <p>{invoiceStatistics.yesterday_count || 0}</p>
                                    </div>
                                </Col>
                                <Col {...colLayout}>
                                    <div className="panel">
                                        <img src={iconTag2} alt="" />
                                        <title>本月开具电子发票数（张）</title>
                                        <p>{invoiceStatistics.month_count || 0}</p>
                                    </div>
                                </Col>
                            </Row>
                        </section>
                    ) : (
                        <section className="merchant-info">
                            <span>
                                目前还没有普通商户归属到您的集团下，现在去 <Link to="/groups/merchant-import">批量导入商户</Link> 吧！
                            </span>
                            <div>
                                <h1>集团商户、普通商户和门店的关系</h1>
                                <img src={imgOrgMap} alt=""/>
                            </div>
                        </section>
                    )
                }
            </div>
        )
    }
}

export default Home
