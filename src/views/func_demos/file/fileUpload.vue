<template>
  <el-upload
    v-loading="fileLoading"
    :class="uploadStyle"
    action="myupload"
    :on-change="fileChange"
    :http-request="(file,fileList)=>{myupload(file,fileList)}"
    :on-remove="fileRemove"
    list-type="picture-card"
    :limit="4"
    :file-list="fileList"
  >
    <i class="el-icon-plus"></i>
  </el-upload>

</template>

<script>
export default {
  data () {
    return {
      fileList: [],
      uploadStyle: '',
      fileLimit: 1,
      fileLoading: false,
    };
  },
  mounted () {
    //模拟获取文件
    this.fileLoading = true
    setTimeout(() => {
      this.fileList = [
        { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }
      ]
      this.fileLoading = false
      this.uploadStyle =(this.fileList.length == this.fileLimit||this.fileList.length > this.fileLimit) ? 'noneBtnImg' : ''
    }, 2000)
  },
  methods: {
    //修改样式
    fileChange (file, filelist) {
      this.uploadStyle = filelist.length == this.fileLimit ? 'noneBtnImg' : ''
    },
    myupload (file, fileList) {
      //在这里处理上传事务
    },
    //修改样式
    fileRemove(file,filelist){
       this.uploadStyle = filelist.length == this.fileLimit ? 'noneBtnImg' : ''
    }
  }
}
</script>
<style>
.noneBtnImg .el-upload--picture-card {
  display: none !important; /* 上传按钮隐藏 */
}
</style> 