export interface PropertyWeatherCIty  {
  coord?: {
    lon?: any,
    lat?: any
  },
  weather?: [
    {
      id?: any,
      main?: any,
      description?: any,
      icon?: string
    }
  ],
  base?: any,
  main?: {
    temp?: any,
    feels_like?: any,
    temp_min?: any,
    temp_max?: any,
    pressure?: any,
    humidity?: any
  },
  wind?: {
    speed?: any,
    deg?: any
  },
  clouds?: {
    all?: any
  },
  dt?: any,
  sys?: {
    type?: any,
    id?: any,
    message?: any,
    country?: any,
    sunrise?: any
    sunset?: any
  },
  timezone?: any,
  id?: any,
  name?: any,
  cod?: any
}
