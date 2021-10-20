<template>
  <div class="my-table">
    <el-table :data="data">
      <my-column v-for="(item,index) in col" :key="index" :col="item"></my-column>
    </el-table>
  </div>
</template>

<script>
import MyColumn from './myColumn'
export default {
  components: {
    MyColumn
  },
  props: {
    col: {
      type: Array
    },
    data: {
      type: Array
    }
  }
}
</script>
<style scoped>
</style>
