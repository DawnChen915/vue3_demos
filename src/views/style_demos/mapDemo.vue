<template>
  <div>
    <el-row>
      <el-col :span="5">
        <el-button type="primary" v-show="!isnmg" @click="handleReturn">返回</el-button>
      </el-col>
    </el-row>
    <div
      ref="mapDom"
      style="height:500px"
    ></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data () {
    return {
      isnmg:true,
      mapData:{
        呼伦贝尔市:'hlbe',
        锡林郭勒盟:'xlgl',
        通辽市:'tl',
        兴安盟:'xa',
        赤峰市:'cf'
      },
      mapOption: {
        tooltip: {
          trigger: "item",
          show: false,
          showDelay: 0,
          transitionDuration: 0.2,
          formatter: function (params) {
            if (params.data) {
              return (
                params.name +
                "<br/>" +
                "<span style='color:#91CC75'>正常数据:" +
                params.data.normalDta +
                "</span><br/>" +
                "<apan  style='color:#E6A23C'>无效数据:" +
                params.data.warningData +
                "</apan><br/>" +
                "<apan  style='color:#F56C6C'>缺失数据:" +
                params.data.errorDta +
                "</apan>"
              );
            } else {
              return params.name + "<br/>" + "无数据";
            }
          },
        },
        toolbox: {
          show: false,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {},
          },
        },
      
        series: [
          {
            type: "map",
            map: "nmg",
            tooltip: {
              show: true,
            },
            label: {
              show: false,
              emphasis: {
                show: true,
                color: "#fff",
              },
            },
            zoom: 1,
            top: "3%",
            data: [
              {
                name: "呼伦贝尔市",
                normalDta: 100,
                warningData: 200,
                errorDta: 100,
                itemStyle: {
                  areaColor: "#54ACE5",
                },
              },
              {
                name: "通辽市",
                normalDta: 100,
                warningData: 200,
                errorDta: 100,
                itemStyle: {
                  areaColor: "#54ACE5",
                },
              },
              {
                name: "兴安盟",
                normalDta: 100,
                warningData: 200,
                errorDta: 100,
                itemStyle: {
                  areaColor: "#54ACE5",
                },
              },
              {
                name: "锡林郭勒盟",
                normalDta: 100,
                warningData: 200,
                errorDta: 100,
                itemStyle: {
                  areaColor: "#54ACE5",
                },
              },
              {
                name: "赤峰市",
                normalDta: 100,
                warningData: 200,
                errorDta: 100,
                itemStyle: {
                  areaColor: "#54ACE5",
                },
              },
            ],
            aspectScale: 0.75,
            roam: false,
            itemStyle: {
              normal: {
                borderColor: "#000",
                borderWidth: 0.8,
                areaColor: '#54ACE5'
                // {
                //   type: "linear-gradient",
                //   x: 1000,
                //   y: 600,
                //   x2: 1000,
                //   y2: 0,
                //   colorStops: [
                //     {
                //       offset: 0,
                //       color: "#274d68", // 0% 处的颜色
                //     },
                //     {
                //       offset: 1,
                //       color: "#09132c", // 50% 处的颜色
                //     },
                //   ],
                //   global: false, // 缺省为 false
                // },
              },
              emphasis: {
                show: true,
                areaColor: "#274d62",
              },
            },
            zlevel: 1,
          },
        ]
      }

    }

  },
  mounted(){
    this.initMap()
  },
  methods: {
    initMap () {
      let myMap = echarts.init(this.$refs['mapDom'])
      myMap.setOption(this.mapOption)
      this.handleMapClick(myMap)
    },
    handleMapClick (instance) {
      let that = this
      instance.on('click', async function (params) {
       if(params.name in that.mapData){
         that.mapOption.series[0].map=that.mapData[params.name]
         that.mapOption.series[0].data=[]
         that.isnmg=false
         that.initMap()
       }else{
         that.$message({message:'没有更小一级地区数据',type:'error'})
       }
      })
    },
    handleReturn(){
      this.mapOption.series[0].map='nmg'
      this.isnmg=true
      this.initMap()
    }
  }
}
</script>

<style>
</style>