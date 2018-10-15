import Vue from 'vue'
import Router from 'vue-router'
import {getStore} from '../config/localStorage'

import Index from '@/blog/pages/index'
import Layout from '@/blog/pages/layout'
import List from '@/blog/pages/list'
import AboutBlog from '@/blog/pages/AboutBlog'
import AboutMe from '@/blog/pages/AboutMe'
import article from '@/blog/pages/article'

import admin from '@/admin/pages/admin'
import manage from '@/admin/pages/manage'
import publish from '@/admin/pages/publish'
import comment from '@/admin/pages/comment'
import deleteArticle from '@/admin/pages/deleteArticle'
import deleteComment from '@/admin/pages/deleteComment'
import fieldWork from '@/admin/pages/fieldWork'
import project from '@/admin/pages/project'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    children: [
      {path: '/', redirect: '/index'},
      {path: '/index',name: 'index', component: Index},
      {path: '/list',name: 'list', component: List},
      {path: '/aboutblog',name: 'aboutblog', component: AboutBlog},
      {path: '/aboutme', name: 'aboutme', component: AboutMe},
      {path: '/Article/:id', name: 'Article', component: article, props: true}
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: admin
  },
  {
    path: '/manage',
    name: 'manage',
    component: manage,
    children: [
      {path: '/publish', name: 'publish', component: publish},
      {path: '/comment', name: 'comment', component: comment},
      {path: '/deleteArticle', name: 'deleteArticle', component: deleteArticle},
      {path: '/deleteComment', name: 'deleteComment', component: deleteComment},
      {path: '/fieldWork', name: 'fieldWork', component: fieldWork},
      {path: '/project', name: 'project', component: project}
    ],
    meta: {requiresAuth: true},
  }
]

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  // to and from are both route objects
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(!getStore('isLogin')) {
      next({
        path: '/admin',
        query: {redirect: to.fullPath}
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router