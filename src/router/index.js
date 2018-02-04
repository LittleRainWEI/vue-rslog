import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

import Layout from '@/views/layout/Layout'

export const constantRouterMap = [
  { path: '/login', component: _import('login/Login'), hidden: true },
  { path: '/authredirect', component: _import('login/Authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/Error404'), hidden: true },
  { path: '/401', component: _import('errorPage/Error401'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{ path: 'dashboard', component: _import('dashboard/Dashboard') }]
  }
]

export default new Router({
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/hello',
    component: Layout,
    redirect: 'noredirect',
    name: '欢迎页面',
    icon: 'star-on',
    meta: { role: ['admin'] },
    children: [
      { path: 'hello', component: _import('hello/Hello'), name: 'hello', meta: { role: ['admin'] }, },
    ]
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: '错误页面',
    icon: 'warning',
    children: [
      { path: '401', component: _import('errorPage/Error401'), name: '401', meta: { role: ['admin'] }, },
      { path: '404', component: _import('errorPage/Error404'), name: '404' }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
