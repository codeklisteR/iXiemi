<template>
  <div class="cart-sidebar">
    <div class="cart-trigger" @click="toggleCart">
      <div class="cart-icon">
        🛒
        <span v-if="totalItems > 0" class="cart-badge">{{ totalItems }}</span>
      </div>
    </div>
    
    <div v-if="showCart" class="cart-panel" @click.self="toggleCart">
      <div class="cart-header">
        <h3>Your Items</h3>
        <button class="close-btn" @click="toggleCart">×</button>
      </div>
      
      <div class="cart-items">
        <div v-if="items.length === 0" class="empty-cart">
          Your cart is empty
        </div>
        
        <div v-for="item in items" :key="item.itemKey" class="cart-item">
          <img :src="item.image" class="item-thumb" />
          <div class="item-details">
            <div class="item-name">{{ item.name }}</div>
            <div class="item-options" v-if="Object.keys(item.options).length">
              {{ item.options.sugar || '0%' }} Sugar • {{ item.options.ice || 'Normal' }} Ice
              <span v-if="item.options.topping && item.options.topping !== 'None'"> • +{{ item.options.topping }}</span>
            </div>
            <div class="item-price">₱{{ item.price.toFixed(2) }}</div>
          </div>
          <div class="item-quantity">
            <button @click="updateQuantity(item.itemKey, item.quantity - 1)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="updateQuantity(item.itemKey, item.quantity + 1)">+</button>
          </div>
        </div>
      </div>
      
      <div class="cart-summary" v-if="items.length > 0">
        <div class="summary-row">
          <span>Subtotal</span>
          <span>₱{{ subtotal.toFixed(2) }}</span>
        </div>
        <div class="summary-row">
          <span>Service Fee</span>
          <span>₱{{ serviceFee.toFixed(2) }}</span>
        </div>
        <div class="summary-row total">
          <span>Total</span>
          <span>₱{{ total.toFixed(2) }}</span>
        </div>
        
        <router-link to="/cart" class="checkout-btn" @click="toggleCart">
          Place pick-up order
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'

const cartStore = useCartStore()
const { items, totalItems, subtotal, serviceFee, total } = storeToRefs(cartStore)
const { updateQuantity } = cartStore

const showCart = ref(false)

const toggleCart = () => {
  showCart.value = !showCart.value
}
</script>

<style scoped>
.cart-sidebar {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
}

.cart-trigger {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #ff6b35;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.cart-trigger:hover {
  transform: scale(1.05);
}

.cart-icon {
  position: relative;
  font-size: 24px;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -12px;
  background: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  min-width: 20px;
  text-align: center;
}

.cart-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 380px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 12px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.cart-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  font-size: 28px;
  background: none;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.empty-cart {
  text-align: center;
  padding: 40px;
  color: #999;
}

.cart-item {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.item-thumb {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
}

.item-details {
  flex: 1;
}

.item-name {
  font-weight: 600;
  margin-bottom: 4px;
  font-size: 14px;
}

.item-options {
  font-size: 11px;
  color: #666;
  margin-bottom: 4px;
}

.item-price {
  font-size: 13px;
  color: #ff6b35;
  font-weight: 500;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 8px;
}

.item-quantity button {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: #f0f0f0;
  cursor: pointer;
  font-size: 16px;
  border: none;
}

.item-quantity button:hover {
  background: #e0e0e0;
}

.cart-summary {
  padding: 20px;
  border-top: 1px solid #eee;
  background: white;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
}

.summary-row.total {
  font-weight: bold;
  font-size: 18px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #eee;
}

.checkout-btn {
  display: block;
  width: 100%;
  padding: 14px;
  background: #ff6b35;
  color: white;
  text-align: center;
  border-radius: 8px;
  margin-top: 16px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.2s;
}

.checkout-btn:hover {
  background: #ff5722;
}
</style>