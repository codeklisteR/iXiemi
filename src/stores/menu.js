import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMenuStore = defineStore('menu', () => {
  const menuItems = ref([
    {
      id: 1,
      name: 'Choco Oreo Milk Tea',
      price: 89.00,
      category: 'Milk Tea',
      description: 'Rich chocolate milk tea with Oreo crumbs',
      image: 'https://via.placeholder.com/200x200?text=Choco+Oreo',
      customization: {
        sugar: ['0%', '25%', '50%', '75%', '100%'],
        ice: ['Less', 'Normal', 'More'],
        toppings: ['Pearls', 'Grass Jelly', 'Oreo', 'None']
      }
    },
    {
      id: 2,
      name: 'Salty Cheese Coffee',
      price: 99.00,
      category: 'Coffee',
      description: 'Coffee with creamy salted cheese foam',
      image: 'https://via.placeholder.com/200x200?text=Salty+Cheese',
      customization: {
        sugar: ['0%', '25%', '50%', '75%', '100%'],
        ice: ['Less', 'Normal', 'More']
      }
    },
    {
      id: 3,
      name: 'Strawberry Matcha',
      price: 109.00,
      category: 'Specialty',
      description: 'Matcha latte with strawberry puree',
      image: 'https://via.placeholder.com/200x200?text=Strawberry+Matcha',
      customization: {
        sugar: ['0%', '25%', '50%', '75%', '100%'],
        ice: ['Less', 'Normal', 'More']
      }
    },
    {
      id: 4,
      name: 'Brown Sugar Pearl Milk',
      price: 95.00,
      category: 'Milk Tea',
      description: 'Fresh milk with caramelized brown sugar pearls',
      image: 'https://via.placeholder.com/200x200?text=Brown+Sugar',
      customization: {
        sugar: ['0%', '25%', '50%', '75%', '100%'],
        ice: ['Less', 'Normal', 'More']
      }
    },
    {
      id: 5,
      name: 'Matcha Latte',
      price: 105.00,
      category: 'Specialty',
      description: 'Premium Japanese matcha with fresh milk',
      image: 'https://via.placeholder.com/200x200?text=Matcha+Latte',
      customization: {
        sugar: ['0%', '25%', '50%', '75%', '100%'],
        ice: ['Less', 'Normal', 'More']
      }
    },
    {
      id: 6,
      name: 'Taro Milk Tea',
      price: 85.00,
      category: 'Milk Tea',
      description: 'Creamy taro flavor with milk tea',
      image: 'https://via.placeholder.com/200x200?text=Taro+Milk+Tea',
      customization: {
        sugar: ['0%', '25%', '50%', '75%', '100%'],
        ice: ['Less', 'Normal', 'More'],
        toppings: ['Pearls', 'Grass Jelly', 'None']
      }
    }
  ])
  
  const categories = ref(['All', 'Milk Tea', 'Coffee', 'Specialty'])
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