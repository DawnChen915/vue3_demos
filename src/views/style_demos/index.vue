<template>
  <div>
    <div class="title">
      <div style="font-size:25px">数据质量管理</div>
      <el-select
        v-model="queryParams.city"
        placeholder="请选择城市"
        @change="handleQuery"
        clearable
        :style="{width: '120px'}"
        size="mini"
      >
        <el-option
          v-for="(item, index) in cityOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <el-row :gutter="20">
      <el-col :span="12">
        <echarts
          style="height:300px"
          :option="pieOption"
        >
        </echarts>
      </el-col>
      <el-col :span="12">
        <echarts
          style="height:300px"
          :option="barOption2"
        >
        </echarts>
      </el-col>
    </el-row>
    <div>
      <el-row :gutter="15">
        <el-form
          ref="elForm"
          :model="queryParams"
          size="mini"
          label-width="100px"
        >
          <el-col :span="4">
            <el-form-item
              label="计量点名称"
              prop="name"
            >
              <el-input
                v-model="queryParams.name"
                placeholder="请输入计量点名称"
                clearable
                :style="{width: '100%'}"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item
              label="数据状态"
              prop="status"
            >
              <el-select
                v-model="queryParams.status"
                placeholder="请选择数据状态"
                clearable
                :style="{width: '100%'}"
              >
                <el-option
                  v-for="(item, index) in statusOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item
              label="发电类型"
              prop="type"
            >
              <el-select
                v-model="queryParams.type"
                placeholder="请选择发电类型"
                clearable
                :style="{width: '100%'}"
              >
                <el-option
                  v-for="(item, index) in typeOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item
              label="市场成员"
              prop="generatingStation"
            >
              <el-input
                v-model="queryParams.generatingStation"
                placeholder="请输入市场成员"
                clearable
                :style="{width: '100%'}"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item
              label="地理区域"
              prop="area"
            >
              <el-select
                v-model="queryParams.area"
                placeholder="请选择地理区域"
                clearable
                :style="{width: '100%'}"
              >
                <el-option
                  v-for="(item, index) in areaOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item
              label="资产编码"
              prop="code"
            >
              <el-input
                v-model="queryParams.code"
                placeholder="请输入资产编码"
                clearable
                :style="{width: '100%'}"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item size="mini">
              <el-button
                type="primary"
                @click="submitForm"
              >提交</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <el-table
      ref="mytable"
      :data="tableData"
      style="width: 100%"
      v-loading="queryParams.loading"
    >
      <el-table-column
        type="index"
        label="序号"
      />
      <el-table-column
        label="计量点名称"
        prop="name"
      >
        <template #default="scope">
          <el-button
            type="text"
            @click="showDetail(scope.row)"
          >
            {{scope.row.name}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="所属市场成员"
        prop="generationEnterprises"
        show-overflow-tooltip
      />
      <el-table-column
        label="发电集团"
        prop="generatingStation"
        show-overflow-tooltip
      />
      <el-table-column
        label="发电类型"
        prop="type"
      />
      <el-table-column
        label="地理区域"
        prop="area"
      />

      <el-table-column
        label="倍率"
        prop="ratio"
      />
      <el-table-column
        label="数据状态"
        prop="status"
      >
        <template #default="scope">
          <span :style="statusColor(scope.row)">
            <i :class="statusIcon(scope.row)" />
            {{scope.row.status==1?'正常':scope.row.status==2?'正确性异常':'完整性异常'}}
          </span>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :page="queryParams.page"
      :limit="queryParams.limit"
      :total="queryParams.total"
      @pagination="handlePage"
    ></pagination>
  </div>

</template>

<script>
import Echarts from '../../components/EChart.vue'
import Pagination from '../../components/Pagination.vue'
import { fetchElec } from '../api/index'
export default {
  components: { Echarts, Pagination },
  data () {
    return {
      dialogVisiable: false,
      city: '',
      queryParams: {
        city: '',
        page: 1,
        limit: 10,
        total: 3,
        name: undefined,
        status: undefined,
        type: undefined,
        generatingStation: undefined,
        area: undefined,
        code: undefined,
        loading:false
      },
      cityOptions: [{
        "label": "锡林郭勒",
        "value": 1
      }, {
        "label": "呼哈浩特",
        "value": 2
      }, {
        "label": "通辽",
        "value": 3
      }, {
        "label": "呼伦贝尔",
        "value": 4
      }],
      tableData: [
        {
          id: '2018',
          name: '呼哈浩特某某电表',
          generatingStation: 'California',
          generationEnterprises: 'Los Angeles',
          area: '兴安盟',
          type: '水电',
          ratio: 500,
          EM1: 123,
          EM2: 123,
          EM3: 123,
          EM4: 123,
          EM5: 123,
          EM6: 123,
          EM7: 123,
          EM8: 123,
          EM9: 123,
          EM10: 123,
          EM11: 123,
          EM12: 123,
          e1: 12,
          e2: 12,
          e3: 12,
          e4: 12,
          e5: 12,
          e6: 12,
          e7: 12,
          e8: 12,
          e9: 12,
          e10: 12,
          e11: 12,
          e12: 12,
          status: 0
        },
        {
          id: '2017',
          name: '呼哈浩特某某电表',
          generatingStation: 'California',
          generationEnterprises: 'Los Angeles',
          area: '呼哈浩特',
          type: '火电',
          ratio: 311,
          EM1: 123,
          EM2: 123,
          EM3: 123,
          EM4: 123,
          EM5: 123,
          EM6: 123,
          EM7: 123,
          EM8: 123,
          EM9: 123,
          EM10: 123,
          EM11: 123,
          EM12: 123,
          e1: 12,
          e2: 12,
          e3: 12,
          e4: 12,
          e5: 12,
          e6: 12,
          e7: 12,
          e8: 12,
          e9: 12,
          e10: 12,
          e11: 12,
          e12: 12,
          status: 1
        },
        {
          id: '2016',
          name: '呼哈浩特某某电表',
          generatingStation: 'California',
          generationEnterprises: 'Los Angeles',
          area: '呼哈浩特',
          type: '风电',
          ratio: 1000,
          EM1: 123,
          EM2: 123,
          EM3: 123,
          EM4: 123,
          EM5: 123,
          EM6: 123,
          EM7: 123,
          EM8: 123,
          EM9: 123,
          EM10: 123,
          EM11: 123,
          EM12: 123,
          e1: 12,
          e2: 12,
          e3: 12,
          e4: 12,
          e5: 12,
          e6: 12,
          e7: 12,
          e8: 12,
          e9: 12,
          e10: 12,
          e11: 12,
          e12: 12,
          status: 2
        },
      ],
      pieOption: {
        title: {
          text: '各项数据占比',
          subtext: '数据质量管理',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        color: ['#67C23A', '#E6A23C', '#F56C6C'],
        series: [
          {
            name: '各类数据占比',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1, name: '正常数据' },
              { value: 1, name: '正确性异常' },
              { value: 1, name: '完整性异常' },

            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      barOption2: {
        title: {
          text: '历年各项数据变化',
          subtext: '数据质量管理',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
        },
        color: ['#67C23A', '#E6A23C', '#F56C6C'],
        legend: {
          orient: 'vertical',
          left: 'left',
          show: false
        },
        grid: {
          left: '13%',
          right: '4%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['2015', '2016', '2017', '2018', '2019', '2020', '2021']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '正常数据',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '正确性异常',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '完整性异常',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: [150, 232, 201, 154, 190, 330, 410]
          },
        ]
      },

      
      statusOptions: [
        {
          "label": "正常数据",
          "value": 1
        }, {
          "label": "正确性异常",
          "value": 2
        }, {
          "label": "完整性异常",
          "value": 3
        }],
      typeOptions: [
        {
          "label": "水电",
          "value": "水电"
        },
        {
          "label": "火电",
          "value": "火电"
        },
        {
          "label": "风电",
          "value": "风电"
        },
        {
          "label": "光电",
          "value": "光电"
        },
        {
          "label": "其他",
          "value": "其他"
        }
      ],
      areaOptions: [
        {
          "label": "选项一",
          "value": 1
        },
        {
          "label": "选项二",
          "value": 2
        }
      ],
    }
  },
  mounted () {
    this.queryMain()
  },
  methods: {
    queryMain () {
      this.queryParams.loading=true
      fetchElec(this.queryParams).then(res => {
        this.tableData=res.data.data.items
        this.queryParams.total=res.data.data.total
        this.queryParams.loading=false
      })
    },
    showDetail (row) {
      this.$router.push('/detail')
    },
    handlePage(p){
      Object.assign(this.queryParams,p)
      this.queryMain()
    },
    handleQuery () {
      console.log(this.city)
    },
    submitForm () {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
        this.queryMain()
      })
    },
    resetForm () {
      this.$refs['elForm'].resetFields()
    },
    statusColor (row) {
      if (row.status ==1) {
        return 'color:#67C23A'
      }
      if (row.status == 2) {
        return 'color:#E6A23C'
      } else {
        return 'color:#F56C6C'
      }
    },
    statusIcon (row) {
      if (row.status == 1) {
        return 'el-icon-success'
      }
      if (row.status == 2) {
        return 'el-icon-warning'
      } else {
        return 'el-icon-error'
      }
    }
  }
}
</script>
<style>
.title {
  display: flex;
  justify-items: center;
  justify-content: center;
  align-items: center;
}
</style>
