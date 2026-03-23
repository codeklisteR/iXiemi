<template>
  <nav class="navbar">
    <div class="nav-container">
      <router-link to="/" class="logo">
        🧋 Xiemi
      </router-link>
      
      <div class="nav-links">
        <router-link to="/" class="nav-link">Menu</router-link>
        <router-link to="/admin" class="nav-link admin-link">Admin</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
</script>

<style scoped>
.navbar {
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  color: #ff6b35;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-link {
  text-decoration: none;
  color: #666;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #ff6b35;
}

.admin-link {
  background: #ff6b35;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
}

.admin-link:hover {
  background: #ff5722;
  color: white;
}
</style>