import storage from 'store'
import { getInfo } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { getAsyncRoute } from '@/router/permission'
import router from '@/router'
const user = {
    state: {
        token: '',
        name: '',
        welcome: '',
        avatar: '',
        roles: [],
        info: {}
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, { name, welcome }) => {
            state.name = name
            state.welcome = welcome
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_INFO: (state, info) => {
            state.info = info
        }
    },

    actions: {
        // 登录
        Login({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                login(userInfo).then(response => {
                    const result = response.result
                    storage.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
                    commit('SET_TOKEN', result.token)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getInfo().then(res => {
                    const routes = getAsyncRoute({ roleRoutes: state.routes ? state.routes : res.result });
                    sessionStorage.setItem('routes', JSON.stringify(res.result));
                    /**
                     * 将404的路由动态添加
                     * 防止登录后直接404
                     */
                    const newRouter = [
                        ...routes,
                        {
                            path: "*",
                            redirect: "/404",
                        },
                    ];
                    // 动态添加可访问路由表
                    router.options.routes.push(...newRouter);
                    router.addRoutes(newRouter);
                    commit('SET_ROLES', routes)
                    resolve(routes)
                })
            })
        },

        // 登出
        Logout({ commit }) {
            return new Promise((resolve) => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                sessionStorage.removeItem('Token')
                resolve(true)
            })
        }

    }
}

export default user