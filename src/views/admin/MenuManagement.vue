<template>
  <div class="admin-menu">
    <div class="admin-header">
      <h1>Menu Management</h1>
      <div class="admin-nav">
        <router-link to="/admin" class="nav-item">Dashboard</router-link>
        <router-link to="/admin/orders" class="nav-item">Orders</router-link>
        <router-link to="/admin/menu" class="nav-item">Menu Management</router-link>
      </div>
    </div>
    
    <button class="add-btn" @click="showAddModal = true">
      + Add New Item
    </button>
    
    <div class="menu-table">
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in menuItems" :key="item.id">
            <td><img :src="item.image" class="menu-thumb" /></td>
            <td>{{ item.name }}</td>
            <td>{{ item.category }}</td>
            <td>₱{{ item.price.toFixed(2) }}</td>
            <td>
              <button class="edit-btn" @click="editItem(item)">Edit</button>
              <button class="delete-btn" @click="deleteItem(item.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Add/Edit Modal -->
    <div v-if="showAddModal || showEditModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h2>{{ showEditModal ? 'Edit Item' : 'Add New Item' }}</h2>
        
        <div class="form-group">
          <label>Name</label>
          <input v-model="formData.name" type="text" />
        </div>
        
        <div class="form-group">
          <label>Category</label>
          <select v-model="formData.category">
            <option>Milk Tea</option>
            <option>Coffee</option>
            <option>Specialty</option>
          </select>
        </div>
        
        <div class="form-group">
          <label>Price</label>
          <input v-model="formData.price" type="number" step="0.01" />
        </div>
        
        <div class="form-group">
          <label>Description</label>
          <textarea v-model="formData.description" rows="3"></textarea>
        </div>
        
        <div class="form-group">
          <label>Image URL</label>
          <input v-model="formData.image" type="text" />
        </div>
        
        <div class="modal-actions">
          <button class="cancel-btn" @click="closeModal">Cancel</button>
          <button class="save-btn" @click="saveItem">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useMenuStore } from '@/stores/menu'

const menuStore = useMenuStore()
const { menuItems } = storeToRefs(menuStore)

const showAddModal = ref(false)
const showEditModal = ref(false)
const formData = ref({
  id: null,
  name: '',
  category: 'Milk Tea',
  price: 0,
  description: '',
  image: 'https://via.placeholder.com/200x200?text=New+Item'
})

const editItem = (item) => {
  formData.value = { ...item }
  showEditModal.value = true
}

const deleteItem = (id) => {
  if (confirm('Are you sure you want to delete this item?')) {
    const index = menuItems.value.findIndex(item => item.id === id)
    if (index !== -1) {
      menuItems.value.splice(index, 1)
      // Save to localStorage for persistence
      localStorage.setItem('menuItems', JSON.stringify(menuItems.value))
    }
  }
}

const saveItem = () => {
  if (showEditModal.value) {
    const index = menuItems.value.findIndex(item => item.id === formData.value.id)
    if (index !== -1) {
      menuItems.value[index] = { ...formData.value }
    }
  } else {
    const newItem = {
      ...formData.value,
      id: Date.now(),
      customization: {
        sugar: ['0%', '25%', '50%', '75%', '100%'],
        ice: ['Less', 'Normal', 'More']
      }
    }
    menuItems.value.push(newItem)
  }
  
  // Save to localStorage
  localStorage.setItem('menuItems', JSON.stringify(menuItems.value))
  closeModal()
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  formData.value = {
    id: null,
    name: '',
    category: 'Milk Tea',
    price: 0,
    description: '',
    image: 'https://via.placeholder.com/200x200?text=New+Item'
  }
}

onMounted(() => {
  // Load menu from localStorage if exists
  const storedMenu = localStorage.getItem('menuItems')
  if (storedMenu) {
    menuItems.value = JSON.parse(storedMenu)
  }
})
</script>

<style scoped>
.admin-menu {
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

.add-btn {
  background: #ff6b35;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  cursor: pointer;
}

.menu-table {
  background: white;
  border-radius: 12px;
  overflow-x: auto;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background: #f9f9f9;
  font-weight: 600;
}

.menu-thumb {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
}

.edit-btn, .delete-btn {
  padding: 6px 12px;
  margin-right: 8px;
  border-radius: 4px;
  cursor: pointer;
}

.edit-btn {
  background: #4caf50;
  color: white;
}

.delete-btn {
  background: #f44336;
  color: white;
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
  max-width: 500px;
  width: 90%;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-group input, .form-group select, .form-group textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.modal-actions {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.cancel-btn, .save-btn {
  flex: 1;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
}

.cancel-btn {
  background: #f0f0f0;
}

.save-btn {
  background: #ff6b35;
  color: white;
}
</style>