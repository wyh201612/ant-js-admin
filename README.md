<h1 align="center">Antd Js Admin</h1>

<div align="center">
基于 Ant Design 和 Vue 的 admin 框架。
</div>

## 链接

-   [Ant Design Vue](https://www.antdv.com/)
-   [Vue 官方文档](https://cn.vuejs.org/)
-   [umi-request](https://github.com/umijs/umi-request/blob/master/README_zh-CN.md)

## request 调用示例

```javascript
/**
 * 封装
 */
import request from "@/utils/umi"

// 测试接口
export async function umiList(parameter) {
    // parameter 来自于effects中参数
    return request("/ssoFunc/ssoRequestLog/searchw", {
        // 请求方式
        method: "POST",
        // 用data包裹参数是官方指定写法
        // 如果data有参数umi-request会默认读取data里面参数。
        data: parameter,
    })
}

/**
 * 调用
 */
umiList({ pageSize: 20, pageNum: 1 }).then((res) => {
    console.log(res)
})
```
