<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useForecastStore } from '@/stores/forecast.ts';

const router = useRouter();
const forecastStore = useForecastStore();
const { citiesList, selectedCity, popularCities } = storeToRefs(forecastStore);

const routerTabs = router.getRoutes()
  .filter((path) => !!path.meta.isRoot)
  .map((el) => ({ title: el.meta.title, path: el.path }));

const activeRoute = computed(() => `/${router.currentRoute.value.fullPath.split('/').slice(-1)}`);
</script>

<template>
  <div class="main-header">
    <div class="tabs">
      <div
        v-for="tab in routerTabs"
        class="chapter-tab"
        :class="{ active: tab.path === activeRoute }"
        @click="router.push(tab.path)"
      >
        {{tab.title}}
      </div>
    </div>

    <select
      name="cities"
      id="cities-selector"
      style="color: gray"
      v-model="selectedCity"
    >
      <option
        v-for="city in citiesList"
        :value="city"
        style="color: blue"
      >
        {{ city.name }}
      </option>
    </select>
  </div>
</template>

<style lang="scss" scoped>

.main-header {
  width: 100%;
  display: flex;
  justify-content: space-between;

  .tabs {
    display: flex;

    .chapter-tab {
      @include typo.font-p4-med;
      padding: 10px 16px;
      border-right: 1px solid colors.$base-white-10;
      cursor: pointer;
      user-select: none;
      background: colors.$base-white-10;

      &:not(.active) {
        color: colors.$font-dimmed-color;
      }

      &:first-child {
        border-radius: 8px 0 0 8px;
      }

      &:last-child {
        border-radius: 0 8px 8px 0;
        border: none;
      }

      &:hover {
        background: colors.$base-white-20;
      }
    }
  }
}
</style>