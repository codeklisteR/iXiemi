import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMenuStore = defineStore('menu', () => {
  const menuItems = ref([
    {
      id: 1,
      name: 'Choco Oreo Milk Tea',
      price: 89.00,
      category: 'Milk Tea',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: 'https://via.placeholder.com/200x200?text=Choco+Oreo',
      customization: {
        sugar: ['0%', '25%', '50%', '75%', '100%'],
        ice: ['Less', 'Normal', 'More'],
        toppings: ['Pearls', 'Grass Jelly', 'Oreo', 'None']
      }
    },
    {
      id: 2,
      name: 'Salty Cheese',
      price: 99.00,
      category: 'Coffee',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: 'https://via.placeholder.com/200x200?text=Salty+Cheese',
      customization: {
        sugar: ['0%', '25%', '50%', '75%', '100%'],
        ice: ['Less', 'Normal', 'More']
      }
    },
    {
      id: 3,
      name: 'Coffee Based Frappe',
      price: 109.00,
      category: 'Frappe',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: 'https://via.placeholder.com/200x200?text=Coffee+Frappe',
      customization: {
        sugar: ['0%', '25%', '50%', '75%', '100%'],
        ice: ['Less', 'Normal', 'More']
      }
    },
    {
      id: 4,
      name: 'Coffee Based Frappe',
      price: 109.00,
      category: 'Frappe',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: 'https://via.placeholder.com/200x200?text=Coffee+Frappe',
      customization: {
        sugar: ['0%', '25%', '50%', '75%', '100%'],
        ice: ['Less', 'Normal', 'More']
      }
    }
  ])
  
  const categories = ref(['All', 'Milk Tea', 'Coffee', 'Specialty', 'Frappe'])
  const searchQuery = ref('')
  const selectedCategory = ref('All')
  
  const filteredItems = computed(() => {
    let items = menuItems.value
    
    if (selectedCategory.value !== 'All') {
      items = items.filter(item => item.category === selectedCategory.value)
    }
    
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      items = items.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      )
    }
    
    return items
  })
  
  function setCategory(category) {
    selectedCategory.value = category
  }
  
  function setSearch(query) {
    searchQuery.value = query
  }
  
  return {
    menuItems,
    categories,
    searchQuery,
    selectedCategory,
    filteredItems,
    setCategory,
    setSearch
  }
})