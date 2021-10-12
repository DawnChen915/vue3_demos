// SETUP测试组件页面
<template>
<div class="setupChild">
    <h2>我是子组件</h2>
    <p>SETUP语法糖中通过“defineProps”API来接受父组件传递的参数</p>
    <div><h1>{{acount}}</h1></div>
    <p>SETUP语法糖中通过“defineEmits”API来定义emit方法</p>
    <el-button type="primary" @click="handleDown">减一</el-button>
    </div>
</template>
<script setup>
import {ref,defineProps,defineEmits} from 'vue'
import {debounce} from '../../../utils'
import {ElMessage} from 'element-plus'
const child= ref('setupChild')
const props= defineProps({
    acount:Number
})
const emits= defineEmits(['change', 'delete'])

function handleDown(){
    debounce( ElMessage({message:'减一', type: 'success'}),1000)
    emits('change')
}
</script>
<style>
.setupChild{
    border: 1px solid #000;
    padding: 20px;
}
</style>