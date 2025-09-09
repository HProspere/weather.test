<script setup lang="ts">
import { useForecastStore } from '@/stores/forecast.ts';
import { storeToRefs } from 'pinia';
import { type Component, computed, shallowRef, watch } from 'vue';
import { WEATHER_LABELS } from '@/constants/forecast.ts';
import type { ForecastRecord } from '@/types/forecast.ts';

const { selectedCity } = storeToRefs(useForecastStore());

const currentWeather = computed<ForecastRecord>(() => {
  const timestamp = new Date();
  return selectedCity.value.daily.findLast((el: ForecastRecord) => el.timestamp <= timestamp)
    || selectedCity.value.daily[selectedCity.value.daily.length - 1];
})

const actualIcon = shallowRef<Component | null>(null);

async function loadIcon(iconName: string) {
  try {
    const iconModule = await import(`@/svg/${iconName}.svg`);
    actualIcon.value = iconModule.default;
  } catch {
    console.error(`Icon "${iconName}" not found.`);
    actualIcon.value = null;
  }
}

watch(
  () => currentWeather.value.weather,
  (iconName) => {
    if (iconName) {
      loadIcon(iconName);
    }
  },
  { immediate: true },
);
</script>

<template>
  <div class="current-panel">
    <div class="icon">
      <component
        v-if="actualIcon"
        :is="actualIcon"
      />
    </div>

    <div class="temp">{{ currentWeather.temp }}&deg;</div>
    <div class="details">
      <div class="record">{{ WEATHER_LABELS[currentWeather.weather] }}</div>
      <div class="record">Влажность: {{ currentWeather.humidity }}%</div>
      <div class="record">Ветер: {{ currentWeather.wind }} м/с</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.current-panel {
  max-width: 625px;
  display: flex;
  gap: 44px;
  align-items: center;
  justify-content: space-between;
  height: 180px;

  @media only screen and (max-width: 779px) {
    width: 100%;
    gap: 16px;
  }

  .icon {
    height: 125px;
    width: 180px;
    display: flex;
    justify-content: center;

    @media only screen and (max-width: 779px) {
      height: 80px;
      width: 120px;
    }
  }

  .temp {
    @include typo.font-h1;
    @media only screen and (max-width: 779px) {
      font-size: 80px;
    }
  }

  .details {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .record {
      @include typo.font-p3-med;

      @media only screen and (max-width: 779px) {
        font-size: 18px;
      }
    }
  }
}
</style>