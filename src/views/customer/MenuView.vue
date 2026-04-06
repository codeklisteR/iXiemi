<template>
  <div class="landing-page">
    <div class="main-container">
      <!-- Left Column - Menu Section -->
      <div class="menu-column">
        <!-- Header -->
        <div class="header">
          <h1 class="title">Best Sellers</h1>
        </div>

        <!-- Menu Items Grid -->
        <div class="menu-grid">
          <div 
            v-for="item in menuItems" 
            :key="item.id" 
            class="menu-card"
            @click="openModal(item)"
          >
            <div class="card-image">
              <div class="image-placeholder"></div>
            </div>
            <div class="card-content">
              <h3 class="item-name">{{ item.name }}</h3>
              <div class="item-category" v-if="item.category">{{ item.category }}</div>
              <p class="item-price">₱{{ item.price.toFixed(2) }}</p>
              <p class="item-description">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column - Order Summary -->
      <div class="order-summary-column">
        <div class="order-type-buttons">
          <button 
            :class="['type-btn', { active: orderType === 'dine-in' }]"
            @click="orderType = 'dine-in'"
          >
            Dine-In
          </button>
          <button 
            :class="['type-btn', { active: orderType === 'pickup' }]"
            @click="orderType = 'pickup'"
          >
            Pick-up
          </button>
        </div>

        <div class="your-items-section">
          <h3 class="section-title">Your Items</h3>
          
          <div class="items-list">
            <div v-if="items.length === 0" class="empty-cart">
              No items in cart
            </div>
            <div 
              v-for="item in items" 
              :key="item.itemKey" 
              class="cart-item-row"
            >
              <div class="item-info">
                <div class="item-name-order">{{ item.name }}</div>
                <div class="item-options" v-if="item.options.sugar">
                  {{ item.options.sugar }} Sugar
                </div>
              </div>
              <div class="item-price-order">₱{{ (item.price * item.quantity).toFixed(2) }}</div>
            </div>
          </div>

          <div class="order-totals">
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
              <span>₱0.00</span>
            </div>
            <div class="total-row grand-total">
              <span>Total</span>
              <span>₱{{ total.toFixed(2) }}</span>
            </div>
          </div>

          <button class="checkout-button" @click="goToCheckout">
            Checkout
          </button>
        </div>
      </div>
    </div>

    <!-- Item Customization Modal -->
    <div v-if="selectedItem" class="modal-overlay" @click="closeModal">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <h2>{{ selectedItem.name }}</h2>
          <button class="close-modal" @click="closeModal">×</button>
        </div>
        
        <div class="modal-price">₱{{ selectedItem.price.toFixed(2) }}</div>
        
        <div class="modal-description">
          {{ selectedItem.description }}
        </div>
        
        <div class="customization-group">
          <label class="customization-label">Sugar Level</label>
          <div class="options-row">
            <button 
              v-for="level in sugarOptions"
              :key="level"
              :class="['option-chip', { active: sugarLevel === level }]"
              @click="sugarLevel = level"
            >
              {{ level }}
            </button>
          </div>
        </div>
        
        <button class="add-to-cart-btn" @click="addToCart">
          Add to Cart • ₱{{ selectedItem.price.toFixed(2) }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()
const { items, subtotal, serviceFee, total } = storeToRefs(cartStore)
const { addItem } = cartStore

const orderType = ref('pickup')
const selectedItem = ref(null)
const sugarLevel = ref('25%')
const sugarOptions = ['0%', '25%', '50%', '75%', '100%']

const menuItems = ref([
  {
    id: 1,
    name: 'Choco Oreo Milk Tea',
    price: 89.00,
    category: '',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: 2,
    name: 'Salty Cheese',
    price: 99.00,
    category: 'Regular',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: 3,
    name: 'Coffee Based Frappe',
    price: 109.00,
    category: 'Coffee Based Frappe',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: 4,
    name: 'Non-Coffee Based Frappe',
    price: 99.00,
    category: 'Non-Coffee Based Frappe',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  }
])

const openModal = (item) => {
  selectedItem.value = item
  sugarLevel.value = '25%'
}

const closeModal = () => {
  selectedItem.value = null
}

const addToCart = () => {
  addItem(selectedItem.value, { sugar: sugarLevel.value })
  closeModal()
}

const goToCheckout = () => {
  router.push('/cart')
}
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
  background: #f8f9fa;
}

.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 40px;
}

/* Menu Column */
.menu-column {
  background: transparent;
}

.header {
  margin-bottom: 32px;
}

.title {
  font-size: 32px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.menu-grid {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.menu-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  gap: 20px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #e5e7eb;
}

.menu-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.card-image {
  flex-shrink: 0;
}

.image-placeholder {
  width: 100px;
  height: 100px;
  background: #f3f4f6;
  border-radius: 8px;
}

.card-content {
  flex: 1;
}

.item-name {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 4px 0;
}

.item-category {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 6px;
}

.item-price {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px 0;
}

.item-description {
  font-size: 13px;
  color: #6b7280;
  line-height: 1.5;
  margin: 0;
}

/* Order Summary Column */
.order-summary-column {
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e5e7eb;
  height: fit-content;
  position: sticky;
  top: 24px;
}

.order-type-buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
}

.type-btn {
  flex: 1;
  padding: 10px;
  background: rgba(95, 0, 0, 0.277);
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
}

.type-btn.active {
  background: #1a1a1a;
  color: white;
  border-color: #1a1a1a;
}

.your-items-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 20px 0;
}

.items-list {
  margin-bottom: 24px;
  max-height: 400px;
  overflow-y: auto;
}

.empty-cart {
  text-align: center;
  padding: 40px 20px;
  color: #9ca3af;
  font-size: 14px;
}

.cart-item-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #f3f4f6;
}

.cart-item-row:last-child {
  border-bottom: none;
}

.item-info {
  flex: 1;
}

.item-name-order {
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.item-options {
  font-size: 12px;
  color: #9ca3af;
}

.item-price-order {
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
}

.order-totals {
  border-top: 1px solid #e5e7eb;
  padding-top: 16px;
  margin-bottom: 24px;
}

.total-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
  color: #6b7280;
}

.total-row.grand-total {
  font-weight: 600;
  color: #1a1a1a;
  font-size: 18px;
  padding-top: 12px;
  margin-top: 4px;
  border-top: 1px solid #e5e7eb;
}

.checkout-button {
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

.checkout-button:hover {
  background: #333;
  transform: translateY(-1px);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-container {
  background: white;
  border-radius: 16px;
  padding: 28px;
  max-width: 450px;
  width: 90%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.modal-header h2 {
  font-size: 22px;
  font-weight: 600;
  margin: 0;
  color: #1a1a1a;
}

.close-modal {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #f3f4f6;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #6b7280;
}

.modal-price {
  font-size: 28px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 12px;
}

.modal-description {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 24px;
}

.customization-group {
  margin-bottom: 28px;
}

.customization-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 12px;
}

.options-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.option-chip {
  padding: 8px 16px;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  color: #6b7280;
}

.option-chip.active {
  background: #1a1a1a;
  color: white;
  border-color: #1a1a1a;
}

.add-to-cart-btn {
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

.add-to-cart-btn:hover {
  background: #333;
}

/* Responsive */
@media (max-width: 768px) {
  .main-container {
    grid-template-columns: 1fr;
    padding: 20px;
  }
  
  .order-summary-column {
    position: static;
    order: -1;
  }
  
  .menu-card {
    flex-direction: column;
  }
  
  .card-image {
    width: 100%;
  }
  
  .image-placeholder {
    width: 100%;
    height: 150px;
  }
}
</style>