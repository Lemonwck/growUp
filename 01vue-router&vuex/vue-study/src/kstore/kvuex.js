
let Vue;
// 声明Store类
class Store {
  constructor(options) {
    this._vm = new Vue({
      data: {
        $$state: options.state
      }
    })

    this._mutations = options.mutations;
    this._actions = options.actions;

    this.commit = this.commit.bind(this);
    this.dispatch = this.dispatch.bind(this);

    this.getters = {}
  }

  get state() {
    return this._vm._data.$$state
  }

  set state(v) {
    console.error('不能直接修改值')
  }

  commit(type, payload) {
    const entry = this._mutations[type];
    if (!entry) {
      console.error('没有此方法')
    }
    entry(this.state, payload)
  }

  dispatch(type, payload) {
    const entry = this._actions[type];
    if (!entry) {
      console.error('没有此方法')
    }
    entry(this, payload)
  }

}

// 实现 install 方法
function install(_Vue) {
  Vue = _Vue;

  Vue.mixin({
    beforeCreate(){
      if(this.$options.store){
        Vue.prototype.$store = this.$options.store;
      }
    }
  })
}

export default { Store, install }