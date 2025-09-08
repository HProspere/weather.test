<script setup lang="ts">
import type { ForecastRecord } from '@/types/forecast.ts';
import { type Component, shallowRef, watch } from "vue";
import { WEATHER_LABELS } from "@/constants/forecast.ts";

const { forecast } = defineProps<{ forecast: ForecastRecord }>();
const actualIcon = shallowRef<Component | null>(null);

const timeFormatter = new Intl.DateTimeFormat(
  'ru-RU',
  {
    hour: 'numeric',
    minute: 'numeric',
  });

function dayTime(timestamp: Date) {
  const hours = timestamp.getHours();
  if (hours < 6) {
    return 'Ночь';
  } else if (hours < 12) {
    return 'Утро';
  } else if (hours < 18) {
    return 'День';
  }
  return 'Вечер';
}

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
  () => forecast.weather,
  (iconName) => {
    if (iconName) {
      loadIcon(iconName);
    }
  },
  { immediate: true },
);
</script>

<template>
  <div class="plate">
    <div class="time-plate">
      <div class="time">{{ timeFormatter.format(forecast.timestamp) }}</div>
      <div class="time">{{ dayTime(forecast.timestamp) }}</div>
    </div>
    <div class="temp">{{ forecast.temp }}&deg;</div>
    <component
      class="weather-icon"
      v-if="actualIcon"
      :is="actualIcon"
    />
    <div class="weather-label">
      {{ WEATHER_LABELS[forecast.weather] }}
    </div>
    <div class="wind">{{ forecast.wind }} м/с</div>
    <div class="humidity">{{ forecast.humidity }}%</div>
  </div>
</template>

<style lang="scss" scoped>
.plate {
  width: 648px;
  height: 78px;
  display: grid;
  grid-column-gap: 10px;
  grid-template-columns: 18fr 23fr 11fr 21fr 13fr 14fr;
  align-items: center;
  justify-items: center;
  border-bottom: 1px solid colors.$base-white-10;

  .time-plate {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    justify-content: center;

    .time {
      @include typo.font-p1-reg;
    }
  }

  .temp {
    @include typo.font-h3;
  }

  .weather-icon {
    height: 44px;
  }

  .weather-label {
    @include typo.font-p1-reg;
    justify-self: start;
  }
}
</style>