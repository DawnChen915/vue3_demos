import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/index'

export const routes = [
  {
    path: '/',
    redirect:'index',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/home/index'),
        meta: {
          title: '首页',
          icon: 'House',
          affix: true,
        },
      },
    ],
  },
  {
    path:'/setting',
    redirect:'noRedirect',
    component: Layout,
    meta:{title:'设置',icon:'Setting',affix:true},
    children:[
      {
        path: 'layout',
        name: 'layout',
        component: () => import('@/views/setting/layout'),
        meta: {
          title: '布局设置',
          icon: 'Grid',
          affix: true,
        },
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/setting/user'),
        meta: {
          title: '用户设置',
          icon: 'User',
          affix: true,
        },
      },
    ]
  },
  {
    path:'/func_demos',
    redirect:'noRedirect',
    component: Layout,
    meta:{title:'功能demo',icon:'SetUp',affix:true},
    children:[
      {
        path: 'func1',
        name: 'func1',
        component: () => import('@/views/func_demos/index'),
        meta: {
          title: '功能demo1',
          icon: 'SetUp',
          affix: false,
        },
      },
      {
        path: 'render',
        name: 'render',
        component: () => import('@/views/func_demos/render'),
        meta: {
          title: 'render渲染函数',
          icon: 'SetUp',
          affix: false,
        },
      },
      {
        path: 'upload',
        name: 'upload',
        component: () => import('@/views/func_demos/file/fileUpload'),
        meta: {
          title: '文件上传',
          icon: 'SetUp',
          affix: false,
        },
      },
      {
        path: 'slots',
        name: 'slots',
        component: () => import('@/views/func_demos/slot/index'),
        meta: {
          title: 'slot插槽',
          icon: 'SetUp',
          affix: false,
        },
      },
      {
        path: 'lifeCircle',
        name: 'lifeCircle',
        component: () => import('@/views/func_demos/lifeCircle/parents'),
        meta: {
          title: 'vue生命周期',
          icon: 'SetUp',
          affix: false,
        },
      },
      {
        path: 'mapGeo',
        name: 'mapGeo',
        component: () => import('@/views/func_demos/mapGeo/index'),
        meta: {
          title: '大屏地图',
          icon: 'SetUp',
          affix: false,
        },
      },
      {
        path: 'mock',
        name: 'mock',
        component: () => import('@/views/func_demos/mock/index'),
        meta: {
          title: 'mock数据',
          icon: 'SetUp',
          affix: false,
        },
      },
      {
        path: 'directive',
        name: 'directive',
        component: () => import('@/views/func_demos/directive/index'),
        meta: {
          title: '自定义指令',
          icon: 'asd',
          affix: false,
        },
      },
      {
        path: 'debounce',
        name: 'debounce',
        component: () => import('@/views/func_demos/debounce/index'),
        meta: {
          title: '防抖节流',
          icon: 'asd',
          affix: false,
        },
      }
     
    ]
  },
  {
    path:'/style_demos',
    redirect:'noRedirect',
    component: Layout,
    meta:{title:'样式demo',icon:'set',affix:true},
    children:[
      {
        path: 'style1',
        name: 'style1',
        component: () => import('@/views/style_demos/index'),
        meta: {
          title: '样式demo1',
          icon: 'layout',
          affix: false,
        },
      },
      {
        path: 'style2',
        name: 'style2',
        component: () => import('@/views/style_demos/index'),
        meta: {
          title: '样式demo2',
          icon: 'layout',
          affix: false,
        },
      },
    ]
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
