<template>
  <div class="checkout-page">
    <div class="checkout-container">
      <!-- Left Column - Review Order -->
      <div class="review-column">
        <h1 class="page-title">Review and place your order</h1>

        <!-- Pick-up Location -->
        <div class="info-section">
          <h3 class="section-title">Pick-up at</h3>
          <p class="info-text">Sesame Street, Michigan, New York</p>
        </div>

        <!-- Pick-up Options -->
        <div class="info-section">
          <h3 class="section-title">Pick-up options</h3>
          <div class="pickup-options">
            <button 
              :class="['option-btn', { active: pickupOption === 'standard' }]"
              @click="pickupOption = 'standard'"
            >
              Standard 10 mins
            </button>
            <button 
              :class="['option-btn', { active: pickupOption === 'scheduled' }]"
              @click="pickupOption = 'scheduled'"
            >
              Scheduled Select time
            </button>
          </div>
        </div>

        <!-- Personal Details -->
        <div class="info-section">
          <h3 class="section-title">Personal Details</h3>
          <div class="personal-details">
            <input 
              type="text" 
              v-model="customer.name" 
              placeholder="Full Name"
              class="detail-input"
            />
            <input 
              type="email" 
              v-model="customer.email" 
              placeholder="Email Address"
              class="detail-input"
            />
            <input 
              type="tel" 
              v-model="customer.phone" 
              placeholder="Phone Number"
              class="detail-input"
            />
          </div>
        </div>

        <!-- Order Form -->
        <div class="info-section">
          <h3 class="section-title">Order form</h3>
          <div class="order-items-list">
            <div v-for="item in items" :key="item.itemKey" class="order-item-row">
              <div class="item-quantity">{{ item.quantity }} x</div>
              <div class="item-name-order">{{ item.name }}</div>
              <div class="item-topping" v-if="item.options.topping && item.options.topping !== 'None'">
                + {{ item.options.topping }}
              </div>
              <div class="item-price-order">₱{{ (item.price * item.quantity).toFixed(2) }}</div>
            </div>
          </div>
          
          <button class="add-more-btn" @click="goBackToMenu">
            + Add more items
          </button>
        </div>
      </div>

      <!-- Right Column - Order Summary -->
      <div class="summary-column">
        <div class="summary-card">
          <div class="voucher-section">
            <input 
              type="text" 
              v-model="voucherCode" 
              placeholder="Apply a voucher"
              class="voucher-input"
            />
            <button class="apply-btn" @click="applyVoucher">Apply</button>
          </div>

          <div class="totals-section">
            <div class="total-row">
              <span>Subtotal</span>
              <span>₱{{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="total-row">
              <span>Service Fee</span>
              <span>₱{{ serviceFee.toFixed(2) }}</span>
            </div>
            <div class="total-row">
              <span>Discount</span>
              <span>₱{{ discount.toFixed(2) }}</span>
            </div>
            <div class="total-row grand-total">
              <span>Total</span>
              <span>₱{{ finalTotal.toFixed(2) }}</span>
            </div>
          </div>

          <button class="place-order-btn" @click="placeOrder">
            Place pick-up order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()
const { items, subtotal, serviceFee } = storeToRefs(cartStore)
const { clearCart } = cartStore

const pickupOption = ref('standard')
const voucherCode = ref('')
const discount = ref(0)
const customer = ref({
  name: 'Juan de la Cruz',
  email: 'juandelacruz@gmail.com',
  phone: '09123456789'
})

const finalTotal = computed(() => {
  return subtotal.value + serviceFee.value - discount.value
})

const applyVoucher = () => {
  if (voucherCode.value === 'XIEMI10') {
    discount.value = subtotal.value * 0.1
    alert('Voucher applied! 10% discount')
  } else if (voucherCode.value === 'FREESHIP') {
    discount.value = serviceFee.value
    alert('Free shipping applied!')
  } else {
    alert('Invalid voucher code')
  }
}

const goBackToMenu = () => {
  router.push('/')
}

const placeOrder = () => {
  if (items.value.length === 0) {
    alert('Your cart is empty')
    return
  }
  
  if (!customer.value.name || !customer.value.email || !customer.value.phone) {
    alert('Please fill in all personal details')
    return
  }
  
  const order = {
    id: Date.now(),
    customer: customer.value,
    items: items.value,
    subtotal: subtotal.value,
    serviceFee: serviceFee.value,
    discount: discount.value,
    total: finalTotal.value,
    pickupOption: pickupOption.value,
    timestamp: new Date().toISOString(),
    status: 'pending'
  }
  
  const orders = JSON.parse(localStorage.getItem('orders') || '[]')
  orders.push(order)
  localStorage.setItem('orders', JSON.stringify(orders))
  
  clearCart()
  router.push('/order-confirmation')
}
</script>

<style scoped>
.checkout-page {
  min-height: 100vh;
  background: #f8f9fa;
  padding: 40px 0;
}

.checkout-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 40px;
}

/* Review Column */
.review-column {
  background: white;
  border-radius: 12px;
  padding: 32px;
  border: 1px solid #e5e7eb;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 32px 0;
}

.info-section {
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #f0f0f0;
}

.info-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 16px 0;
}

.info-text {
  font-size: 15px;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

.pickup-options {
  display: flex;
  gap: 12px;
}

.option-btn {
  padding: 10px 20px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
}

.option-btn.active {
  background: #1a1a1a;
  color: white;
  border-color: #1a1a1a;
}

.personal-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-input {
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
}

.detail-input:focus {
  outline: none;
  border-color: #1a1a1a;
}

.order-items-list {
  margin-bottom: 16px;
}

.order-item-row {
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 8px 0;
  font-size: 14px;
}

.item-quantity {
  font-weight: 500;
  color: #1a1a1a;
  min-width: 40px;
}

.item-name-order {
  flex: 1;
  color: #1a1a1a;
}

.item-topping {
  color: #9ca3af;
  font-size: 13px;
}

.item-price-order {
  font-weight: 500;
  color: #1a1a1a;
}

.add-more-btn {
  background: none;
  border: none;
  color: #1a1a1a;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 0;
  text-decoration: underline;
}

/* Summary Column */
.summary-column {
  position: sticky;
  top: 24px;
  height: fit-content;
}

.summary-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e5e7eb;
}

.voucher-section {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.voucher-input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
}

.apply-btn {
  padding: 10px 20px;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.apply-btn:hover {
  background: #e5e7eb;
}

.totals-section {
  margin-bottom: 24px;
}

.total-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  font-size: 14px;
  color: #6b7280;
}

.total-row.grand-total {
  font-weight: 600;
  color: #1a1a1a;
  font-size: 18px;
  padding-top: 16px;
  margin-top: 8px;
  border-top: 1px solid #e5e7eb;
}

.place-order-btn {
  width: 100%;
  padding: 14px;
  background: #1a1a1a;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.place-order-btn:hover {
  background: #333;
}

/* Responsive */
@media (max-width: 768px) {
  .checkout-container {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .review-column {
    padding: 20px;
  }
  
  .page-title {
    font-size: 24px;
  }
  
  .pickup-options {
    flex-direction: column;
  }
  
  .order-item-row {
    flex-wrap: wrap;
  }
}
</style>