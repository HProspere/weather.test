<script setup lang="ts">
import { useForecastStore } from '@/stores/forecast.ts';
import { storeToRefs } from 'pinia';
import { computed } from "vue";

const forecastStore = useForecastStore();
const { selectedCity } = storeToRefs(forecastStore);

const dateText = computed(() => new Intl.DateTimeFormat(
  'ru-RU',
  {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(selectedCity.value.daily?.[0].timestamp)
)
</script>

<template>
  <div class="forecast-header">
    <div class="city-name">Погода в городе {{selectedCity.name}}</div>
    <div class="date-text">{{dateText}}</div>
  </div>
</template>

<style lang="scss" scoped>
.forecast-header {
  display: flex;
  flex-direction: column;
  gap: 12px;

  .city-name {
    @include typo.font-h4;
  }

  .date-text {
    @include typo.font-p1-med;
    color: colors.$font-sub-caption;
  }
}
</style>