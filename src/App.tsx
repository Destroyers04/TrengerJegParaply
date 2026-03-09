import { useState } from "react";
import { TripForm } from "@/components/TripForm/trip-form";
import { ResultBody } from "@/components/Result/result-body";
import type { TripResults } from "@/components/TripForm/trip-form";

function App() {
  const [status, setStatus] = useState<boolean>(false);
  const [results, setResults] = useState<TripResults | null>(null);

  return (
    <div className="relative min-h-screen">
      <div
        className="trip-card border-solid border-4 p-8 rounded-md"
        data-submitted={status}
      >
        <TripForm
          status={status}
          setStatus={setStatus}
          setResults={setResults}
        />
      </div>
      <div>{status && <ResultBody results={results} />}</div>
    </div>
  );
}

export { App };
