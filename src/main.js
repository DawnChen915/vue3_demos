import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus, { ElMessage } from 'element-plus'//
import router from './router'
import store from './store'
import appPlugins from  './plugins/app'


const app=createApp(App)


app.config.productionTip = false;
app.config.globalProperties.$message=ElMessage
app.use(router).use(store).use(ElementPlus).use(appPlugins).mount('#app')
