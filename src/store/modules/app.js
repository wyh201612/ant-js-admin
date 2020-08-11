import storage from 'store'
import {
    TOGGLE_MOBILE_TYPE,
    // i18n
    APP_LANGUAGE
} from '@/store/mutation-types'
import { loadLanguageAsync } from '@/locales'

const app = {
    state: {
        mobileType: 'desktop'
    },
    mutations: {
        [TOGGLE_MOBILE_TYPE]: (state, mobileType) => {
            state.mobileType = mobileType
        }
    },
    actions: {
        setLang({ commit }, lang) {
            return new Promise((resolve, reject) => {
                commit(APP_LANGUAGE, lang)
                loadLanguageAsync(lang).then(() => {
                    resolve()
                }).catch((e) => {
                    reject(e)
                })
            })
        },
        setDevice({ commit }, device) {
            commit(TOGGLE_MOBILE_TYPE, device)
        }
    }
}

export default app