import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login', // 登录页
      name: 'login',
      component: (resolve) => require(['../login.vue'], resolve)
    },
    {
      path: '/404',  // 404页
      name: 'err',
      component: (resolve) => require(['../components/err.vue'], resolve)
    },
  ]
});

export default router // 默认静态路由
