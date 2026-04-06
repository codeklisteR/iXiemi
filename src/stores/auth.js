import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = ref(false)
  const token = ref(localStorage.getItem('auth_token') || null)

  // Load user from localStorage if exists
  const loadUser = () => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      user.value = JSON.parse(storedUser)
      isAuthenticated.value = true
    }
  }

  // Register new user
  const register = async (userData) => {
    try {
      // Get existing users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      
      // Check if email already exists
      if (users.find(u => u.email === userData.email)) {
        return false
      }
      
      // Create new user
      const newUser = {
        id: Date.now(),
        ...userData,
        createdAt: new Date().toISOString(),
        orders: []
      }
      
      // Save to localStorage
      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))
      
      return true
    } catch (error) {
      console.error('Registration error:', error)
      return false
    }
  }

  // Login user
  const login = async (credentials) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const foundUser = users.find(u => 
        u.email === credentials.email && u.password === credentials.password
      )
      
      if (foundUser) {
        const authToken = generateToken()
        token.value = authToken
        user.value = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          phone: foundUser.phone
        }
        isAuthenticated.value = true
        
        // Store in localStorage
        if (credentials.rememberMe) {
          localStorage.setItem('auth_token', authToken)
          localStorage.setItem('user', JSON.stringify(user.value))
        } else {
          sessionStorage.setItem('auth_token', authToken)
          sessionStorage.setItem('user', JSON.stringify(user.value))
        }
        
        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  // Logout user
  const logout = () => {
    user.value = null
    isAuthenticated.value = false
    token.value = null
    
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
    sessionStorage.removeItem('auth_token')
    sessionStorage.removeItem('user')
  }

  // Generate simple token
  const generateToken = () => {
    return Math.random().toString(36).substr(2) + Date.now().toString(36)
  }

  // Check if user is logged in
  const checkAuth = () => {
    const storedToken = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user')
    
    if (storedToken && storedUser) {
      token.value = storedToken
      user.value = JSON.parse(storedUser)
      isAuthenticated.value = true
      return true
    }
    return false
  }

  // Computed property for user's name
  const userName = computed(() => user.value?.name || '')

  // Load user on store initialization
  loadUser()
  checkAuth()

  return {
    user,
    isAuthenticated,
    token,
    userName,
    register,
    login,
    logout,
    checkAuth
  }
})