<template>
  <div>

    <el-table :data="tableData" :span-method="objectSpanMethod" border style="width: 100%; margin-top: 20px">
      <el-table-column type="index" label="序号" :index="indexMethod"></el-table-column>

      <el-table-column prop="personName" label="Name" />
      <el-table-column prop="ability" label="Amount 1" />
      <el-table-column prop="doucumentNumber" label="Amount 2" />
      <el-table-column prop="certificateAbility" label="Amount 3" />
    </el-table>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      tableData: [
        {
          "personName": "王岩",
          "qualifications": "本科",
          "doucumentNumber": "210304197809160897",
          "certificateAbility": "电力系统及其自动化",
          "rzTime": "2005-01-03 至 2025-03-15",
          "sex": null,
          "professionAge": 17,
          "personId": "97993797d1694c6b9e98561c56052157",
          "professorTitle": "高级",
          "ability": "电力系统及其自动化"
        },
        {
          "personName": "职称证书",
          "ability": " ● 证书编号:19652384 ● 发证机关:贵州省人力资源和社会保障厅 ● 证书取得时间:2018-12-18"
        },
        {
          "personName": "刘代全",
          "qualifications": "其他",
          "doucumentNumber": "510121197604050017",
          "certificateAbility": "电力工程技术",
          "rzTime": "2001-03-01 至 2024-11-07",
          "sex": null,
          "professionAge": 21,
          "personId": "272fe499e87e414f8cd16faa0062eae9",
          "professorTitle": "中级",
          "ability": "发电厂及电力系统"
        },
        {
          "personName": "职称证书",
          "ability": " ● 证书编号:CSG10201201310078 ● 发证机关:广州供电局有限公司 ● 证书取得时间:2012-12-31"
        },
        {
          "personName": "王鹏",
          "qualifications": "其他",
          "doucumentNumber": "513703197801100012",
          "certificateAbility": "机电安装",
          "rzTime": "2000-07-03 至 2025-02-17",
          "sex": null,
          "professionAge": 22,
          "personId": "365583983213041FB80AFBC6DB3839D8",
          "professorTitle": "中级",
          "ability": "机电安装"
        },
        {
          "personName": "职称证书",
          "ability": " ● 证书编号:109014 ● 发证机关:成都市武侯区职称改革工作领导小组 ● 证书取得时间:2017-12-18"
        },
        {
          "personName": "高延莉",
          "qualifications": "本科",
          "doucumentNumber": "51080219801015172X",
          "certificateAbility": "会计",
          "rzTime": "2002-06-03 至 2022-07-02",
          "sex": null,
          "professionAge": 20,
          "personId": "3A0E48C237F50750F7BDA2B35AB47145",
          "professorTitle": "中级",
          "ability": "会计"
        },
        {
          "personName": "职称证书",
          "ability": " ● 证书编号:11832235602057 ● 发证机关:中华人民共和国人力资源和社会保障部 ● 证书取得时间:2018-09-09"
        },
        {
          "personName": "雷艳",
          "qualifications": "本科",
          "doucumentNumber": "511621198603241500",
          "certificateAbility": "电气工程",
          "rzTime": "2010-07-01 至 2024-05-26",
          "sex": null,
          "professionAge": 12,
          "personId": "6F2870CF01322479191A08FD6AE866AD",
          "professorTitle": "中级",
          "ability": "电气工程"
        },
        {
          "personName": "职称证书",
          "ability": " ● 证书编号:20190025231 ● 发证机关:成都市科学技术协会专家评审委员会 ● 证书取得时间:2019-04-11"
        },
        {
          "personName": "潘辉",
          "qualifications": "其他",
          "doucumentNumber": "510402197703284326",
          "certificateAbility": "机电安装",
          "rzTime": "暂无",
          "sex": null,
          "professionAge": 22,
          "personId": "8732B04B64632A99000B3395DA0849F8",
          "professorTitle": "中级",
          "ability": "机电安装"
        },
        {
          "personName": "职称证书",
          "ability": " ● 证书编号:108005 ● 发证机关:成都市武侯区职称改革工作领导小组 ● 证书取得时间:2017-12-02"
        },
        {
          "personName": "刘林",
          "qualifications": "其他",
          "doucumentNumber": "510107198505131273",
          "certificateAbility": "机电安装",
          "rzTime": "暂无",
          "sex": null,
          "professionAge": 18,
          "personId": "B0093140B490DD5D408EF55283D373AB",
          "professorTitle": "中级",
          "ability": "机电安装"
        },
        {
          "personName": "职称证书",
          "ability": " ● 证书编号:108008 ● 发证机关:成都市武侯区职称改革工作领导小组 ● 证书取得时间:2017-12-18"
        },
        {
          "personName": "宋明智",
          "qualifications": "本科",
          "doucumentNumber": "510102196310104370",
          "certificateAbility": "电力技术与工程",
          "rzTime": "暂无",
          "sex": null,
          "professionAge": 36,
          "personId": "CB6B183ED23695AE323C4BE92D7E3CBD",
          "professorTitle": "中级",
          "ability": "电力技术与工程"
        },
        {
          "personName": "职称证书",
          "ability": " ● 证书编号:20190025232 ● 发证机关:成都市科学技术协会专家评审委员会 ● 证书取得时间:2019-04-11"
        },
        {
          "personName": "赖盛忠",
          "qualifications": "本科",
          "doucumentNumber": "510107197601262973",
          "certificateAbility": "机电安装",
          "rzTime": "暂无",
          "sex": null,
          "professionAge": 24,
          "personId": "CBD66E018513490E4E7C8209677A7F79",
          "professorTitle": "中级",
          "ability": "机电安装"
        },
        {
          "personName": "职称证书",
          "ability": " ● 证书编号:108007 ● 发证机关:成都市武侯区职称改革工作领导小组 ● 证书取得时间:2017-12-18"
        },
        {
          "personName": "黄治娟",
          "qualifications": "硕士及以上",
          "doucumentNumber": "620121198911070026",
          "certificateAbility": "",
          "rzTime": "2015-07-01 至 2024-01-21",
          "sex": null,
          "professionAge": 7,
          "personId": "171e282b65cd41d2b8aa9a9e58489c01",
          "professorTitle": "无",
          "ability": "电力工程"
        },
        {
          "personName": "职称证书",
          "ability": "暂无"
        }
      ],
    }
  },
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
      if (columnIndex === 1) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
      if (columnIndex === 3) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 1,
            colspan: 1
          };
        } else {
          return {
            rowspan: 1,
            colspan:5
          };
        }
      }
      
     
    },
    indexMethod(index){

      return (index+2)/2
     
    }

  },
}
</script>