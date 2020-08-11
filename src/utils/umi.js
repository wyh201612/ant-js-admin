/**
 * umi-request:
 * https://github.com/umijs/umi-request/blob/master/README_zh-CN.md
 */
import request, { extend, ResponseError } from "umi-request";
import { notification } from "ant-design-vue";

/**
 * 全局 URI
 * @type string
 */
export const BASE_URL = process.env.NODE_ENV === "production" ?
    "/api": "/api";

/**
 * 状态码文案
 */
const codeMessage = {
    200: "服务器成功返回请求的数据。",
    201: "新建或修改数据成功。",
    202: "一个请求已经进入后台排队（异步任务）。",
    204: "删除数据成功。",
    400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
    401: "用户没有权限（令牌、用户名、密码错误）。",
    403: "用户得到授权，但是访问是被禁止的。",
    404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
    406: "请求的格式不可得。",
    410: "请求的资源被永久删除，且不会再得到的。",
    422: "当创建一个对象时，发生一个验证错误。",
    500: "服务器发生错误，请检查服务器。",
    502: "网关错误。",
    503: "服务不可用，服务器暂时过载或维护。",
    504: "网关超时。"
};
/**
 * 错误处理
 * @param {*} error
 */
const errorHandler = (error) => {
    const errorText =
        (error.response && codeMessage[error.response.status]) || error.message;

    notification.error({
        message: `请求错误 ${error.response.status}: ${error.request.url}`,
        description: errorText
    });
};
/**
 * 实例
 */
const customRequest = extend({
    prefix: BASE_URL,
    timeout: 1000,
    errorHandler
});

/**
 * request 拦截器
 */
customRequest.interceptors.request.use((url, options) => {
    return {
        url,
        options: { ...options, interceptors: true }
    };
});

/**
 * response 拦截器
 */
customRequest.interceptors.response.use(async response => {
    const data = await response.clone().json();
    if (data && data.REQUEST_LOGIN) {
        console.log("response:data", data);
        // useRouter().push('/auth/login')
    }
    return response;
});

export { request, extend };

export default customRequest;