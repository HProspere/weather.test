<script setup lang="ts">
import ForecastHeader from '@/components/forecast/forecast-header/forecastHeader.vue';
import ForecastWeeklyPlate from '@/components/forecast/forecast-weekly/forecast-weekly-plate/forecastWeeklyPlate.vue';
import { useForecastStore } from '@/stores/forecast.ts';
import { storeToRefs } from 'pinia';

const { selectedCity } = storeToRefs(useForecastStore());
</script>

<template>
  <forecast-header />
  <div class="weekly-panel">
    <forecast-weekly-plate
      v-for="day in selectedCity.weekly"
      :day="day"
    />
  </div>
</template>

<style lang="scss" scoped>
.weekly-panel {
  width: 100%;
  display: flex;
  gap: 20px;
  justify-content: flex-start;
  height: 78px;

  @media only screen and (max-width: 779px) {
    flex-direction: column;
    width: 100%;
    height: auto;
  }
}
</style>