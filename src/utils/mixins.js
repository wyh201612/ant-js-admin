/*
 * @Author: Ethan
 * @Github: https://github.com/ethanpub
 * @Date: 2019-12-04 10:43:01
 * @LastEditors: Ethan
 * @Blog: https://ethan.pub
 * @LastEditTime: 2019-12-04 11:20:04
 * @Description: 🙏BUG退散🙏
 */
import { deviceEnquire, DEVICE_TYPE } from './device'
import store from '../store';
const AppDeviceEnquire = {
    mounted() {
        deviceEnquire(deviceType => {
            switch (deviceType) {
                case DEVICE_TYPE.DESKTOP:
                    store.dispatch('setDevice', 'desktop')
                    break
                case DEVICE_TYPE.TABLET:
                    store.dispatch('setDevice', 'tablet')
                    break
                case DEVICE_TYPE.MOBILE:
                default:
                    store.dispatch('setDevice', 'mobile')
                    break
            }
        })
    }
}

export { AppDeviceEnquire }