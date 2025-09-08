import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { CityRecord, ForecastRecord, Weather } from '@/types/forecast.ts';

export const useForecastStore = defineStore(
  'forecastStore',
  () => {
    const weatherList: Weather[] = ['clear', 'partly-cloudy', 'cloudy', 'rainy', 'windy'];
    const citiesList = ref<CityRecord[]>([
      {
        id: '01',
        name: 'Казань',
      },
      {
        id: '02',
        name: 'Краснодар',
      },
      {
        id: '03',
        name: 'Уфа',
      },
      {
        id: '04',
        name: 'Новосибирск',
      },
      {
        id: '05',
        name: 'Красноярск',
      },
      {
        id: '06',
        name: 'Москва',
      },
      {
        id: '07',
        name: 'Тула',
      },
    ]);
    const selectedCity = ref<CityRecord>({
      id: '01',
      name: 'Казань',
      daily: dailyForecast(new Date()),
      weekly: weeklyForecast(new Date()),
    });
    const popularCities = ref<CityRecord[]>([]);

    function fillPopularCities() {
      popularCities.value = [];
      let tempCitiesList = citiesList.value.filter(el => el.id !== selectedCity.value.id);

      for (let i = 0; i < 5; i++) {
        const city = tempCitiesList[Math.floor(Math.random() * tempCitiesList.length)];
        city.daily = dailyForecast(new Date());
        city.weekly = weeklyForecast(new Date());
        popularCities.value.push(city);
        tempCitiesList.splice(tempCitiesList.findIndex(el => el.id === city.id), 1);
      }
    }

    function singleForecast(timestamp: Date):ForecastRecord {
      return {
        timestamp,
        temp: Math.round(Math.random() * 60) - 30,
        wind: Math.round(Math.random() * 25),
        humidity: Math.round(Math.random() * 100),
        weather: weatherList[Math.round(Math.random() * weatherList.length)],
      };
    }

    function dailyForecast(day: Date): ForecastRecord[] {
      return new Array(8)
        .fill(day)
        .map((el, idx) => new Date(el.setHours(idx * 3, 0, 0, 0)))
        .map((el) => singleForecast(el));
    }

    function weeklyForecast(weekStart: Date): ForecastRecord[] {
      return new Array(7)
        .fill(weekStart)
        .map((el, idx) => new Date(el.setHours(12) + (86400000 * idx)))
        .map((el) => singleForecast(el));
    }

    watch(() => selectedCity.value.id,
      () => {
        selectedCity.value.daily = dailyForecast(new Date());
        selectedCity.value.weekly = weeklyForecast(new Date());
        fillPopularCities();
      }
    );

    return {
      citiesList,
      selectedCity,
      popularCities,
      dailyForecast,
      weeklyForecast,
    }
  },
  {
    persist: {
      pick: ['selectedCity'],
      storage: localStorage,
    },
  });
