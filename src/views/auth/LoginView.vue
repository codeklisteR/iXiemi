<template>
  <div class="auth-page">
    <div class="auth-container">
      <!-- Left Side - Brand Section -->
      <div class="brand-section">
        <div class="brand-content">
          <div class="logo1">
            <img src="C:\Users\ebuen\Downloads\xiemi_logo.png" alt="Xiemi Logo" />
             </div>
            <div class="logo2">
            <img src="C:\Users\ebuen\OneDrive\Pictures\XiemiLogo2.png" alt="Xiemi Logo" />
          </div>
        </div>
      </div>

      <!-- Right Side - Login Form -->
      <div class="form-section">
        <div class="form-container">
          <div class="form-header">
            <h2>Sign In</h2>
            <p>Welcome back to Xiemi</p>
          </div>

          <form @submit.prevent="handleLogin" class="login-form">
            <!-- Email -->
            <div class="form-group">
              <label for="email">Email Address</label>
              <div class="input-wrapper">
                <input
                  type="email"
                  id="email"
                  v-model="email"
                  placeholder="juandelacruz@email.com"
                  required
                />
              </div>
            </div>

            <!-- Password -->
            <div class="form-group">
              <label for="password">Password</label>
              <div class="input-wrapper">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  v-model="password"
                  placeholder="Enter your password"
                  required
                />
                <button 
                  type="button" 
                  class="toggle-password"
                  @click="showPassword = !showPassword"
                >
                  {{ showPassword ? 'Hide' : 'Show' }}
                </button>
              </div>
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="form-options">
              <label class="checkbox-label">
                <input type="checkbox" v-model="rememberMe" />
                <span>Remember me</span>
              </label>
              <a href="#" @click.prevent="forgotPassword" class="forgot-link">Forgot Password?</a>
            </div>

            <!-- Login Button -->
            <button type="submit" class="login-btn" :disabled="loading">
              <span v-if="loading">Signing in...</span>
              <span v-else>Sign In</span>
            </button>

            <!-- Register Link -->
            <div class="auth-link">
              Don't have an account? 
              <router-link to="/register" class="link">Create Account</router-link>
            </div>
          </form>

          <!-- Demo Account Notice 
          <div class="demo-notice">
            <p>Demo Account:</p>
            <p class="demo-cred">Email: demo@xiemi.com<br />Password: demo123</p>
          </div>
          -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  
  try {
    const success = await authStore.login({
      email: email.value,
      password: password.value,
      rememberMe: rememberMe.value
    })
    
    if (success) {
      router.push('/')
    } else {
      alert('Invalid email or password')
    }
  } catch (error) {
    console.error('Login error:', error)
    alert('An error occurred during login')
  } finally {
    loading.value = false
  }
}

const forgotPassword = () => {
  alert('Password reset feature will be available soon!')
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #dbdbdb 0%, #a0a0a0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.auth-container {
  max-width: 1000px;
  width: 100%;
  background: white;
  border-radius: 18px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

.brand-section {
  background:  #000000;
  color: white;
  padding: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.brand-content {
  max-width: 300px;
}

.logo1 img {
  width: 50%; 
  height: auto;
  margin-bottom: 5px;
}

.logo2 img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50px;
  width: 100%; 
  height: auto;  
  display: block;
}


.brand-name {
  font-size: 48px;
  font-weight: 700;
  margin: 0 0 16px 0;
  background: linear-gradient(135deg, #ba0505, #cb0000);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-tagline {
  font-size: 18px;
  line-height: 1.6;
  color: #a0a0a0;
}

.form-section {
  padding: 48px;
  background: white;
}

.form-container {
  max-width: 400px;
  margin: 0 auto;
}

.form-header {
  text-align: center;
  margin-bottom: 32px;
}

.form-header h2 {
  font-size: 32px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px 0;
}

.form-header p {
  color: #6b7280;
  font-size: 14px;
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 12px;
  font-size: 18px;
}

.input-wrapper input {
  width: 100%;
  padding: 12px 12px 12px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
}

.input-wrapper input:focus {
  outline: none;
  border-color: #ce0303;
  box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
}

.toggle-password {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.checkbox-label input {
  cursor: pointer;
}

.checkbox-label span {
  font-size: 13px;
  color: #6b7280;
}

.forgot-link {
  font-size: 13px;
  color: #da0000;
  text-decoration: none;
}

.forgot-link:hover {
  text-decoration: underline;
}

.login-btn {
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

.login-btn:hover:not(:disabled) {
  background: #333;
  transform: translateY(-1px);
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auth-link {
  text-align: center;
  margin-top: 24px;
  font-size: 14px;
  color: #6b7280;
}

.link {
  color: #da0000;
  text-decoration: none;
  font-weight: 500;
}

.link:hover {
  text-decoration: underline;
}

.demo-notice {
  margin-top: 32px;
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
  text-align: center;
}

.demo-notice p {
  margin: 0;
  font-size: 12px;
  color: #6b7280;
}

.demo-cred {
  margin-top: 8px !important;
  font-family: monospace;
  color: #1a1a1a !important;
}

@media (max-width: 768px) {
  .auth-container {
    grid-template-columns: 1fr;
  }
  
  .brand-section {
    display: none;
  }
  
  .form-section {
    padding: 32px 24px;
  }
}
</style>