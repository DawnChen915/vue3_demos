<template>
  <div>
    <div
      ref="mapDom"
      style="height:600px"
    >
      <el-button>返回</el-button>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import nmg from '../mapDemojson/Inner Mongolia.json'

import { isPointInPolygon } from './index'

export default {
  data () {
    return {
      maps: {
        呼伦贝尔市: 'hlbr',
        锡林郭勒盟: 'xlgl',
        通辽市: 'tl',
        兴安盟: 'xa',
        赤峰市: 'cf'
      },
      mapData: [
        { name: '海门', value: 9 },
        { name: '鄂尔多斯', value: 12 },
        { name: '招远', value: 12 },
        { name: '舟山', value: 12 },
        { name: '齐齐哈尔', value: 14 },
        { name: '盐城', value: 15 },
        { name: '赤峰', value: 16 },
        { name: '青岛', value: 18 },
        { name: '乳山', value: 18 },
        { name: '金昌', value: 19 },
        { name: '泉州', value: 21 },
        { name: '莱西', value: 21 }
      ],
      geoCoordMap: {
        '海门': [121.15, 31.89],
        '鄂尔多斯': [109.781327, 39.608266],
        '招远': [120.38, 37.35],
        '舟山': [122.207216, 29.985295],
        '齐齐哈尔': [123.97, 47.33],
        '盐城': [120.13, 33.38],
        '赤峰': [118.87, 42.28],
        '青岛': [120.33, 36.07],
        '乳山': [121.52, 36.89],
        '金昌': [102.188043, 38.520089],
        '泉州': [118.58, 24.93],
        '莱西': [120.53, 36.86],
      },
      mapOption: {
        title: {
          text: '蒙东购电成本',
          subtext: 'Show Data',
          left: 'center',
          top: 'top',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            if (typeof (params.value)[2] == "undefined") {
              return params.name + ' : ' + params.value;
            } else {
              return params.name + ' : ' + params.value[2];
            }
          }
        },
        legend: {
          left: 'left',
          data: ['强', '中', '弱'],
          textStyle: {
            color: '#ccc'
          }
        },
        backgroundColor: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#0f2c70' // 0% 处的颜色
          }, {
            offset: 1, color: '#091732' // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        },
        geo: {
          map: 'nmg',
          show: true,
          roam: false,
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#091632',
              borderColor: '#1773c3',
              shadowColor: '#1773c3',
              shadowBlur: 20
            }
          }
        },
        series: [
          {
            type: 'map',
            map: 'nmg',
            geoIndex: 1,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: true, // 存在legend时显示
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: '#fff'
                }
              }
            },
            roam: false,
            itemStyle: {
              normal: {
                areaColor: '#031525',
                borderColor: '#3B5077',
                borderWidth: 1
              },
              emphasis: {
                areaColor: '#0f2c70'
              }
            },
            data: [

            ]
          },
          {
            name: '机组',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: [],
            symbolSize: function (val) {
              return val[2];
            },
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#ddb926'
              }
            }
          },
          {
            name: '前5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: [],
            symbolSize: function (val) {
              return val[2] / 1;
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#f4e925',
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            zlevel: 1
          }
        ]
      }
    }
  },
  mounted () {
    this.setMapData(this.mapData)
    this.initMap()

    this.getPoints('通辽市')
  },
  methods: {
    convertData (data) {
      var res = [];
      var points = this.getPoints('通辽市')
      for (var i = 0; i < data.length; i++) {
        // var geoCoord = this.geoCoordMap[data[i].name];
        var geoCoord = points[i]
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          });
        }
      }
      return res;
    },
    setMapData (data) {
      this.mapOption.series[1].data = this.convertData(data)
      this.mapOption.series[2].data = this.convertData(data.sort(function (a, b) {
        return b.value - a.value;
      }).slice(0, 6))
    },
    initMap () {
      var myMap = echarts.init(this.$refs['mapDom'])
      myMap.setOption(this.mapOption)
      this.handleMapClick(myMap)
    },
    //地图点击事件
    handleMapClick (instance) {
      let that = this
      instance.on('click', async function (params) {
        if (params.name in that.maps) {
          that.mapOption.geo.map = that.maps[params.name]
          that.mapOption.series[0].map = that.maps[params.name]
          instance.clear()
          that.initMap()
        }
      })

    },
    //获取点
    getPoints (name) {
      var centerX = this.getCenterBorder(name).center[0]
      var centerY = this.getCenterBorder(name).center[1]
      var x = 0
      var y = 0
      var pt = []
      var polygon = this.getCenterBorder(name).polygon
      var points = []
      for (var i = 0; i < 200; i++) {
        x = centerX + this.getRandom();
        y = centerY + this.getRandom();
        pt = [x, y]
        if (isPointInPolygon(pt, polygon)) {
          points.push(pt)
        }
      }
      console.log(points)
      return points
    },
    //获取中心点和边界
    getCenterBorder (name) {
      switch (name) {
        case '赤峰市':
          return { center: nmg.features[0].properties.center, polygon: nmg.features[0].geometry.coordinates[0][0] }
        case '通辽市':
          return { center: nmg.features[1].properties.center, polygon: nmg.features[1].geometry.coordinates[0][0] }
        case '呼伦贝尔市':
          return { center: nmg.features[2].properties.center, polygon: nmg.features[2].geometry.coordinates[0][0] }
        case '兴安盟':
          return { center: nmg.features[3].properties.center, polygon: nmg.features[3].geometry.coordinates[0][0] }
        case '锡林郭勒盟':
          return { center: nmg.features[4].properties.center, polygon: nmg.features[4].geometry.coordinates[0][0] }
        default:
          break;
      }
    },
    getRandom () {
      return Math.random() * 5 * (Math.random() > 0.5 ? -1 : 1);
    },

  }
}
</script>

<style>
</style>