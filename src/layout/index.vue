//页面布局
<template>
  <el-container style="min-height:100vh">
    <el-header v-if="layout=='horizontal'" style="padding:0px"><Menu :layout="layout"></Menu></el-header>
    <el-aside v-if="layout=='vertical'" width="300px" 
      ><Menu :layout="layout"></Menu>
    </el-aside>
    <el-main>
      <tabs-bar/>
      <router-view v-slot="{ Component }">
        <transition name="router-fade" mode="out-in">
          <keep-alive :max="keepAliveMaxNum">
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </el-main>
  </el-container>
</template>

<script>
import Menu from "./menu/index.vue";
import tabsBar from './tabsBar/index.vue'
import { keepAliveMaxNum, title } from "@/config";
import {mapState}from 'vuex'
export default {
  components: {
    Menu,tabsBar
  },
  data() {
    return {
      keepAliveMaxNum,
      title,
    };
  },
  computed: {
    ...mapState({
      layout:(state)=>state.setting.layout
    }),
    key() {
      return this.$route.path;
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style>
</style>
