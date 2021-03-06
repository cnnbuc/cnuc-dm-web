import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '@/pages/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/pages/login/index'),
    hidden: true
  },
  { path: '/404', component: () => import('@/pages/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '控制台',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/pages/dashboard/index')
      }
    ]
  },

  {
    path: '/buildings',
    component: Layout,
    redirect: '/buildings/list',
    name: 'Buildings',
    meta: { title: '建筑管理', icon: 'example' },
    children: [
      {
        path: 'buildings',
        name: 'Buildings-list',
        component: () => import('@/pages/buildings/list'),
        meta: { title: '所有建筑' }
      },
      {
        path: 'buildings/:id',
        name: 'Buildings-detail',
        component: () => import('@/pages/buildings/detail'),
        meta: { title: '建筑详情' },
        hidden: true
      },
      {
        path: 'svgfiles',
        name: 'Buildings-svgfiles',
        component: () => import('@/pages/buildings/svgfiles'),
        meta: { title: '结构管理' }
      }
    ]
  },

  {
    path: '/companies',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'companies-list',
        component: () => import('@/pages/companies/index'),
        meta: { title: '单位管理', icon: 'example' }
      }
    ]
  },

  {
    path: '/contributes',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'contributes-list',
        component: () => import('@/pages/contributes/index'),
        meta: { title: '贡献管理', icon: 'example' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
