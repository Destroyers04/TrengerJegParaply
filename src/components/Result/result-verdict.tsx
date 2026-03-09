import type { TripResults } from "@/components/TripForm/trip-form";

export function ResultVerdict({ results }: { results: TripResults | null }) {
  // Null check
  if (!results) return null;

  const entry_from = results.weatherFrom.properties.timeseries[0].data;
  const entry_to = results.weatherTo.properties.timeseries[0].data;

  // Returnerer true hvis det er mye regn, ellers returner false
  const checkRain = () => {
    const precipitation_rate_from =
      entry_from.instant.details.precipitation_rate;
    const precipitation_amount_from =
      entry_from.next_1_hours?.details.precipitation_amount;

    const precipitation_rate_to = entry_to.instant.details.precipitation_rate;
    const precipitation_amount_to =
      entry_to.next_1_hours?.details.precipitation_amount;

    if (precipitation_amount_to === 0.0 || precipitation_amount_from === 0.0) {
      return false;
    }
    // Wikipedia (https://en.wikipedia.org/wiki/Precipitation_types) sier at moderat regn starter på 2.6mm
    if (precipitation_rate_from >= 2.6 || precipitation_rate_to >= 2.6) {
      return true;
    }
    return false;
  };

  // Returnerer true hvis det er mye vind, ellers returner false
  const checkWind = () => {
    const wind_gust_from = entry_from.instant.details.wind_speed_of_gust;
    const wind_gust_to = entry_to.instant.details.wind_speed_of_gust;

    // Vind hastighet er ikke et obligatorisk måling, vi må derfor sjekke
    if (wind_gust_from === undefined || wind_gust_to === undefined)
      return undefined;

    // følger beaufort skalaen (https://no.wikipedia.org/wiki/Beauforts_skala) som sier at paraply blir vanskelig å bruke ved liten kuling (10.8m/s)
    if (wind_gust_from >= 10.8 || wind_gust_to >= 10.8) {
      return true;
    }
    return false;
  };

  const verdict = () => {
    if (!checkRain()) {
      return "Du trenger ikke paraply!";
    }
    if (checkWind() === undefined) {
      return "Paraply anbefales, men vi vet dessverre ikke om det blåser";
    }
    if (!checkWind()) {
      return "Paraply anbefales!";
    }

    return "Vi anbefaler ikke paraply, men vi anbefaler regnjakke!";
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-6 text-xl font-bold">
        <p>{results.fromLabel}</p>
        <p>{"\u2192"}</p>
        <p>{results.toLabel}</p>
      </div>
      <div>{verdict()}</div>
    </div>
  );
}
