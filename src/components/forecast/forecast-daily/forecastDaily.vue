<script setup lang="ts">
import ForecastHeader from '@/components/forecast/forecast-header/forecastHeader.vue';
import ForecastDailyCurrent from '@/components/forecast/forecast-daily/forecast-daily-current/forecastDailyCurrent.vue';
</script>

<template>
  <forecast-header />
  <forecast-daily-current />
</template>

<style lang="scss" scoped>
  .forecast-daily {
    width: 100%;
    border: 1px solid red;
    padding: 12px;
  }
</style>