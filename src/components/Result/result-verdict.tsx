import type { TripResults } from "@/components/TripForm/trip-form";
import { useEffect } from "react";

export function ResultVerdict({ results }: { results: TripResults | null }) {
  if (!results) return null;
  const entry_from = results.weatherFrom.properties.timeseries[0].data;
  const entry_to = results.weatherTo.properties.timeseries[0].data;

  const checkRain = () => {
    const precipitation_rate_from =
      entry_from.instant.details.precipitation_rate;
    const precipitation_amount_from =
      entry_from.next_1_hours?.details.precipitation_amount;

    const precipitation_rate_to = entry_to.instant.details.precipitation_rate;
    const precipitation_amount_to =
      entry_to.next_1_hours?.details.precipitation_amount;
    entry_to.next_1_hours?.details.precipitation_amount;

    if (precipitation_amount_to === 0.0 || precipitation_amount_from === 0.0) {
      return false;
    }
    // Wikipedia (https://en.wikipedia.org/wiki/Precipitation_types) sier at moderat regn starter på 2.6mm
    if (precipitation_rate_from < 2.6 || precipitation_rate_to < 2.6) {
      return false;
    }
    return true;
  };
  const checkWind = () => {
    const wind_gust_from = entry_from.instant.details.wind_speed_of_gust;
    const wind_gust_to = entry_to.instant.details.wind_speed_of_gust;
    // følger beaufort skalaen (https://no.wikipedia.org/wiki/Beauforts_skala) som sier at paraply blir vanskelig å bruke ved liten kuling (10.8)
  };

  const verdict = () => {
    if (!checkRain()) {
      return "Du trenger ikke paraply i dag!";
    }
  };

  return (
    <div className="max-w-screen-xl flex justify-center items-center h-screen pt-8 border-solid border-4">
      {verdict()}
    </div>
  );
}
