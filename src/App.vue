<template>
  <div id="app">
    <nav-bar />
    <router-view />
  </div>
</template>

<script setup>
import NavBar from '@/components/common/NavBar.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  background: #f5f5f5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

button {
  cursor: pointer;
  border: none;
  outline: none;
  transition: all 0.3s ease;
}

button:active {
  transform: scale(0.98);
}
</style>