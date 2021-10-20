<template>
  <div>
    <el-row>
      <el-col :span="24">
        <p>后台服务git地址</p>
      </el-col>
      <el-col :span="6">
        <el-form
          ref="elForm"
          :model="formData"
          size="medium"
          label-width="100px"
        >
          <el-form-item
            label="用户名"
            prop="name"
          >
            <el-input
              v-model="formData.name"
              placeholder="请输入用户名"
              clearable
              prefix-icon='el-icon-user'
              :style="{width: '100%'}"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
          >
            <el-input
              v-model="formData.password"
              placeholder="请输入密码"
              clearable
              prefix-icon='el-icon-key'
              show-password
              :style="{width: '100%'}"
            ></el-input>
          </el-form-item>
          <el-form-item size="large">
            <el-button
              type="primary"
              @click="submitForm"
            >提交</el-button>
            <el-button
              type="primary"
              @click="vertify"
            >校验</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  components: {},
  props: [],
  data () {
    return {
      formData: {
        name: undefined,
        password: undefined,
      },
      rules: {
        name: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
      },
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    submitForm () {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
        axios({ baseURL: '/rest', url: '/users/login', method: 'get', params: this.formData }).then(res => {
          if (res.data.isLogin) {
            sessionStorage.setItem('demos_user_token', res.data.token)
            this.$message({ message: res.data.message, type: 'success' })
          } else {
            this.$message({ message: res.data.message, type: 'error' })
          }
        })
      })
    },
    resetForm () {
      this.$refs['elForm'].resetFields()
    },
    vertify () {
      axios({ headers: { authorization:'Bearer '+sessionStorage.getItem('demos_user_token') }, baseURL: '/rest', url: '/users/vertify', method: 'get' }).then(res => {
        console.log(res)
      })
    }
  }
}

</script>
<style>
</style>
