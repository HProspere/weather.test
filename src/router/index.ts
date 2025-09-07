import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: () => ({ path: '/daily' }),
    },
    {
      path: '/daily',
      name: 'dailyForecast',
      component: () => import('../components/forecast/forecast-daily/forecastDaily.vue'),
    },
    {
      path: '/weekly',
      name: 'weeklyForecast',
      component: () => import('../components/forecast/forecast-weekly/forecastWeekly.vue'),
    },
  ],
})

export default router
