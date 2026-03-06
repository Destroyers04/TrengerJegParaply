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
  user_input_address: string;
}

export interface GeocoderData {
  features: GeocoderFeature[];
}

export interface GeocoderFeature {
  geometry: {
    // Den første verdien er longtitude mens den andre er langtitude
    coordinates: [number, number];
  };
  properties: {
    id: string;
    label: string;
    county: string;
    category?: string[];
  };
}

export interface JourneyPlannerParam {
  from: {
    coordinates: Coordinates;
  };
  to: {
    coordinates: Coordinates;
  };
  modes: {
    accessMode: string;
    egressMode: string;
    transportModes: {
      transportMode: string;
    };
  };
  numTripPatterns: number;
  dateTime: string;
  walkSpeed: number;
  arriveBy: boolean;
}

export interface JourneyPlannerData {
  data: {
    trip: {
      tripPatterns: TripPattern[];
    };
  };
}

export interface TripPattern {
  expectedStartTime: string;
  expectedEndTime: string;
  duration: number;
  streetDistance: number;
  legs: Leg[];
}

export interface Leg {
  mode: string;
  distance: number;
  duration: number;
  fromPlace: {
    name: string;
  };
  toPlace: {
    name: string;
  };
  line: {
    publicCode: string;
    name: string;
  } | null;
  fromEstimatedCall: {
    quay: {
      name: string;
    };
    expectedDepartureTime: string;
  } | null;
}
