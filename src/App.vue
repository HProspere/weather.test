<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainHeader from '@/components/main-header/mainHeader.vue';
import PopularCities from "@/components/popular-cities/popularCities.vue";
</script>

<template>
  <div class="main">
    <div class="layout">
      <main-header />
      <RouterView />
      <popular-cities />
    </div>
  </div>
</template>

<style lang="scss">
  .main {
    min-height: 100vh;
    width: 100%;
    background: colors.$main-gradient;

    .layout {
      height: 100%;
      width: 100%;
      max-width: 1440px;
      margin: 0 auto;
      padding: 40px;
      display: flex;
      flex-direction: column;
    }
  }
</style>
