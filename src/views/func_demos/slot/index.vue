<script>
import mychild from "../slot/child.vue";
export default {
  components: { mychild },
  data() {
    return {};
  },
  render() {
    const scopedSlots = {
      header: (scope) => {
        const { title } = scope;
        return <el-tag>{title}</el-tag>;
      },
    };
    return (
      <div>
        <mychild v-slots={scopedSlots}></mychild>
      </div>
    );
  },
};
</script>

<style>
</style>