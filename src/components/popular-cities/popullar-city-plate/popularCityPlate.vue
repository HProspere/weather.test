<script setup lang="ts">
import type { CityRecord, ForecastRecord } from '@/types/forecast.ts';
import { type Component, computed, shallowRef, watch } from 'vue';
import { WEATHER_LABELS } from "@/constants/forecast.ts";

const { city } = defineProps<{ city: CityRecord }>();
const actualIcon = shallowRef<Component | null>(null);

const actualWeather = computed<ForecastRecord>(() => {
  const timestamp = new Date();
  return city.daily.findLast((el: ForecastRecord) => el.timestamp <= timestamp)
    || city.daily[city.daily.length - 1];
})

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
  () => actualWeather.value.weather,
  (iconName) => {
    if (iconName) {
      loadIcon(iconName);
    }
  },
  { immediate: true },
);
</script>

<template>
  <div class="city-plate">
    <div class="head">
      <div class="city">{{ city.name }}</div>
      <div class="weather">{{ WEATHER_LABELS[actualWeather.weather] }}</div>
    </div>
    <div class="content">
      <component
        class="weather-icon"
        v-if="actualIcon"
        :is="actualIcon"
      />
      <div class="temp">{{ actualWeather.temp }}&deg;</div>
      <div class="humidity">Влажность: {{ actualWeather.humidity }}%</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.city-plate {
  padding: 25px 26px;
  border-radius: 8px;
  width: 242px;
  height: 303px;
  background: colors.$base-white-20;
  border: 1px solid colors.$base-white-20;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .head {
    div {
      text-align: center;
    }

    .city {
      @include typo.font-p2-med;
    }

    .weather {
      margin-top: 8px;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;

    .weather-icon {
      height: 42px;
    }

    .temp {
      @include typo.font-h3;
    }

    .humidity {
      @include typo.base-font;
    }
  }
}
</style>