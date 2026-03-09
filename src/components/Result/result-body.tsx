import { ResultVerdict } from "@/components/Result/result-verdict";
import { RouteTable } from "@/components/Result/route_table";
import type { TripResults } from "@/components/TripForm/trip-form";

export function ResultBody({ results }: { results: TripResults | null }) {
  return (
    <div className=" flex flex-col justify-center items-center gap-12">
      <ResultVerdict results={results} />
      <RouteTable results={results} />
    </div>
  );
}
