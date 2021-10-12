// VUE3.0 SETUP语法糖
<template>
<div>
    <div>{{TITLE}}</div>
    <setup-child :acount="number" @change="number--"></setup-child>
    <el-button type="primary" @click="plus" >加一</el-button>
    </div>
</template>
<script setup>
import {ref,defineProps} from 'vue'
import setupChild from './setUpChild.vue'
 const TITLE='VUE3.0 script setup语法糖'
 const number=ref(200)
 const plus=()=>{
     number.value++
     console.log(number)
 }
</script>