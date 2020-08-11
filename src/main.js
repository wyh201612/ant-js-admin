import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import i18n from './locales'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import themePluginConfig from './config/themePluginConfig'
import vcolorpicker from "vcolorpicker";



import './core/lazy_use'
import './permission' // 路由过滤模块
import './utils/filter' // 过滤器
import './styles/variable.less'

Vue.use(vcolorpicker);

Vue.config.productionTip = false
Vue.component('pro-layout', ProLayout)
Vue.component('page-header-wrapper', PageHeaderWrapper)
store.dispatch("GetInfo", { routes: JSON.parse(sessionStorage.getItem('routes')) })

window.umi_plugin_ant_themeVar = themePluginConfig.theme

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')