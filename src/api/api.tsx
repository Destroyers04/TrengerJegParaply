import type {
  WeatherData,
  Coordinates,
  GeocoderSearchParams,
  GeocoderData,
  JourneyPlannerData,
  JourneyPlannerParam,
} from "@/api/types";

// Lenke til Yr.no Nowcast api-dokumentasjon https://api.met.no/weatherapi/nowcast/2.0/documentation#!/data/get_complete
// Eksempel-URL:
// https://api.met.no/weatherapi/nowcast/2.0/complete?lat=62.8347&lon=8.1222
const nowcast_api_base_url =
  "https://api.met.no/weatherapi/nowcast/2.0/complete";

// Lat og Lon skal ha maks 4 desimaler
export const get_weather_measurements_data = async ({
  lat,
  lon,
}: Coordinates): Promise<WeatherData> => {
  // Jeg bruker ikke custom header fordi det utløser et CORS feil, skal gå fint så lenge appen er lavvolum
  const response = await fetch(`${nowcast_api_base_url}?lat=${lat}&lon=${lon}`);
  return await response.json();
};

// Link to Entur journeyplanner api  docs https://developer.entur.org/pages-journeyplanner-journeyplanner
// Example url:
// https://api.entur.io/journey-planner/v3/graphql
const journeyplanner_api_base_url =
  "https://api.entur.io/journey-planner/v3/graphql";

export const get_route_details_data = async ({
  from,
  to,
  dateTime,
}: JourneyPlannerParam): Promise<JourneyPlannerData> => {
  const response = await fetch(journeyplanner_api_base_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ET-Client-Name": "aaron-trenger-jeg-paraply",
    },
    body: JSON.stringify({
      query: `{
        trip(
          from: { coordinates: {latitude: ${from.coordinates.lat}, longitude: ${from.coordinates.lon}}}
          to: {coordinates: {latitude: ${to.coordinates.lat}, longitude: ${to.coordinates.lon}}}
          modes: {accessMode: foot, egressMode: foot, transportModes: {transportMode: bus}}
          numTripPatterns: 1
          dateTime: "${dateTime}"
          walkSpeed: 1.3
          arriveBy: false
        ) {
          tripPatterns {
            expectedStartTime
            expectedEndTime
            duration
            streetDistance
            legs {
              mode
              distance
              duration
              fromPlace { name }
              toPlace { name }
              line { publicCode name }
              fromEstimatedCall {
                quay { name }
                expectedDepartureTime
              }
            }
          }
        }
      }`,
    }),
  });
  return await response.json();
};

// Link til Geocoder Api docs https://developer.entur.org/pages-geocoder-api
// Example url:
//https://api.entur.io/geocoder/v1/autocomplete?text=Eidsvåg, bergen
const geocoder_api_base_url = "https://api.entur.io/geocoder/v1/autocomplete";

export const get_bus_stop_data = async ({
  user_input_address,
}: GeocoderSearchParams): Promise<GeocoderData> => {
  const response = await fetch(
    `${geocoder_api_base_url}?text=${user_input_address}&size=5&lang=no&boundary.country=NOR`,
  );
  return await response.json();
};
