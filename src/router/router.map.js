import Layout from '@/components/Layout'

/**
 * 需要权限验证的路由
 */
const routerMap = [{
    path: '/about',
    component: Layout,
    meta: {
        keepalive: true,
        title: 'test',
        icon: 'form',
        name: '/about'
    },
    children: [{
        path: '/about/index',
        component: () => import('@/views/About'),
        meta: {
            keepalive: true,
            title: 'about',
            name: '/about/index'
        }
    }, {
        path: '/about/home',
        component: () => import('@/views/Home'),
        meta: {
            keepalive: true,
            title: 'home',
            name: '/about/home'
        }
    }]
},{
    path: '/demo',
    component: Layout,
    meta: {
        keepalive: true,
        title: '测试',
        icon: 'form',
        name: '/demo'
    },
    children: [{
        path: '/demo/table',
        component: () => import('@/views/demo/table.vue'),
        meta: {
            keepalive: true,
            title: '表格',
            name: '/demo/table'
        }
    }]
}]
export default routerMap