import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  // Auth Routes
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/auth/RegisterView.vue'),
    meta: { title: 'Create Account - Xiemi', guestOnly: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: { title: 'Sign In - Xiemi', guestOnly: true }
  },
  
  // Customer Routes (Protected)
  {
    path: '/',
    name: 'Menu',
    component: () => import('@/views/customer/MenuView.vue'),
    meta: { title: 'Xiemi - Order Your Favorite Drinks', requiresAuth: true }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/customer/CartView.vue'),
    meta: { title: 'Review Order - Xiemi', requiresAuth: true }
  },
  {
    path: '/order-confirmation',
    name: 'OrderConfirmation',
    component: () => import('@/views/customer/OrderConfirmation.vue'),
    meta: { title: 'Order Confirmed - Xiemi', requiresAuth: true }
  },
  
  // Admin Routes
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: () => import('@/views/admin/Dashboard.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, title: 'Admin Dashboard' }
  },
  {
    path: '/admin/orders',
    name: 'AdminOrders',
    component: () => import('@/views/admin/OrdersView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, title: 'Manage Orders' }
  },
  {
    path: '/admin/menu',
    name: 'AdminMenu',
    component: () => import('@/views/admin/MenuManagement.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, title: 'Manage Menu' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated || authStore.checkAuth()
  
  // Check if route requires authentication
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
    return
  }
  
  // Check if route is for guests only (login/register)
  if (to.meta.guestOnly && isAuthenticated) {
    next('/')
    return
  }
  
  // Check admin access (simple check - you can enhance this)
  if (to.meta.requiresAdmin) {
    const user = authStore.user
    if (!user || user.email !== 'admin@xiemi.com') {
      alert('Admin access required')
      next('/')
      return
    }
  }
  
  // Update page title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  
  next()
})

export default router