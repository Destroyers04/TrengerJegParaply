import type { WeatherData, Coordinates } from "@/api/types";

// Link to Yr.no Nowcast api docs https://api.met.no/weatherapi/nowcast/2.0/documentation#!/data/get_complete
// Example url:
// https://api.met.no/weatherapi/nowcast/2.0/complete?lat=62.8347&lon=8.1222
const nowcast_api_url = "https://api.met.no/weatherapi/nowcast/2.0/complete";

// Lat and Lon should have max 4 decimals
export const get_weather_measurements = async ({lat, lon}:Coordinates):Promise<WeatherData>=> {
    // My custom header is 
    const response = await fetch(`${nowcast_api_url}?lat=${lat}&lon=${lon}`) 
    return await response.json()
};

// Link to Entur journeyplanner api https://developer.entur.org/pages-journeyplanner-journeyplanner
// Example url:
// https://api.entur.io/journey-planner/v3/graphql
