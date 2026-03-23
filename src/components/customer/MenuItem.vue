<template>
  <div class="menu-item" @click="showModal = true">
    <img :src="item.image" :alt="item.name" class="item-image" />
    <div class="item-info">
      <h3 class="item-name">{{ item.name }}</h3>
      <p class="item-description">{{ truncateText(item.description) }}</p>
      <div class="item-footer">
        <span class="item-price">₱{{ item.price.toFixed(2) }}</span>
        <button class="add-button" @click.stop="quickAdd">+</button>
      </div>
    </div>
    
    <!-- Customization Modal -->
    <div v-if="showModal" class="modal-overlay" @click="showModal = false">
      <div class="modal-content" @click.stop>
        <h2>{{ item.name }}</h2>
        <p class="modal-price">₱{{ item.price.toFixed(2) }}</p>
        
        <div v-if="item.customization" class="customization-section">
          <div v-if="item.customization.sugar" class="option-group">
            <h4>Sugar Level</h4>
            <div class="option-buttons">
              <button 
                v-for="sugar in item.customization.sugar" 
                :key="sugar"
                :class="['option-btn', { active: selectedSugar === sugar }]"
                @click="selectedSugar = sugar"
              >
                {{ sugar }}
              </button>
            </div>
          </div>
          
          <div v-if="item.customization.ice" class="option-group">
            <h4>Ice Level</h4>
            <div class="option-buttons">
              <button 
                v-for="ice in item.customization.ice" 
                :key="ice"
                :class="['option-btn', { active: selectedIce === ice }]"
                @click="selectedIce = ice"
              >
                {{ ice }}
              </button>
            </div>
          </div>
          
          <div v-if="item.customization.toppings" class="option-group">
            <h4>Toppings</h4>
            <div class="option-buttons">
              <button 
                v-for="topping in item.customization.toppings" 
                :key="topping"
                :class="['option-btn', { active: selectedTopping === topping }]"
                @click="selectedTopping = topping"
              >
                {{ topping }}
              </button>
            </div>
          </div>
        </div>
        
        <div class="modal-actions">
          <button class="cancel-btn" @click="showModal = false">Cancel</button>
          <button class="add-to-cart-btn" @click="addToCart">
            Add to Cart • ₱{{ item.price.toFixed(2) }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'

const props = defineProps(['item'])
const cartStore = useCartStore()

const showModal = ref(false)
const selectedSugar = ref('50%')
const selectedIce = ref('Normal')
const selectedTopping = ref('None')

const truncateText = (text) => {
  return text.length > 60 ? text.substring(0, 60) + '...' : text
}

const quickAdd = () => {
  const options = {}
  if (props.item.customization?.sugar) options.sugar = selectedSugar.value
  if (props.item.customization?.ice) options.ice = selectedIce.value
  if (props.item.customization?.toppings && selectedTopping.value !== 'None') {
    options.topping = selectedTopping.value
  }
  cartStore.addItem(props.item, options)
  showModal.value = false
}

const addToCart = () => {
  const options = {}
  if (props.item.customization?.sugar) options.sugar = selectedSugar.value
  if (props.item.customization?.ice) options.ice = selectedIce.value
  if (props.item.customization?.toppings && selectedTopping.value !== 'None') {
    options.topping = selectedTopping.value
  }
  cartStore.addItem(props.item, options)
  showModal.value = false
}
</script>

<style scoped>
.menu-item {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.menu-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}

.item-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.item-info {
  padding: 12px;
}

.item-name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 6px;
  color: #333;
}

.item-description {
  font-size: 12px;
  color: #666;
  margin-bottom: 10px;
  line-height: 1.4;
}

.item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-price {
  font-size: 18px;
  font-weight: bold;
  color: #ff6b35;
}

.add-button {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #ff6b35;
  color: white;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-button:hover {
  background: #ff5722;
}

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

.modal-content {
  background: white;
  border-radius: 16px;
  padding: 24px;
  max-width: 400px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-price {
  font-size: 24px;
  color: #ff6b35;
  font-weight: bold;
  margin: 12px 0;
}

.option-group {
  margin-bottom: 20px;
}

.option-group h4 {
  margin-bottom: 10px;
  color: #333;
}

.option-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.option-btn {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.option-btn.active {
  background: #ff6b35;
  color: white;
  border-color: #ff6b35;
}

.modal-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.cancel-btn {
  flex: 1;
  padding: 12px;
  background: #f0f0f0;
  border-radius: 8px;
  cursor: pointer;
}

.add-to-cart-btn {
  flex: 2;
  padding: 12px;
  background: #ff6b35;
  color: white;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}
</style>