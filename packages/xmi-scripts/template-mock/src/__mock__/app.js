import Mock from 'mockjs'

Mock
    // 模拟获取菜单列表
    .mock(/mock\/user\/menu-list/, Mock.mock({
        code: 0,
        data: [
            {
                icon: 'home',
                link: '/home',
                text: '首页'
            },
            {
                link: '/invoice',
                text: '开票数据',
                children: [
                    {
                        link: '/invoice/records',
                        text: '开票明细记录'
                    },
                    {
                        link: '/invoice/summary',
                        text: '发票月度汇总'
                    }
                ]
            },
            {
                link: '/groups',
                text: '集团管理',
                children: [
                    {
                        link: '/groups/merchant',
                        text: '商户管理'
                    },
                    {
                        disabled: true,
                        link: '/groups/merchant/info',
                        text: '商户信息'
                    },
                    {
                        disabled: true,
                        link: '/groups/merchant/shop',
                        text: '门店信息'
                    },
                    {
                        link: '/groups/merchant-import',
                        text: '商户批量导入'
                    }
                ]
            }
        ],
        message: 'OK'
    }))
    // 获取商户开票统计信息
    .mock(/mock\/group\/inv-stat/, Mock.mock({
        code: 0,
        data: {
            group_name: '高灯',
            has_client: 0,
            invoice_statistics: {
                month_count: 0,
                remaining_count: 0,
                yesterday_count: 0
            }
        },
        message: 'OK'
    }))
