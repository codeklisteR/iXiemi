<template>
  <div class="admin-dashboard">
    <div class="admin-header">
      <h1>Admin Dashboard</h1>
      <div class="admin-nav">
        <router-link to="/admin" class="nav-item">Dashboard</router-link>
        <router-link to="/admin/orders" class="nav-item">Orders</router-link>
        <router-link to="/admin/menu" class="nav-item">Menu Management</router-link>
      </div>
    </div>
    
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">📊</div>
        <div class="stat-info">
          <h3>Total Orders</h3>
          <p class="stat-number">{{ totalOrders }}</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">💰</div>
        <div class="stat-info">
          <h3>Total Revenue</h3>
          <p class="stat-number">₱{{ totalRevenue.toFixed(2) }}</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">📦</div>
        <div class="stat-info">
          <h3>Pending Orders</h3>
          <p class="stat-number">{{ pendingOrders }}</p>
        </div>
      </div>
    </div>
    
    <div class="recent-orders">
      <h2>Recent Orders</h2>
      <div class="orders-table">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in recentOrders" :key="order.id">
              <td>#{{ order.id }}</td>
              <td>{{ formatDate(order.timestamp) }}</td>
              <td>{{ order.items.length }} items</td>
              <td>₱{{ order.total.toFixed(2) }}</td>
              <td><span class="status pending">Pending</span></td>
            </tr>
            <tr v-if="recentOrders.length === 0">
              <td colspan="5" class="no-data">No orders yet</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const orders = ref([])

onMounted(() => {
  const storedOrders = localStorage.getItem('orders')
  if (storedOrders) {
    orders.value = JSON.parse(storedOrders)
  }
})

const totalOrders = computed(() => orders.value.length)
const totalRevenue = computed(() => orders.value.reduce((sum, order) => sum + order.total, 0))
const pendingOrders = computed(() => orders.value.length)
const recentOrders = computed(() => [...orders.value].reverse().slice(0, 5))

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleString()
}
</script>

<style scoped>
.admin-dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.admin-header {
  margin-bottom: 30px;
}

.admin-header h1 {
  color: #333;
  margin-bottom: 20px;
}

.admin-nav {
  display: flex;
  gap: 20px;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}

.nav-item {
  text-decoration: none;
  color: #666;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s;
}

.nav-item:hover {
  background: #f5f5f5;
}

.router-link-active {
  color: #ff6b35;
  font-weight: bold;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.stat-icon {
  font-size: 40px;
}

.stat-info h3 {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.stat-number {
  font-size: 28px;
  font-weight: bold;
  color: #ff6b35;
}

.recent-orders {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.recent-orders h2 {
  margin-bottom: 20px;
  color: #333;
}

.orders-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background: #f9f9f9;
  font-weight: 600;
  color: #666;
}

.status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.status.pending {
  background: #fff3e0;
  color: #ff9800;
}

.no-data {
  text-align: center;
  color: #999;
  padding: 40px;
}
</style>