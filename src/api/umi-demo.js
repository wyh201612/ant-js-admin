import request from '@/utils/umi';

// 测试接口
export async function umiList(parameter) {
    // parameter 来自于effects中参数
    return request('/ssoFunc/ssoRequestLog/searchw', {
        // 请求方式
        method: 'POST',
        // 用data包裹参数是官方指定写法，如果data有参数umi-request会默认读取data里面参数。
        data: parameter
    })
}
