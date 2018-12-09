/* eslint-disable */
// import sha256 from 'crypto-js/sha256'
// import { SIGN_KEY } from '@/constants'
// import {appStore} from '@/stores'

/**
 * 判断浏览器版本
 * @returns {*}  -1，不是ie浏览器。11，IE11。
 * @constructor
 */
export function getIEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return 7;
        } else if (fIEVersion == 8) {
            return 8;
        } else if (fIEVersion == 9) {
            return 9;
        } else if (fIEVersion == 10) {
            return 10;
        } else {
            return 6; //IE版本<=7
        }
    } else if (isEdge) {
        return 'edge'; //edge
    } else if (isIE11) {
        return 11; //IE11
    } else {
        return -1; //不是ie浏览器
    }
}

export function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

/**
 * 签名规则：
   sha256(req_params + private_key)
   其中req_params为options.data的值，按key升序排序，然后拼接
 * @param  {Object} data 待签名的请求参数对象
 * @return {String}      sha256签名后的字符串
 */
// export function signRequestParams(data) {
//     let keys = Object.keys(data || {})

//     if (keys && keys.length) {
//         let sign = []
//         keys = keys.sort()

//         // 循环遍历options.data，并把它每项的值（stringify后）添加sign数组，不做递归操作
//         for (let i = 0; i < keys.length; i++) {
//             const key = keys[i]
//             let value = data[key]
//             // function, array, object时，stringify后才拼接
//             if (typeof value === 'object' && value !== null) {
//                 value = JSON.stringify(value)
//             }
//             sign.push(`${key}${value}`)
//         }
//         // 拿到sha256加密后的字符串
//         sign = sha256(`${sign.join('')}${SIGN_KEY}`).toString()
//         return sign
//     }

//     return ''
// }

export function rangeArray(len) {
    return Array.from(Array(len).keys())
}

/**
 * 合并数组并去重
 * @param  {Array} args 需要合并的数组
 * @return {Array}         返回合并后的数组
 */
export function concatArray(...args) {
    const arr = Array.prototype.concat.apply([], args)
    return Array.from(new Set(arr))
}

export function trim(str) {
  return typeof str === 'string' ? str.replace(/(^\s*)|(\s*$)/g, "") : str
}

export function hasScrollbar() {
    return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight)
}

export function getAreasCode(regionCode) {
    let areas = []
    if (regionCode) {
        const provinceCode = `${regionCode.substring(0, 2)}0000`
        const cityCode = `${regionCode.substring(0, 4)}00`
        areas = [provinceCode, cityCode, regionCode]
    }
    return areas
}

/**
 * urlToList
 * /userinfo/2144/id => ['/userinfo', '/useinfo/2144', '/userindo/2144/id']
 * @param  {String} url
 * @return {Array}
 */
export function urlToList(url) {
  const urls = url.split('/').filter(i => i)
  return urls.map((urlItem, index) => `/${urls.slice(0, index + 1).join('/')}`)
}
