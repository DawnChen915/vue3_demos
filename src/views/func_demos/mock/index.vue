<template>
  <div>
      <h1>mock数据demo</h1>
  </div>
</template>

<script>
import {fetchList,fetchArticle} from '../../api' 

export default {
   data(){
       return{}
   },
   mounted(){
      this.getDetail()
   },
   methods:{
     getDetail(){
         var id=1
         fetchArticle({id:1}).then(res=>{
             console.log(res)
             debugger
         })
     }
   }
}
</script>

<style>

</style>