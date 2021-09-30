import 'element-plus/dist/index.css';
import ElementPlus, { ElMessage } from 'element-plus'//
import elementIcons from './element-icons';
import * as echarts from 'echarts'//引入echarts
echarts.registerMap("china", require('../views/func_demos/mapGeo/China.json'))//引入中国地图JSON
import directives from '../directive';//引入自定义指令

import request from '../utils/request'

export default{
    install(app){
        app.config.globalProperties.$message=request
        app.config.globalProperties.$message=ElMessage
        app.use(elementIcons).use(directives).use(ElementPlus)
    }
}
