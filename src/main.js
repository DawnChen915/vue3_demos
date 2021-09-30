import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import appPlugins from  './plugins/app'

//mock模拟数据
import '../mock'

const app=createApp(App)


app.config.productionTip = false;

app.use(router).use(store).use(appPlugins).mount('#app')
