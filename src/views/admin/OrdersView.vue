<template>
  <div class="admin-orders">
    <div class="admin-header">
      <h1>Manage Orders</h1>
      <div class="admin-nav">
        <router-link to="/admin" class="nav-item">Dashboard</router-link>
        <router-link to="/admin/orders" class="nav-item">Orders</router-link>
        <router-link to="/admin/menu" class="nav-item">Menu Management</router-link>
      </div>
    </div>
    
    <div class="orders-list">
      <div v-for="order in allOrders" :key="order.id" class="order-card">
        <div class="order-header">
          <div>
            <strong>Order #{{ order.id }}</strong>
            <span class="order-date">{{ formatDate(order.timestamp) }}</span>
          </div>
          <select v-model="order.status" class="status-select">
            <option value="pending">Pending</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready for Pickup</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <div class="order-items">
          <div v-for="item in order.items" :key="item.itemKey" class="order-item">
            <span>{{ item.quantity }}x</span>
            <span>{{ item.name }}</span>
            <span class="item-options" v-if="Object.keys(item.options).length">
              ({{ formatOptions(item.options) }})
            </span>
            <span class="item-price">₱{{ (item.price * item.quantity).toFixed(2) }}</span>
          </div>
        </div>
        
        <div class="order-total">
          <strong>Total: ₱{{ order.total.toFixed(2) }}</strong>
        </div>
      </div>
      
      <div v-if="allOrders.length === 0" class="no-orders">
        <p>No orders yet</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const allOrders = ref([])

onMounted(() => {
  const storedOrders = localStorage.getItem('orders')
  if (storedOrders) {
    allOrders.value = JSON.parse(storedOrders).map(order => ({
      ...order,
      status: order.status || 'pending'
    }))
  }
})

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleString()
}

const formatOptions = (options) => {
  const parts = []
  if (options.sugar) parts.push(`${options.sugar} sugar`)
  if (options.ice) parts.push(`${options.ice} ice`)
  if (options.topping) parts.push(`+${options.topping}`)
  return parts.join(', ')
}
</script>

<style scoped>
.admin-orders {
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
}

.router-link-active {
  color: #ff6b35;
  font-weight: bold;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.order-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.order-date {
  font-size: 12px;
  color: #999;
  margin-left: 10px;
}

.status-select {
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
}

.order-items {
  margin-bottom: 15px;
}

.order-item {
  display: flex;
  gap: 10px;
  padding: 8px 0;
  font-size: 14px;
}

.item-options {
  color: #666;
  font-size: 12px;
}

.item-price {
  margin-left: auto;
  font-weight: 500;
}

.order-total {
  text-align: right;
  padding-top: 10px;
  border-top: 1px solid #eee;
  font-size: 16px;
}

.no-orders {
  text-align: center;
  padding: 60px;
  background: white;
  border-radius: 12px;
  color: #999;
}
</style>
