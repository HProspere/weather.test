export type Weather = 'clear' | 'partly-cloudy' | 'cloudy' | 'rainy' | 'windy';

export interface ForecastRecord {
  timestamp: Date;
  temp: number;
  wind: number;
  humidity: number;
  weather: Weather;
}

export interface CityRecord {
  id: string;
  name: string;
  daily?: ForecastRecord[];
  weekly?: ForecastRecord[];
}
