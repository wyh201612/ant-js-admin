import router from './router'
import store from './store'
import NProgress from 'nprogress'
import notification from 'ant-design-vue/es/notification'

NProgress.configure({ showSpinner: false }) // NProgress 配置
const whiteList = ['/login'] // 路由白名单
const loginRoutePath = '/login'
const defaultRoutePath = '/dashboard'

router.beforeEach((to, from, next) => {
    NProgress.start()
    if (sessionStorage.getItem('Token')) {
        if (to.path === loginRoutePath) {
            next({ path: defaultRoutePath })
            NProgress.done()
        } else {
            if (store.getters.roles.length === 0) {
                store
                    .dispatch('GetInfo')
                    .then(roles => {
                        const newRouter = [...roles,
                            {
                                path: '*',
                                redirect: '/404'
                            }
                        ]
                        // 动态添加可访问路由表
                        router.options.routes.push(...newRouter)
                        router.addRoutes(newRouter)
                        // 请求带有 redirect 重定向时，登录自动重定向到该地址
                        const redirect = decodeURIComponent(from.query.redirect || to.path)
                        if (to.path === redirect) {
                            next({ ...to, replace: true })
                        } else {
                            // 跳转到目的路由
                            next({ path: redirect })
                        }
                    })
                    .catch(() => {
                        notification.error({
                            message: '错误',
                            description: '请求用户信息失败，请重试'
                        })
                        // 失败时，获取用户信息失败时，调用登出，来清空历史保留信息
                        store.dispatch('Logout').then(() => {
                            next({ path: loginRoutePath, query: { redirect: to.fullPath } })
                        })
                    })
            } else {
                next()
            }
        }
    } else {
        if (whiteList.includes(to.path)) {
            // 在免登录白名单，直接进入
            next()
        } else {
            next({ path: loginRoutePath, query: { redirect: to.fullPath } })
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})