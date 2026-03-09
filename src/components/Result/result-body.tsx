import { ResultVerdict } from "@/components/Result/result-verdict";
import { ProgressBar } from "@/components/Result/progressbar";
import type { TripResults } from "@/components/TripForm/trip-form";

export function ResultBody({ results }: { results: TripResults | null }) {
  return (
    <div className="max-w-screen-xl mx-auto flex flex-col justify-center items-center h-screen pt-8 gap-12">
      <ResultVerdict results={results} />
      <ProgressBar results={results} />
    </div>
  );
}
