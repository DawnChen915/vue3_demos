import 'element-plus/dist/index.css';
import elementIcons from './element-icons';
import * as echarts from 'echarts'//引入echarts
echarts.registerMap("china", require('../views/func_demos/mapGeo/China.json'))//引入中国地图JSON
import directives from '../directive';//引入自定义指令
export default{
    install(app){
        app.use(elementIcons).use(directives)
    }
}
