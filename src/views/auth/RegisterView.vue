<template>
  <div class="auth-page">
    <div class="auth-container">
      <!-- Left Side - Brand Section -->
      <div class="brand-section">
        <div class="brand-content">
            <div class="logo2">
            <img src="C:\Users\ebuen\OneDrive\Pictures\XiemiLogo2.png" alt="Xiemi Logo" />
          </div>
          <p class="brand-tagline">Order your favorite drinks<br />with ease</p>
          <div class="features">
            <div class="feature">
              <span class="feature-icon">✓</span>
              <span>Avoid queues</span>
            </div>
            <div class="feature">
              <span class="feature-icon">✓</span>
              <span>Easy ordering</span>
            </div>
            <div class="feature">
              <span class="feature-icon">✓</span>
              <span>Exclusive offers</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side - Registration Form -->
      <div class="form-section">
        <div class="form-container">
          <div class="form-header">
            <h2>Create Account</h2>
          </div>

          <form @submit.prevent="handleRegister" class="register-form">
            <!-- Full Name -->
            <div class="form-group">
              <label for="fullname">Full Name</label>
              <div class="input-wrapper">
                <input
                  type="text"
                  id="fullname"
                  v-model="formData.fullname"
                  placeholder="Juan Dela Cruz"
                  required
                />
              </div>
            </div>

            <!-- Email Address -->
            <div class="form-group">
              <label for="email">Email Address</label>
              <div class="input-wrapper">
                <input
                  type="email"
                  id="email"
                  v-model="formData.email"
                  placeholder="juandelacruz@email.com"
                  required
                />
              </div>
            </div>

            <!-- Phone Number -->
            <div class="form-group">
              <label for="phone">Phone Number</label>
              <div class="input-wrapper">
                <input
                  type="tel"
                  id="phone"
                  v-model="formData.phone"
                  placeholder="09123456789"
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
                  v-model="formData.password"
                  placeholder="Create a strong password"
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
              <div class="password-strength" v-if="formData.password">
                <div class="strength-bar">
                  <div 
                    class="strength-level" 
                    :class="passwordStrength.class"
                    :style="{ width: passwordStrength.percentage + '%' }"
                  ></div>
                </div>
                <span class="strength-text">{{ passwordStrength.text }}</span>
              </div>
            </div>

            <!-- Confirm Password -->
            <div class="form-group">
              <label for="confirmPassword">Confirm Password</label>
              <div class="input-wrapper">
                <input
                  :type="showConfirmPassword ? 'text' : 'password'"
                  id="confirmPassword"
                  v-model="formData.confirmPassword"
                  placeholder="Confirm your password"
                  required
                />
                <button 
                  type="button" 
                  class="toggle-password"
                  @click="showConfirmPassword = !showConfirmPassword"
                >
                  {{ showConfirmPassword ? 'Hide' : 'Show' }}
                </button>
              </div>
              <div v-if="passwordMismatch" class="error-message">
                Passwords do not match
              </div>
            </div>

            <!-- Terms and Conditions -->
            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" v-model="formData.agreeTerms" required />
                <span>I agree to the <a href="#" @click.prevent="showTerms">Terms and Conditions</a> and <a href="#" @click.prevent="showPrivacy">Privacy Policy</a></span>
              </label>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="register-btn" :disabled="loading">
              <span v-if="loading">Creating account...</span>
              <span v-else>Create Account</span>
            </button>

            <!-- Login Link -->
            <div class="auth-link">
              Already have an account? 
              <router-link to="/login" class="link">Sign In</router-link>
            </div>
          </form>

        </div>
      </div>
    </div>

    <!-- Terms Modal -->
    <div v-if="showTermsModal" class="modal-overlay" @click="showTermsModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Terms and Conditions</h3>
          <button class="close-modal" @click="showTermsModal = false">×</button>
        </div>
        <div class="modal-body">
          <h4>1. Acceptance of Terms</h4>
          <p>By creating an account, you agree to be bound by these Terms and Conditions.</p>
          
          <h4>2. Use of Service</h4>
          <p>You agree to use Xiemi ordering system for personal, non-commercial purposes only.</p>
          
          <h4>3. Account Responsibility</h4>
          <p>You are responsible for maintaining the security of your account and password.</p>
          
          <h4>4. Ordering and Payments</h4>
          <p>All orders are subject to availability and confirmation of order price.</p>
          
          <h4>5. Privacy</h4>
          <p>Your personal information will be handled in accordance with our Privacy Policy.</p>
        </div>
        <div class="modal-footer">
          <button @click="showTermsModal = false" class="modal-btn">Close</button>
        </div>
      </div>
    </div>

    <!-- Privacy Modal -->
    <div v-if="showPrivacyModal" class="modal-overlay" @click="showPrivacyModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Privacy Policy</h3>
          <button class="close-modal" @click="showPrivacyModal = false">×</button>
        </div>
        <div class="modal-body">
          <h4>Information We Collect</h4>
          <p>We collect your name, email, phone number, and order history to provide our services.</p>
          
          <h4>How We Use Your Information</h4>
          <p>We use your information to process orders, communicate with you, and improve our services.</p>
          
          <h4>Data Security</h4>
          <p>We implement security measures to protect your personal information.</p>
          
          <h4>Your Rights</h4>
          <p>You have the right to access, correct, or delete your personal information.</p>
        </div>
        <div class="modal-footer">
          <button @click="showPrivacyModal = false" class="modal-btn">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const formData = ref({
  fullname: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false
})

const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const showTermsModal = ref(false)
const showPrivacyModal = ref(false)

// Password strength calculator
const passwordStrength = computed(() => {
  const password = formData.value.password
  if (!password) return { text: '', class: '', percentage: 0 }
  
  let strength = 0
  if (password.length >= 8) strength += 25
  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 25
  if (password.match(/[0-9]/)) strength += 25
  if (password.match(/[^a-zA-Z0-9]/)) strength += 25
  
  if (strength <= 25) return { text: 'Weak', class: 'weak', percentage: strength }
  if (strength <= 50) return { text: 'Fair', class: 'fair', percentage: strength }
  if (strength <= 75) return { text: 'Good', class: 'good', percentage: strength }
  return { text: 'Strong', class: 'strong', percentage: strength }
})

const passwordMismatch = computed(() => {
  return formData.value.password && formData.value.confirmPassword && 
         formData.value.password !== formData.value.confirmPassword
})

const handleRegister = async () => {
  // Validation
  if (passwordMismatch.value) {
    alert('Passwords do not match!')
    return
  }
  
  if (!formData.value.agreeTerms) {
    alert('Please agree to the Terms and Conditions')
    return
  }
  
  if (formData.value.password.length < 6) {
    alert('Password must be at least 6 characters long')
    return
  }
  
  loading.value = true
  
  try {
    // Register user
    const success = await authStore.register({
      name: formData.value.fullname,
      email: formData.value.email,
      phone: formData.value.phone,
      password: formData.value.password
    })
    
    if (success) {
      alert('Registration successful! Please log in.')
      router.push('/login')
    } else {
      alert('Registration failed. Email may already exist.')
    }
  } catch (error) {
    console.error('Registration error:', error)
    alert('An error occurred during registration')
  } finally {
    loading.value = false
  }
}

const socialRegister = (provider) => {
  alert(`Registration with ${provider} will be available soon!`)
}

const showTerms = () => {
  showTermsModal.value = true
}

const showPrivacy = () => {
  showPrivacyModal.value = true
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #dbdbdb 0%, #a0a0a0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px;
}

.auth-container {
  max-width: 1100px;
  width: 90%;
  background: white;
  border-radius: 18px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

/* Brand Section */
.brand-section {
  background:#000000;
  color: white;
  padding: 48px;
  display: flex;
  align-items: center;
}

.brand-content {
  max-width: 400px;
}

.logo2 img {
  width: 250px;
  height: auto;
  margin-bottom: 0px;
}

.brand-name {
  font-size: 48px;
  font-weight: 700;
  margin: 0 0 16px 0;
  background: linear-gradient(135deg, #ff6b35, #ff8c42);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-tagline {
  font-size: 15px;
  line-height: 1.6;
  color: #ffffff;
  margin-top: 20px;
  margin-bottom: 30px;
}

.features {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.feature {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 20px;
}

.feature-icon {
  width: 24px;
  height: 24px;
  background: rgba(255, 107, 53, 0.2);
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #e11111;
  font-weight: bold;
}

/* Form Section */
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

/* Form Groups */
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
  padding: 0;
}

/* Password Strength */
.password-strength {
  margin-top: 8px;
}

.strength-bar {
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 4px;
}

.strength-level {
  height: 100%;
  transition: all 0.3s;
}

.strength-level.weak {
  background: #ef4444;
  width: 25%;
}

.strength-level.fair {
  background: #f59e0b;
}

.strength-level.good {
  background: #10b981;
}

.strength-level.strong {
  background: #10b981;
}

.strength-text {
  font-size: 12px;
  color: #6b7280;
}

/* Error Message */
.error-message {
  color: #ef4444;
  font-size: 12px;
  margin-top: 8px;
}

/* Checkbox Group */
.checkbox-group {
  margin-top: 20px;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: 16px;
  height: 16px;
  margin-top: 2px;
  cursor: pointer;
}

.checkbox-label span {
  font-size: 13px;
  color: #6b7280;
  line-height: 1.5;
}

.checkbox-label a {
  color: #e10909;
  text-decoration: none;
}

.checkbox-label a:hover {
  text-decoration: underline;
}

/* Register Button */
.register-btn {
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
  margin-top: 8px;
}

.register-btn:hover:not(:disabled) {
  background: #333;
  transform: translateY(-1px);
}

.register-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Auth Link */
.auth-link {
  text-align: center;
  margin-top: 24px;
  font-size: 14px;
  color: #6b7280;
}

.link {
  color: #e10909;
  text-decoration: none;
  font-weight: 500;
}

.link:hover {
  text-decoration: underline;
}

/* Social Auth */
.social-auth {
  margin-top: 32px;
}

.divider {
  text-align: center;
  margin-bottom: 20px;
  position: relative;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: calc(50% - 60px);
  height: 1px;
  background: #e5e7eb;
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.divider span {
  background: white;
  padding: 0 12px;
  font-size: 12px;
  color: #9ca3af;
}

.social-buttons {
  display: flex;
  gap: 12px;
}

.social-btn {
  flex: 1;
  padding: 10px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.social-btn span {
  font-weight: bold;
  font-size: 18px;
}

.social-btn.google:hover {
  background: #f3f4f6;
  border-color: #ff6b35;
}

.social-btn.facebook:hover {
  background: #f3f4f6;
  border-color: #1877f2;
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

.modal-content {
  background: white;
  border-radius: 16px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
  margin: 0;
  font-size: 20px;
}

.close-modal {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #6b7280;
}

.modal-body {
  padding: 20px;
}

.modal-body h4 {
  margin: 20px 0 10px 0;
  color: #1a1a1a;
}

.modal-body p {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 16px;
}

.modal-footer {
  padding: 20px;
  border-top: 1px solid #e5e7eb;
}

.modal-btn {
  width: 100%;
  padding: 10px;
  background: #1a1a1a;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

/* Responsive */
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
  
  .form-header h2 {
    font-size: 28px;
  }
}
</style>