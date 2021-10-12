// 电表数据详情页面
<template>
  <div style="padding:20px">
    <el-page-header @back="goBack">
      <template #title>
        <div style="display:flex">
          返回
        </div>
      </template>
      <template #content>
        <div style="display:flex">
          <span>电表详情</span>
          <span
            @click="next"
            class="nextButton"
          >下一条</span>
        </div>
      </template>
    </el-page-header>
    <div style="margin-top:20px">
      <el-descriptions
        class="margin-top"
        title="电表详情"
        :column="3"
        border
      >
        <template #extra>
          <el-button type="primary" size="small">数据导出</el-button>
          <el-button
            type="warning"
            size="small"
          >异常处理</el-button>
        </template>
        <el-descriptions-item>
          <template #label>
            <i class="el-icon-house"></i>
            计量点名称
          </template>
          kooriookami
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <i class="el-icon-coin"></i>
            资产编码
          </template>
          18100000000
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <i class="el-icon-location-outline"></i>
            地理区域
          </template>
          呼伦贝尔市
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <!-- <i class="el-icon-lighting"></i> -->
            <el-icon>
              <lightning />
            </el-icon>
            发电类型
          </template>
          <el-tag size="small">火电</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <i class="el-icon-user"></i>
            所属市场成员
          </template>
          内蒙古呼伦贝尔大发发电
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <i class="el-icon-office-building"></i>
            发电集团
          </template>
          No.1188, Wuzhong Avenue
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <i class="el-icon-data-analysis"></i>
            数据状态
          </template>
          <el-tag
            size="small"
            type="success"
          >正常</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div style="text-align:center;margin-bottom:20px">
      <h1>数据展示</h1>
      <el-switch
        v-model="dayormonth"
        active-text="按月展示"
        inactive-text="按日展示"
      >
      </el-switch>
    </div>
    <echarts
      style="height:400px"
      :option="barOption"
    ></echarts>
  </div>
</template>
<script>
import Echarts from '../../components/EChart.vue'
export default {
  components: { Echarts },
  data () {
    return {
      dayormonth: true,
      colors: ['#5470C6', '#91CC75', '#EE6666'],
      barOption: {
        color: ['#5470C6', '#91CC75', '#EE6666'],
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          right: '20%'
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ['总正向', '总反向', '电量']
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            // prettier-ignore
            data:  ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '表码',
            position: 'right',
            axisLine: {
              show: true,
            },
            axisLabel: {
              formatter: '{value}'
            }
          },
         
          {
            type: 'value',
            name: '电量',
            position: 'left',
            axisLine: {
              show: true,
            },
            axisLabel: {
              formatter: '{value} MWh'
            }
          }
        ],
        series: [
          {
            name: '总正向',
            type: 'line',
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
            ]
          },
          {
            name: '总反向',
            type: 'line',
          
            data: [
              2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
            ]
          },
          {
            name: '电量',
            type: 'bar',
            yAxisIndex: 1,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
          }
        ]
      }
    }
  },
  watch:{
    dayormonth(value){
      if(!value){
        let days=[]
        let data=Math.round(Math.random()*100)
        let data1=[]
        let data2=[]
        let data3=[]
        for(let i=1;i<=30;i++){
           days.push(i+'')
           data=data+Math.round(Math.random()*100)
           data1.push(data)
           data2.push(0.5*data+Math.round(Math.random()*10))
        }
        data1.forEach((e,index)=>{
          if(index==data1.length-1){
            return
          }
          data3.push(data1[index+1]-data1[index])
        })
        debugger
        this.barOption.xAxis[0].data=days
        this.barOption.series[0].data=data1
        this.barOption.series[1].data=data2
        this.barOption.series[2].data=data3
      }else{
        let days=[]
        let data=Math.round(Math.random()*100)
        let data1=[]
        let data2=[]
        let data3=[]
        for(let i=1;i<=12;i++){
           days.push(i+'月')
           data=data+Math.round(Math.random()*100)
           data1.push(data)
           data2.push(0.5*data+Math.round(Math.random()*10))
        }
        data1.forEach((e,index)=>{
          if(index==data1.length-1){
            return
          }
          data3.push(data1[index+1]-data1[index])
        })
        debugger
        this.barOption.xAxis[0].data=days
        this.barOption.series[0].data=data1
        this.barOption.series[1].data=data2
        this.barOption.series[2].data=data3
      }
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.nextButton {
  font-size: 14px;
  font-weight: 500;
  margin-left: 20px;
  cursor: pointer;
}
</style>