<script setup lang="ts">
import PopularCityPlate from "@/components/popular-cities/popullar-city-plate/popularCityPlate.vue";
import { useForecastStore } from "@/stores/forecast.ts";
import { storeToRefs } from "pinia";

const { popularCities } = storeToRefs(useForecastStore());
</script>

<template>
  <div class="popular-forecast">
    <popular-city-plate
      v-for="city in popularCities"
      :city="city"
    />
  </div>
</template>

<style lang="scss" scoped>
.popular-forecast {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>