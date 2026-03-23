import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Menu',
    component: () => import('@/views/customer/MenuView.vue'),
    meta: { title: 'Menu - Xiemi' }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/customer/CartView.vue'),
    meta: { title: 'Cart - Xiemi' }
  },
  {
    path: '/order-confirmation',
    name: 'OrderConfirmation',
    component: () => import('@/views/customer/OrderConfirmation.vue'),
    meta: { title: 'Order Confirmation - Xiemi' }
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: () => import('@/views/admin/Dashboard.vue'),
    meta: { requiresAuth: true, title: 'Admin Dashboard' }
  },
  {
    path: '/admin/orders',
    name: 'AdminOrders',
    component: () => import('@/views/admin/OrdersView.vue'),
    meta: { requiresAuth: true, title: 'Manage Orders' }
  },
  {
    path: '/admin/menu',
    name: 'AdminMenu',
    component: () => import('@/views/admin/MenuManagement.vue'),
    meta: { requiresAuth: true, title: 'Manage Menu' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const isAdmin = localStorage.getItem('admin_auth') === 'true'
    if (!isAdmin) {
      localStorage.setItem('admin_auth', 'true')
      next()
    } else {
      next()
    }
  } else {
    next()
  }
  
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router