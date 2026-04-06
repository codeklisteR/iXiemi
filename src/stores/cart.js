import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  
  const totalItems = computed(() => {
    return items.value.reduce((sum, item) => sum + (item.quantity || 0), 0)
  })
  
  const subtotal = computed(() => {
    return items.value.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0)
  })
  
  const serviceFee = computed(() => {
    return subtotal.value * 0.05
  })
  
  const total = computed(() => {
    return subtotal.value + serviceFee.value
  })
  
  function addItem(item, options = {}) {
    if (!item || !item.id) return
    
    const itemKey = `${item.id}-${JSON.stringify(options)}`
    const existingItem = items.value.find(i => i.itemKey === itemKey)
    
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 0) + 1
    } else {
      items.value.push({
        ...item,
        quantity: 1,
        options: options || {},
        itemKey
      })
    }
  }
  
  function removeItem(itemKey) {
    const index = items.value.findIndex(i => i.itemKey === itemKey)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
  }
  
  function updateQuantity(itemKey, quantity) {
    const item = items.value.find(i => i.itemKey === itemKey)
    if (item) {
      if (quantity <= 0) {
        removeItem(itemKey)
      } else {
        item.quantity = quantity
      }
    }
  }
  
  function clearCart() {
    items.value = []
  }
  
  return {
    items,
    totalItems,
    subtotal,
    serviceFee,
    total,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  }
})