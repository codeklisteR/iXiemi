<template>
  <div class="confirmation-page">
    <div class="confirmation-card">
      <div class="success-icon">✓</div>
      <h1 class="title">Order Confirmed!</h1>
      <p class="message">Thank you for your order</p>
      
      <div class="order-details">
        <div class="detail-row">
          <span class="label">Order ID:</span>
          <span class="value">#{{ orderId }}</span>
        </div>
        <div class="detail-row">
          <span class="label">Estimated Pick-up:</span>
          <span class="value">15-20 minutes</span>
        </div>
        <div class="detail-row">
          <span class="label">Location:</span>
          <span class="value">Sesame Street, Michigan, New York</span>
        </div>
      </div>
      
      <div class="actions">
        <router-link to="/" class="btn btn-primary">
          Back to Menu
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const orderId = ref(Math.floor(Math.random() * 10000))
</script>

<style scoped>
.confirmation-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: #f8f9fa;
}

.confirmation-card {
  background: white;
  border-radius: 16px;
  padding: 48px;
  max-width: 500px;
  width: 100%;
  text-align: center;
  border: 1px solid #e5e7eb;
}

.success-icon {
  width: 80px;
  height: 80px;
  background: #10b981;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  margin: 0 auto 24px;
}

.title {
  font-size: 28px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px 0;
}

.message {
  font-size: 16px;
  color: #6b7280;
  margin: 0 0 32px 0;
}

.order-details {
  background: #f9fafb;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 32px;
  text-align: left;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
}

.detail-row:not(:last-child) {
  border-bottom: 1px solid #e5e7eb;
}

.label {
  font-weight: 500;
  color: #6b7280;
}

.value {
  color: #1a1a1a;
  font-weight: 500;
}

.actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.btn {
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary {
  background: #1a1a1a;
  color: white;
}

.btn-primary:hover {
  background: #333;
}
</style>