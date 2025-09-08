<script setup lang="ts">
import PopularCitiesHeader from '@/components/popular-cities/popular-cities-header/popularCitiesHeader.vue';
import PopularCitiesForecast from '@/components/popular-cities/popular-cities-forecast/popularCitiesForecast.vue';
</script>

<template>
  <div class="popular-cities">
    <popular-cities-header />
    <popular-cities-forecast />
  </div>
</template>

<style lang="scss" scoped>
.popular-cities {
  width: 100%;
  margin-top: 56px;
}
</style>