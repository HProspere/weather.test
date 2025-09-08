import type { Weather } from '@/types/forecast.ts';

export const WEATHER_LABELS: Record<Weather, string> = {
  'clear': 'Ясно',
  'partly-cloudy': 'Переменная облачность',
  'cloudy': 'Облачно',
  'rainy': 'Дождливо',
  'windy': 'Ветрено',
}
