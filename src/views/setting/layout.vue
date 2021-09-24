<template>
<div>
  <h1>布局设置</h1>
  <div>
    <el-form
      ref="layoutFrom"
      :model="formData"
      size="medium"
      label-width="120px"
    >
      <el-form-item label="布局方式" prop="layout" required>
        <el-switch
          v-model="formData.layout"
          active-text="横向布局"
          inactive-text="纵向布局"
          active-color="#0095FF"
          inactive-color="#FF0000"
        ></el-switch>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
  data() {
    return {
      formData: {
        layout: true,
      },
    };
  },
  computed:{
    ...mapState({
      layout:(state)=>state.setting.layout
    })
  },
  created() {
    this.formData.layout=this.layout=='horizontal'?true:false
  },
  mounted(){
    // this.changeLayout('horizontal')
  },
  methods:{
    ...mapMutations('setting',['changeLayout']),
     submitForm() {
      this.$refs['layoutFrom'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
        if(this.formData.layout){
          this.changeLayout('horizontal')
        }else{
          this.changeLayout('vertical')
        }
      })
    },
    resetForm() {
      this.$refs['layoutFrom'].resetFields()
    },

  }
};
</script>

<style>
</style>