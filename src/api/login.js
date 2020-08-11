/*
 * @Author: Ethan
 * @Github: https://github.com/ethanpub
 * @Date: 2019-05-22 17:29:06
 * @LastEditors: Ethan
 * @Blog: https://ethan.pub
 * @LastEditTime: 2019-08-30 09:34:50
 * @Description: 🙏BUG退散🙏
 */
import request from '@/utils/umi';

export function getInfo(parameter) {
    return request('/user.json', {
        method: 'get',
        data: parameter
    })
}
export function getList(parameter) {
    return request('/list.json', {

        method: 'get',
        data: parameter
    })
}