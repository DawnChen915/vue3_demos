<template>
  <div>
      <h1>防抖节流函数</h1>
      <h3>未防抖效果</h3>
      <el-input v-model="val1" @input="showOutVal1"/>
      <p>{{outVal1}}</p>
      <el-divider />
      <h3>防抖效果</h3>
      <el-input v-model="val2" @input="showOutVal2"/>
      <p>{{outVal2}}</p>
      <h3>节流函数 </h3>
      <el-input v-model="val3" @input="showOutVal3"/>
      <p>{{outVal3}}</p>
  </div>
</template>

<script>
import {debounce,throttle} from '../../../utils'
export default {
    data() {
        return {
            val1:undefined,
            outVal1:undefined,
            val2:undefined,
            outVal2:undefined,
            val3:undefined,
            outVal3:undefined
        }
    },
    methods:{
        showOutVal1(){
            this.outVal1=this.val1
        },
        showOutVal2(val){
            var _this=this
            debounce(()=>_this.outVal2=val,1000)
        },
        showOutVal3(val){
            var _this=this
            throttle(()=>_this.outVal3=val,1000)
        },
        initInterval(){
            if(interval){
                clearInterval(interval)
            }
            var interval=setInterval(()=>console.log('lalla'),3*1000)
        }
    },
    mounted(){
        //setInterval Function
      this.initInterval()
       
    }
}
</script>

<style>

</style>