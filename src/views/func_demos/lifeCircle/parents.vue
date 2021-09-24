<script>
import mychild from "./child.vue";
export default {
  components: { mychild },
  beforeCreate() {
    document.write("parents  beforeCreate>>>>");
  },
  created() {
    document.write("parents  created>>>>");
  },
  beforeMount() {
    document.write("parents  beforeMount>>>>");
  },
  mounted() {
    document.write("parents  mounted>>>>");
  },
  beforeUpdate() {
    document.write("parents  beforeUpdate>>>>");
  },
  updated() {
    document.write("parents  updated>>>>");
  },
  beforeUnmount() {
    document.write("parents  beforeDestroy>>>>");
  },
  unmounted() {
    document.write("parents  destroyed>>>>");
  },
  render() {
    return (
      <div>
        <mychild></mychild>
        <h1>父组件</h1>
      </div>
    );
  },
};
</script>