import { createStore } from 'vuex'

const files = require.context('./modules', false, /\.js$/)
const modules = {}

files.keys().forEach((key) => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

Object.keys(modules).forEach((key) => {
  modules[key]['namespaced'] = true
})

const store= createStore({
 modules
})

//防止页面刷新vuex中的数据丢失
store.subscribe((mutations,state)=>{
  sessionStorage.setItem('vue3.x_demo_theme', `{
    "layout":"${state.setting.layout}"
  }`)
})
export default store