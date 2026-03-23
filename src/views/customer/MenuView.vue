<template>
  <div class="menu-container">
    <div class="header">
      <h1>Xiemi</h1>
      <p>Order your favorite drinks</p>
    </div>
    
    <div class="search-bar">
      <input 
        type="text" 
        v-model="searchInput"
        placeholder="Search in Menu..."
        class="search-input"
      />
    </div>
    
    <div class="categories">
      <button 
        v-for="category in categories" 
        :key="category"
        :class="['category-btn', { active: selectedCategory === category }]"
        @click="setCategory(category)"
      >
        {{ category }}
      </button>
    </div>
    
    <div class="menu-grid">
      <MenuItem 
        v-for="item in filteredItems" 
        :key="item.id"
        :item="item"
      />
    </div>
    
    <CartSidebar />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useMenuStore } from '@/stores/menu'
import { storeToRefs } from 'pinia'
import MenuItem from '@/components/customer/MenuItem.vue'
import CartSidebar from '@/components/common/CartSidebar.vue'

const menuStore = useMenuStore()
const { categories, selectedCategory, filteredItems } = storeToRefs(menuStore)
const { setCategory, setSearch } = menuStore

const searchInput = ref('')

watch(searchInput, (newVal) => {
  setSearch(newVal)
})
</script>

<style scoped>
.menu-container {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 80px;
}

.header {
  background: linear-gradient(135deg, #ff6b35, #ff8c42);
  color: white;
  padding: 40px 20px;
  text-align: center;
}

.header h1 {
  font-size: 32px;
  margin-bottom: 8px;
}

.search-bar {
  padding: 20px;
  background: white;
  margin: 0 20px;
  border-radius: 12px;
  transform: translateY(-20px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.search-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
}

.search-input:focus {
  border-color: #ff6b35;
}

.categories {
  display: flex;
  gap: 10px;
  padding: 0 20px;
  margin-bottom: 20px;
  overflow-x: auto;
}

.category-btn {
  padding: 8px 20px;
  border-radius: 20px;
  background: white;
  white-space: nowrap;
  border: 1px solid #ddd;
  cursor: pointer;
  transition: all 0.2s;
}

.category-btn.active {
  background: #ff6b35;
  color: white;
  border-color: #ff6b35;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 0 20px;
}

@media (max-width: 768px) {
  .menu-grid {
    grid-template-columns: 1fr;
  }
}
</style>
