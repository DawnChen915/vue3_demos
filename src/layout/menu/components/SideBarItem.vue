<template>
  <component
    :is="menuComponent"
    v-if="!item.hidden"
    :item="item"
    :full-path="fullPath"
    :route-children="routeChildren"
  >
    <template v-if="item.children && item.children.length">
      <side-bar-item
        v-for="route in item.children"
        :key="route.path"
        :full-path="handlePath(route.path)"
        :item="route"
      />
    </template>
  </component>
</template>

<script>
import Submenu from "./Submenu.vue";
import MenuItem from "./MenuItem.vue";
import { isExternal } from "@/utils/validate";
import path from "path";
export default {
  components: { Submenu, MenuItem },
  name: "SideBarItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
    fullPath: {
      type: String,
      default: "",
    },
  },
  data() {
    this.onlyOneChild = null;
    return {
    };
  },
  computed: {
    menuComponent() {
      if (
        this.handleChildren(this.item.children, this.item) &&
        (!this.routeChildren.children || this.routeChildren.notShowChildren) &&
        !this.item.alwaysShow
      ) {

        return "MenuItem";
      } else {

        return "Submenu";
      }
    },
  },
  methods: {
    handleChildren(children = [], parent) {
      if (children === null) children = [];
      const showChildren = children.filter((item) => {
        if (item.hidden) {
          return false;
        } else {
          this.routeChildren = item;
          return true;
        }
      });

      if (showChildren.length === 1) {
        return true;
      }
      if (showChildren.length === 0) {
        this.routeChildren = {
          ...parent,
          path: "",
          notShowChildren: true,
        };
        return true;
      }
      
      return false;
    },
    handlePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.fullPath)) {
        return this.fullPath;
      }
      return path.resolve(this.fullPath, routePath);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
