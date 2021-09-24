<script>
import mychild from "./slot/child.vue";
export default {
  component: { mychild },
  data() {
    return {
      num: 1,
      tableData: [
        { name: "王二", age: 18, sex: 1 },
        { name: "李三", age: 12, sex: 0 },
        { name: "张武", age: 32, sex: 1 },
        { name: "赵四", age: 28, sex: 1 },
        { name: "周日", age: 19, sex: 0 },
      ],
    };
  },
  methods: {
    sayHello() {
      this.$message({ type: "success", message: "Hello" });
    },
    valueChange(val){
      console.log(val)
      debugger
    }
  },
  render() {
    const childSlot = {
      header: (scope) => {
        return <span>{scope.title + "allla"}</span>;
      },
    };
    const tableContent = {
      default: (scope) => {
        const text = scope.row[scope.column.property];
        return <span>{text}</span>;
      },
    };
    const columns = [
      {
        prop: "name",
        label: "姓名",
        width: "100",
        scopedSlots: tableContent,
      },
      {
        prop: "age",
        label: "年龄",
        width: "100",
        scopedSlots: {
          default: (scope) => {
            return <el-input v-model={scope.row.age} onChange={this.valueChange}/>;
          },
        },
      },
      {
        prop: "sex",
        label: "性别",
        width: "70",
        scopedSlots: {
          default: (scope) => {
            const {
              row: { sex },
            } = scope;
            return <el-tag type={sex?'success':'error'}>{sex ? "男" : "女"}</el-tag>;
          },
        },
      },
    ];
    return (
      <div>
        <h1 onClick={this.sayHello}>Hello</h1>
        <el-input
          v-model={this.num}
          onChange={console.log(this.num)}
          style={"width:500px"}
        />
        <mychild v-slots={childSlot}></mychild>
        <el-table data={this.tableData}>
          {columns.map((column, index) => {
            const { scopedSlots, ...columnsProps } = column;
            return (
              <el-table-column
                key={index}
                prop={columnsProps.prop}
                label={columnsProps.label}
                width={columnsProps.width}
                v-slots={scopedSlots}
              ></el-table-column>
            );
          })}
        </el-table>
      </div>
    );
  },
};
</script>