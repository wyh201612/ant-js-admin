/*
 * @Author: Ethan
 * @Github: https://github.com/ethanpub
 * @Date: 2019-05-22 17:29:06
 * @LastEditors: Ethan
 * @Blog: https://ethan.pub
 * @LastEditTime: 2019-12-04 14:25:59
 * @Description: 🙏BUG退散🙏
 */
import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'
import Login from '@/components/Login'

// import { GlobalStore } from '@/store/global'

Vue.use(Router)

const router = new Router({
    mode: 'hash',
    scrollBehavior: (...arg) => arg[2] || { x: 0, y: 0 },
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            redirect: '/dashboard',
            meta: {
                name: '主页'
            },
            component: Layout,
            children: [{
                path: 'dashboard',
                name: '欢迎页',
                component: () => import('@/components/Workplace'),
            }, ]
        }, {
            path: "/login",
            component: Login,
            meta: {
                name: "登录"
            }
        }, {
            path: '/404',
            component: () => import('@/components/Execption/404.vue')
        }
    ]
})

export default router