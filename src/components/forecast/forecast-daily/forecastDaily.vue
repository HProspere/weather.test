<script setup lang="ts">
import ForecastHeader from '@/components/forecast/forecast-header/forecastHeader.vue';
import ForecastDailyCurrent from '@/components/forecast/forecast-daily/forecast-daily-current/forecastDailyCurrent.vue';
import ForecastDailyPlate from "@/components/forecast/forecast-daily/forecast-daily-plate/forecastDailyPlate.vue";
import { storeToRefs } from 'pinia';
import { useForecastStore } from '@/stores/forecast.ts';

const { selectedCity } = storeToRefs(useForecastStore());
</script>

<template>
  <forecast-header />
  <div class="daily-panel">
    <forecast-daily-current />
    <div class="daily-cast">
      <forecast-daily-plate
        v-for="dayCast in selectedCity.daily"
        :forecast="dayCast"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.daily-panel {
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 1439px) {
    flex-direction: column;
    justify-content: center;
  }

  .daily-cast {
    display: flex;
    flex-direction: column;

    @media only screen and (max-width: 779px) {
      width: 100%;
    }
  }
}
</style>