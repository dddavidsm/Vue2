<template>
  <NavBar />
  <main>
    <router-view />
  </main>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
</script>

<style>
body {
  background-color: #f8f9fa;
}
main {
  padding-top: 1rem;
  padding-bottom: 3rem;
}
</style>
