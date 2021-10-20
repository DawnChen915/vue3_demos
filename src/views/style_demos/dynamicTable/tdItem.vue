<template>
  <td
    v-for="(item,index) in headItem"
    :key="index"
  >
    <div v-if="item.children">
      <tr>
        <td :colspan="item.children.length+1">
          <el-input  size="mini" placeholder="请输入label" v-model="item.label"></el-input>
        </td>
      </tr>
      <tr>
        <td-item :headItem="item.children"></td-item>
      </tr>
    </div>
    <span v-else>
      <tr>
        <td>
          <el-input
            size="mini"
            placeholder="请输入label"
            v-model="item.label"
          ></el-input>
          <el-input  size="mini" placeholder="请输入prop" v-model="item.prop"></el-input>
        </td>
      </tr>
      <tr>
        <td>
          <span @click="handleAddChild(item)">+</span>
          <span @click="handleRemove(item,headItem)">-</span>
        </td>
      </tr>
    </span>
  </td>
  <td>
    <span @click="handleAdd(headItem)">+</span>
    <span @click="handleRemoveEnd(headItem)">-</span>
  </td>
</template>
<script>

export default {
  name: 'tdItem',
  props: {
    headItem: {
      type: Array,
    }
  },
  data () {
    return {


    }
  },
  methods: {
    //添加并列
    handleAdd (e) {
      e.push({ label:'',porp:''})
    },
    //添加下属
    handleAddChild (e) {
      e.children = [{ label: '' }]
    },
    //移除并列
    handleRemove (e, h) {
      var i = h.indexOf(e)
      h.splice(i, 1)
    },
    //删除末尾
    handleRemoveEnd (h) {
      h.pop()
    }
  }

}
</script>
