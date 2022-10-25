import Vue from 'vue';
// 1、下载vue-router插件
import VueRouter from './kvue-router'
import Home from '../views/Home.vue'
// 2、把插件挂在到vue实例中
Vue.use(VueRouter)

// 3、配置路由表
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

// 4、实例化vue-router并导出
const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

// 5、导出路由组件
export default router;