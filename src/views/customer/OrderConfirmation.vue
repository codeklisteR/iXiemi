<template>
  <div class="confirmation-container">
    <div class="confirmation-card">
      <div class="success-icon">✅</div>
      <h1>Your order has been placed!</h1>
      <p>Thank you for ordering with Xiemi</p>
      
      <div class="order-details">
        <h3>Order Details</h3>
        <div class="order-info">
          <p><strong>Order ID:</strong> #{{ orderId }}</p>
          <p><strong>Pick-up Time:</strong> 15-20 minutes</p>
          <p><strong>Location:</strong> Xiemi Store</p>
        </div>
      </div>
      
      <div class="action-buttons">
        <router-link to="/" class="home-btn">Back to Menu</router-link>
        <button @click="viewOrders" class="orders-btn">View My Orders</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const orderId = ref(Math.floor(Math.random() * 10000))

const viewOrders = () => {
  // For demo, just go back to menu
  router.push('/')
}
</script>

<style scoped>
.confirmation-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, #ff6b35, #ff8c42);
}

.confirmation-card {
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.success-icon {
  font-size: 80px;
  margin-bottom: 20px;
}

.confirmation-card h1 {
  color: #333;
  margin-bottom: 10px;
  font-size: 28px;
}

.confirmation-card p {
  color: #666;
  margin-bottom: 30px;
}

.order-details {
  background: #f9f9f9;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
  text-align: left;
}

.order-details h3 {
  margin-bottom: 15px;
  color: #ff6b35;
}

.order-info p {
  margin-bottom: 10px;
  color: #333;
}

.action-buttons {
  display: flex;
  gap: 15px;
}

.home-btn, .orders-btn {
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
}

.home-btn {
  background: #ff6b35;
  color: white;
}

.orders-btn {
  background: white;
  color: #ff6b35;
  border: 2px solid #ff6b35;
}
</style>