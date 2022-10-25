import Home from '../views/Home'
// 1、先声明一个类
let Vue; //保存Vue构造函数，插件中要使用，不导入还能用
class VueRouter {
  constructor(options) {
    // router-view 会读取路由映射表的配置
    this.$options = options;
    // 获取路由参数
    const initial = window.location.hash.slice(1) || '/';
    // current 发生变化router-view的render函数会重新执行
    Vue.util.defineReactive(this, 'current', initial)
    // 监听 hash 发生变化并不刷新页面
    window.addEventListener('hashchange',()=>{
      this.current = window.location.hash.slice(1);
    })
  }
}
// 2、实现一个install方法
VueRouter.install = function (_Vue) {
  Vue = _Vue;

  // 5、挂在 $router 属性
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    }
  })

  // 4、注册两个vue-router常用组件
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        required: true,
      }
    },
    render(h) {
      // 这里返回的是虚拟DOM
      return h('a', {
        attrs: {
          href: "#" + this.to
        }
      }, this.$slots.default)
    }
  })

  Vue.component('router-view', {
    render(h) {
      // 获取当前对应的组件
      let component = null;
      const route = this.$router.$options.routes.find((route) => route.path === this.$router.current)
      if (route) {
        component = route.component;
      }
      console.log(this.$router.current, component);
      return h(component)
    }
  })
}

// 3、导出vue-router 类
export default VueRouter;