/*
 * @Author: Ethan
 * @Github: https://github.com/ethanpub
 * @Date: 2019-12-04 10:38:21
 * @LastEditors: Ethan
 * @Blog: https://ethan.pub
 * @LastEditTime: 2019-12-04 10:38:23
 * @Description: 🙏BUG退散🙏
 */
import enquireJs from 'enquire.js'

export const DEVICE_TYPE = {
    DESKTOP: 'desktop',
    TABLET: 'tablet',
    MOBILE: 'mobile'
}

/**
 * 响应式检测
 * @param {*} callback
 */
export const deviceEnquire = function(callback) {
    const matchDesktop = {
        match: () => {
            callback && callback(DEVICE_TYPE.DESKTOP)
        }
    }

    const matchLablet = {
        match: () => {
            callback && callback(DEVICE_TYPE.TABLET)
        }
    }

    const matchMobile = {
        match: () => {
            callback && callback(DEVICE_TYPE.MOBILE)
        }
    }

    enquireJs
        .register('screen and (max-width: 576px)', matchMobile)
        // .register('screen and (min-width: 576px) and (max-width: 1199px)', matchLablet)
        .register('screen and (min-width: 1200px)', matchDesktop)
}