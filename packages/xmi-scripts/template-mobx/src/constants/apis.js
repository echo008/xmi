/**
 * API接口URL定义，格式：
 * 模块名_功能名
 */
module.exports = {
    /**
     * 系统服务
     */
    SERVICE_MENU_LIST: '/user/menu-list', // 系统菜单列表
    SERVICE_SEND_SMS_CAPTCHA: '/user/mobile-code', // 获取短信证码
    SERVICE_GET_PICTURE_CAPTCHA: '/user/picture-code', // 获取图片验证码
    /**
     * 首页
     */
    HOME_INVOICE_STAT: '/group/inv-stat', // 商户开票统计信息
    /**
     * 用户
     */
    USER_LOGIN: '/user/login', // 用户登录
    USER_REGISTER: '/user/register', // 用户注册
    USER_REPLENISH_REGISTER: '/user/replenish-register', // 审核失败后的重新注册
    USER_GET_CAPTCHA: '/user/picture-code', // 获取图片验证码
    /**
     * 开票数据
     */
    INVOICE_COLLECT_DETAIL: '/invoice/collect-detail', // 月度统计
    INVOICE_COLLECT_EXPORT: '/invoice/collect-export', // 月度统计下载
    INVOICE_LIST: '/invoice/list', // 开票明细记录
    INVOICE_DETAIL: '/invoice/detail', // 开票明细记录-详情页
    INVOICE_TAX_RATE: '/invoice/rate-list', // 获取商品税率
    INVOICE_TYPE_LIST: '/invoice/invoice-type-list', // 发票类型
    INVOICE_GET_PDF: '/invoice/get-pdf', // 开票明细PDF地址
    INVOICE_RECORD_EXPORT: '/invoice/invoice-export', // 导出
    INVOICE_RETRY_ORDER: '/invoice/retry-get-order', // 海鼎商户重试开票
    INVOICE_BATCH_BLUE_RETRY: '/invoice/blue-retry', // 批量重试开票
    INVOICE_BLUE_RETRY: '/invoice/blue-retry-one', // 重试开票
    INVOICE_RED: '/invoice/red', // 红冲
    /**
     * 集团管理
     */
    GROUPS_CLIENT_LIST: '/client/list', // 商户列表
    GROUPS_SYSTEM_DATA: '/client/view', // 系统设置 获取详情
    GROUPS_DOWNLOAD_EXCEL: '/client/download-excel', // 下载excel模板
    GROUPS_UPLOAD_EXCEL: '/client/upload-excel', // 导入商户
    GROUPS_SET_QUOTA: '/client/set-quota', // 设置开票限额
    GROUPS_SET_STOCK: '/client/set-num-warning', // 设置余票预警
    GROUPS_SET_LOGO: '/client/set-logo', // 设置帐户LOGO图片
    GROUPS_SAVE_ACCOUNT_INFO: '/client/edit-account-info', // 保存帐户信息
    GROUPS_SEND_MESSAGE: '/client/send-message', // 修改帐户信息时的短信验证码
    GROUPS_COMPANY_INFO: '/client/enterprise-info', // 企业信息
    GROUPS_COMPANY_EDIT: '/client/enterprise-edit', // 企业信息修改
    GROUPS_UPDATE_COMPANY_LOGO: '/client/set-client-logo', // 企业LOGO更换
    GROUPS_RESET_PASSWORD: '/client/reset-password', // 登录密码修改

    GROUPS_STORE_LIST: '/store/list-store', // 门店列表
    GROUPS_STORE_MACHINES: '/store/sub-machines', // 税盘分机号列表
    GROUPS_STORE_DOWNLOAD_QRCODE: '/store/pack-download-qrcode', // 下载门店二维码
    GROUPS_STORE_ADD: '/store/add-store', // 新增门店
    GROUPS_STORE_EDIT: '/store/edit-store', // 修改门店
    /**
     * 系统设置
     */
    SYSTEM_GET_ORDER_URL: '/group/get-order-address', // 获取拉单地址
    SYSTEM_SET_ORDER_URL: '/group/set-order-address', // 拉单地址设置
}
