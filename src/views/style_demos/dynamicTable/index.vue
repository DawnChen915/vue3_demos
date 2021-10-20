<template>
  <div>
    <h3>表头配置</h3>
    <table border="1" cellspacing="0">
      <tr>
        <td-item :headItem="head"></td-item>
        <!-- <td @click="">+</td> -->
      </tr>
    </table>
    <!-- <el-button type="primary" @click="handleOut">输出表头</el-button> -->
    <h3>表头输出</h3>
    <my-table v-if="ishowHead" :col="head"> </my-table>
  </div>
</template>

<script>
import tdItem from './tdItem.vue'
import myTable from './myTable.vue'
export default {
  components: {
    tdItem,myTable
  },
  data () {
    return {
      ishowHead:true,
      head: [
        { label: 'date' },
        { label: 'year' },
        {
          label: 'Delivery Info',
          children: [
            {
              label: 'name',
              children: [
                {
                  label: 'Address Info',
                  children: [
                    {
                      label: 'address'
                    },
                    {
                      label: 'email'
                    }
                  ]
                },
                {
                  label: 'phone'
                }
              ]
            },
            { label: 'sex' }
          ]
        }
      ],
      
    }

  },
  mounted(){
  
  },
  methods:{
    
  }

}
</script>

<style>
</style>