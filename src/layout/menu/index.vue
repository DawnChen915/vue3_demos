<template>
  <el-scrollbar
    class="side-bar-container"
    :style="'background-color:' + variables['menu-background']"
  >
    <el-menu
      :background-color="variables['menu-background']"
      :text-color="variables['menu-color']"
      :active-text-color="variables['menu-color-active']"
      :default-active="activeMenu"
      :mode="layout"
    >
      <template v-for="route in routes" :key="route.path">
        <side-bar-item :full-path="route.path" :item="route" />
      </template>
    </el-menu>
  </el-scrollbar>
</template>
<script>
import variables from "@/styles/variables.scss";
import sideBarItem from "./components/SideBarItem.vue";
import { routes } from "../../router";
export default {
  components: { sideBarItem },
  props: {
    //是否侧边菜单
    layout: {
      type: String,
      default: () => {
        return "vertical";
      },
    },
  },
  data() {
    return {
      routes,
    };
  },
  computed: {
    variables() {
      return variables;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
  },
  mounted() {
    console.log("页面布局：" + this.layout);
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
@mixin active {
  &:hover {
    color: $base-color-white;
    background-color: $base-menu-background-active !important;
  }

  &.is-active {
    color: $base-color-white;
    background-color: $base-menu-background-active !important;
  }
}

.side-bar-container {
  z-index: $base-z-index;
  overflow: hidden;
  background: $base-menu-background;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  transition: width $base-transition-time;
  ::v-deep {
    .el-menu-item,
    .el-submenu__title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: middle;
    }
    .el-menu-item {
      @include active;
    }
  }
}
</style>

