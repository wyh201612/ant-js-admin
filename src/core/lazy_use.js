import Vue from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import Viser from 'viser-vue'

// ext library
import Dialog from '@/components/Dialog'
import PermissionHelper from '@/utils/helper/permission'
import './directives/action'
import BaseLayout from '@/components/Container/index.jsx';

const focusTags = ['INPUT', 'SELECT', 'TEXTAREA']

/**
 * focus指令
 */
Vue.directive('focus', {
    inserted: el =>
        focusTags.includes(el.tagName) ?
        el.focus() : findTag(el.childNodes)
})

function findTag(node) {
    node = Array.from(node)
    node.forEach(child => {
        focusTags.includes(child.tagName) ?
            child.focus() :
            findTag(child.childNodes)
    })
}

Vue.component('BaseLayout', BaseLayout)
Vue.use(Viser)
Vue.use(Antd)
Vue.use(Dialog) // this.$dialog func
Vue.use(PermissionHelper)

process.env.NODE_ENV !== 'production' && console.warn('[antd-pro] NOTICE: Antd use lazy-load.')