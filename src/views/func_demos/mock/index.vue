<template>
  <div>
    <h1>mock数据demo</h1>
    <h2>李杰</h2>
    <el-input
      v-model="name"
     
    > </el-input>
    <button
      class="button1"
      hover-class="button-hover"
      @click="sayHello"
    >
      按钮
    </button>
    <el-switch
      v-model="value"
      active-color="#13ce66"
      inactive-color="#ff4949"
    >
    </el-switch>
    <el-table :data="listData">
      <el-table-column></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchList, fetchArticle } from '../../api'

export default {
  data () {
    return {
      listData: [],
      name: '',
      value: ''
    }
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      var id = 1
      fetchArticle({ id: 1 }).then(res => {
        console.log(res)
        debugger
      })
    },
    sayHello () {
      // this.$message({ message: 'helloe', type: 'error' })
      this.name='Lijie'
    }
  }
}
</script>

<style>
.button1 {
  height: 200px;
  width: 100px;
  font-size: 30px;
  color: #fff;
}
</style>