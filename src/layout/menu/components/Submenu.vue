<template>
  <el-sub-menu
    ref="subMenu"
    :index="handlePath(item.path)"
    :popper-append-to-body="true"
  >
    <template v-slot:title>
      <!-- <vab-icon
        v-if="item.meta && item.meta.icon"
        :icon="['fas', item.meta.icon]"
        class="vab-fas-icon"
      />
      <vab-remix-icon
        v-if="item.meta && item.meta.remixIcon"
        :icon-class="item.meta.remixIcon"
        class="vab-remix-icon"
      /> -->
      <el-icon v-if="item.meta.icon">
        <component :is="item.meta.icon" />
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </template>
    <slot />
  </el-sub-menu>
</template>

<script>
import { isExternal } from "@/utils/validate";
import path from "path";
export default {
  name: "Submenu",
  props: {
    routeChildren: {
      type: Object,
      default() {
        return null;
      },
    },
    item: {
      type: Object,
      default() {
        return null;
      },
    },
    fullPath: {
      type: String,
      default: "",
    },
  },
  methods: {
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
