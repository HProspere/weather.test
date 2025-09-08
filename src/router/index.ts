import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: () => ({ name: 'dailyForecast' }),
    },
    {
      path: '/daily',
      name: 'dailyForecast',
      component: () => import('@/components/forecast/forecast-daily/forecastDaily.vue'),
      meta: { isRoot: true, title: 'Главная' },
    },
    {
      path: '/weekly',
      name: `weeklyForecast`,
      component: () => import('@/components/forecast/forecast-weekly/forecastWeekly.vue'),
      meta: { isRoot: true, title: 'Погода на неделю' },
    },
    {
      path: '/:data(.*)',
      name: 'NotFound',
      redirect: () => ({ name: 'dailyForecast' }),
    },
  ],
})

export default router;
