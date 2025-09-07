<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainHeader from '@/components/main-header/mainHeader.vue';
import PopularCities from "@/components/popular-cities/popularCities.vue";
</script>

<template>
  <header>
    <main-header/>
  </header>

  <main>
    <RouterView />
  </main>

  <popular-cities />
</template>

<style scoped>

</style>
