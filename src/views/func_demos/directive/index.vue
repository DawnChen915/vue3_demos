<template>
  <div>
    <h1>自定义插件demo</h1>
    <div v-VdialogDrag>
      <h2>输入框特殊字符校验</h2>
      <el-input v-model="inputVal" v-VisSpec/>
      <h2>可拖拽对话框</h2>
      <el-button type="primary" @click="myDialog = true">打开对话框</el-button>
      <el-dialog title="自定义插件demo" v-model="myDialog">
        <div>
          <h2>可拖拽对话框</h2>
          <p>自定义指令“VdialogDrag”</p>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputVal: undefined,
      myDialog: false,
      test: "test",
    };
  },
};
</script>

<style>
</style>