import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Address from '../views/Address.vue'
import BalancecheckTool from '../views/BalancecheckTool.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/address/:address/startblock/:startblock/endblock/:endblock',
    name: 'Address',
    component: Address,
    props: (route) => ({ address: route.params.address,startblock: route.params.startblock,endblock: route.params.endblock}),
  },
  {
    path: '/balancecheckTool/:address/startblock/:startblock/endblock/:endblock',
    name: 'BalancecheckTool',
    component: BalancecheckTool,
    props: (route) => ({ address: route.params.address,startblock: route.params.startblock,endblock: route.params.endblock}),
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
