export interface WeatherData {
  properties: {
    meta: {
      updated_at: string;
      units: {
        air_temperature: string;
        precipitation_amount: string;
        precipitation_rate: string;
        wind_speed: string;
        wind_speed_of_gust: string;
      };
    };

    timeseries: WeatherTimeEntry[];
  };
}

export interface WeatherTimeEntry {
  time: string;
  data: {
    instant: {
      details: {
        air_temperature?: number;
        precipitation_rate: number;
        wind_speed?: number;
        wind_speed_of_gust?: number;
      };
    };
    next_1_hours?: {
      summary: {
        symbol_code: string;
      };
      details: {
        precipitation_amount: number;
      };
    };
  };
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface GeocoderSearchParams {
  user_input: string;
  layers: string;
}
