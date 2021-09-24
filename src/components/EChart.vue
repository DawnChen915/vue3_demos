<template>
  <div class="chart">
    <div class="chart-view" ref="chart"></div>
    <div class="chart-tip" v-if="visibleTip">暂无数据</div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  props: {
    option: Object
  },
  data() {
    return {
      chart: null,
      // 提示是否可见
      visibleTip: false
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chart)
    if (this.option) {
      this.chart.setOption(this.option, true)
    }

    // 添加窗口改变监听
    const DELAY = 500 // 延迟时间
    const chart = this.chart
    this.chart._resize = this._throttle(function () {
      setTimeout(() => {
        chart.resize()
      }, 300)
    }, DELAY)

    window.addEventListener('resize', this.chart._resize)

    // 监听菜单状态
    // window.eventBus.$on('menuCollapse', collapse => {
    //   setTimeout(() => {
    //     chart.resize()
    //   }, 300)
    // })
  },
  beforeUnmount() {
    // 移除窗口改变监听
    window.removeEventListener('resize', this.chart._resize)

    // 移除菜单监听
    // window.eventBus.$off('menuCollapse')
  },
  methods: {
    // 设置chart属性
    setOption(option) {
      if (option) {
        this.chart && this.chart.setOption(option, true)
        this.visibleTip = false
        return
      }
      this.chart.clear()
      this.visibleTip = true
    },
    // 节流
    _throttle(func, delay) {
      let timer = null
      let startTime = Date.now()
      return function () {
        let curTime = Date.now()
        let remaining = delay - (curTime - startTime)
        let context = this
        let args = arguments
        clearTimeout(timer)
        if (remaining <= 0) {
          func.apply(context, args)
          startTime = Date.now()
        } else {
          timer = setTimeout(func, remaining)
        }
      }
    }
  },
  watch: {
    option: {
      handler(newValue) {
        this.chart.setOption(newValue, true)
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.chart {
  // width: 100%;
  height: 100%;
  position: relative;
  .chart-view {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
  }
  .chart-tip {
    position: absolute;
    left: 50%;
    top: 50%;
    // bottom: 0;
    // right: 0;
    // margin: auto;
    margin-top: -9px;
    margin-left: -36px;
    z-index: 2;
    font-size: 18px;
    line-height: 18px;
    font-weight: 400;
    color: #999;
  }
}
</style>
