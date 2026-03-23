<template>
  <div class="cart-view">
    <div class="cart-header">
      <h1>Your Cart</h1>
      <router-link to="/" class="back-btn">← Back to Menu</router-link>
    </div>
    
    <div v-if="items.length === 0" class="empty-cart">
      <div class="empty-icon">🛒</div>
      <h2>Your cart is empty</h2>
      <p>Add some delicious drinks to get started!</p>
      <router-link to="/" class="browse-btn">Browse Menu</router-link>
    </div>
    
    <div v-else class="cart-content">
      <div class="cart-items-list">
        <div v-for="item in items" :key="item.itemKey" class="cart-item-card">
          <img :src="item.image" class="item-image" />
          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <div class="options">
              {{ item.options.sugar }} Sugar • {{ item.options.ice }} Ice
              <span v-if="item.options.topping"> • +{{ item.options.topping }}</span>
            </div>
            <div class="price">₱{{ item.price.toFixed(2) }}</div>
          </div>
          <div class="quantity-controls">
            <button @click="updateQuantity(item.itemKey, item.quantity - 1)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="updateQuantity(item.itemKey, item.quantity + 1)">+</button>
          </div>
          <button class="remove-btn" @click="removeItem(item.itemKey)">×</button>
        </div>
      </div>
      
      <div class="order-summary">
        <h3>Order Summary</h3>
        <div class="summary-details">
          <div class="summary-row">
            <span>Subtotal</span>
            <span>₱{{ subtotal.toFixed(2) }}</span>
          </div>
          <div class="summary-row">
            <span>Service Fee (5%)</span>
            <span>₱{{ serviceFee.toFixed(2) }}</span>
          </div>
          <div class="summary-row total">
            <span>Total</span>
            <span>₱{{ total.toFixed(2) }}</span>
          </div>
        </div>
        
        <div class="voucher-section">
          <input type="text" placeholder="Apply a voucher" v-model="voucherCode" />
          <button @click="applyVoucher">Apply</button>
        </div>
        
        <button class="place-order-btn" @click="placeOrder">
          Place Pick-up Order
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const { items, subtotal, serviceFee, total } = storeToRefs(cartStore)
const { updateQuantity, removeItem, clearCart } = cartStore
const router = useRouter()

const voucherCode = ref('')
const discount = ref(0)

const applyVoucher = () => {
  if (voucherCode.value === 'XIEMI10') {
    discount.value = subtotal.value * 0.1
    alert('Voucher applied! 10% discount')
  } else if (voucherCode.value === 'FREESHIP') {
    alert('Free shipping applied!')
  } else {
    alert('Invalid voucher code')
  }
}

const placeOrder = () => {
  if (items.value.length > 0) {
    // Save order to localStorage for demo
    const order = {
      id: Date.now(),
      items: items.value,
      subtotal: subtotal.value,
      serviceFee: serviceFee.value,
      discount: discount.value,
      total: total.value - discount.value,
      timestamp: new Date().toISOString()
    }
    
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    orders.push(order)
    localStorage.setItem('orders', JSON.stringify(orders))
    
    clearCart()
    router.push('/order-confirmation')
  }
}
</script>

<style scoped>
.cart-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #eee;
}

.cart-header h1 {
  font-size: 28px;
  color: #333;
}

.back-btn {
  text-decoration: none;
  color: #ff6b35;
  font-weight: 500;
}

.empty-cart {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 80px;
  margin-bottom: 20px;
}

.empty-cart h2 {
  color: #333;
  margin-bottom: 10px;
}

.empty-cart p {
  color: #666;
  margin-bottom: 30px;
}

.browse-btn {
  display: inline-block;
  padding: 12px 30px;
  background: #ff6b35;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 30px;
}

.cart-items-list {
  background: white;
  border-radius: 12px;
  padding: 20px;
}

.cart-item-card {
  display: flex;
  gap: 15px;
  padding: 15px;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
}

.cart-item-card:last-child {
  border-bottom: none;
}

.item-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
}

.item-details {
  flex: 1;
}

.item-details h3 {
  font-size: 16px;
  margin-bottom: 6px;
}

.options {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}

.price {
  font-size: 16px;
  font-weight: bold;
  color: #ff6b35;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-controls button {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: #f0f0f0;
  cursor: pointer;
  font-size: 18px;
}

.remove-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  font-size: 24px;
  color: #999;
  cursor: pointer;
}

.remove-btn:hover {
  color: #ff6b35;
}

.order-summary {
  background: white;
  border-radius: 12px;
  padding: 20px;
  height: fit-content;
  position: sticky;
  top: 20px;
}

.order-summary h3 {
  margin-bottom: 20px;
  font-size: 20px;
}

.summary-details {
  margin-bottom: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}

.summary-row.total {
  font-weight: bold;
  font-size: 18px;
  border-top: 1px solid #eee;
  margin-top: 10px;
  padding-top: 15px;
}

.voucher-section {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.voucher-section input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.voucher-section button {
  padding: 10px 20px;
  background: #f0f0f0;
  border-radius: 6px;
  cursor: pointer;
}

.place-order-btn {
  width: 100%;
  padding: 14px;
  background: #ff6b35;
  color: white;
  border-radius: 8px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
}

.place-order-btn:hover {
  background: #ff5722;
}

@media (max-width: 768px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
  
  .cart-header {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
}
</style>