<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainHeader from '@/components/main-header/mainHeader.vue';
import PopularCities from "@/components/popular-cities/popularCities.vue";
</script>

<template>
  <main-header />

  <RouterView />

  <popular-cities />
</template>

<style scoped>

</style>
