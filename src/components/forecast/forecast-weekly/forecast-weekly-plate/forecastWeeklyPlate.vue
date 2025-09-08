<script setup lang="ts">
import type { ForecastRecord } from '@/types/forecast.ts';
import { type Component, computed, shallowRef, watch } from 'vue';

const { day } = defineProps<{ day: ForecastRecord }>();
const actualIcon = shallowRef<Component | null>(null);

const weekDay = computed(() => new Intl.DateTimeFormat(
  'ru-RU',
  {
    weekday: 'long',
  }).format(day.timestamp)
)

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
  () => day.weather,
  (iconName) => {
    if (iconName) {
      loadIcon(iconName);
    }
  },
  { immediate: true },
);
</script>

<template>
  <div class="weekly-plate">
    <div class="week-day">{{ weekDay }}</div>
    <div class="icon-frame">
      <component
        class="weather-icon"
        v-if="actualIcon"
        :is="actualIcon"
      />
    </div>
    <div class="temp">{{ day.temp }}&deg;</div>
  </div>
</template>

<style lang="scss" scoped>
.weekly-plate {
  width: 122px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  .week-day {
    @include typo.font-p1-reg;
  }

  .icon-frame {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;

    .weather-icon {
      height: 42px;
    }
  }
}
</style>