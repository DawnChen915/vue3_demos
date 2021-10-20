import 'element-plus/dist/index.css';
import ElementPlus, { ElMessage } from 'element-plus'//
import elementIcons from './element-icons';
import * as echarts from 'echarts'//引入echarts
echarts.registerMap("china", require('../views/func_demos/mapGeo/China.json'))//引入中国地图JSON
echarts.registerMap("nmg", require('../views/style_demos/mapDemojson/Inner Mongolia.json'))//引入内蒙地图JSON  删除了部分地区
echarts.registerMap("xa", require('../views/style_demos/mapDemojson/兴安盟.json'))//引入兴安盟地图JSON
echarts.registerMap("xlgl", require('../views/style_demos/mapDemojson/锡林郭勒盟.json'))//引入锡林郭勒盟地图JSON
echarts.registerMap("hlbe", require('../views/style_demos/mapDemojson/呼伦贝尔市.json'))//引入呼伦贝尔市地图JSON 
echarts.registerMap("tl", require('../views/style_demos/mapDemojson/通辽市.json'))//引入通辽市地图JSON
echarts.registerMap("cf", require('../views/style_demos/mapDemojson/赤峰市.json'))//引入内蒙地图JSON  删除了部分地区
import directives from '../directive';//引入自定义指令

import request from '../utils/request'

export default{
    install(app){
        app.config.globalProperties.$message=request
        app.config.globalProperties.$message=ElMessage
        app.use(elementIcons).use(directives).use(ElementPlus)

    }
}
