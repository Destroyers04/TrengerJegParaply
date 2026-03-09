import type { TripResults } from "@/components/TripForm/trip-form";
import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

export function ProgressBar({ results }: { results: TripResults | null }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!results) return;
    const route_entry = results.route_details.data.trip.tripPatterns[0];

    const calculate_remaining_trip = () => {
      const current_time = new Date().getTime();
      const route_start_time = new Date(
        route_entry.expectedStartTime,
      ).getTime();
      const route_end_time = new Date(route_entry.expectedEndTime).getTime();

      const total = route_end_time - route_start_time;
      const elapsed = current_time - route_start_time;
      console.log(progress);
      setProgress(Math.min((elapsed / total) * 100, 100));
    };

    const interval = setInterval(calculate_remaining_trip, 1000);
    return () => clearInterval(interval);
  }, [results]);

  if (!results) return null;

  return (
    <Field className="w-256 max-w-sm">
      <FieldLabel htmlFor="progress-upload">
        <span>Upload progress</span>
        <span className="ml-auto">66%</span>
      </FieldLabel>
      <Progress value={progress} id="progress-upload" />
    </Field>
  );
}
