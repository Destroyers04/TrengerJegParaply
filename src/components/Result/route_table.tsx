import type { TripResults } from "@/components/TripForm/trip-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Leg } from "@/api/types";

function format_time(iso: string) {
  const date = new Date(iso);
  const day = date.toLocaleDateString("no-NO", {
    month: "short",
    day: "numeric",
  });
  const time = date.toLocaleTimeString("no-NO", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return (
    <span className="flex flex-col">
      <span>{time}</span>
      <span className="text-muted-foreground">{day}</span>
    </span>
  );
}

function transport_mode(leg: Leg) {
  if (leg.line)
    return (
      <span className="flex flex-col">
        <span>{leg.line.publicCode}</span>
        <span className="text-muted-foreground">{leg.line.name}</span>
      </span>
    );
  return leg.mode === "foot" ? "Gå" : leg.mode;
}

export function RouteTable({ results }: { results: TripResults | null }) {
  if (!results) return null;
  const trip_pattern = results.route_details.data.trip.tripPatterns[0];

  // Use the last bus to find out when the user will arrive at a stop
  function find_walk_leg_time(index: number) {
    try {
      const passed_duration = trip_pattern.legs[index - 1].duration;
      const arrival_time =
        trip_pattern.legs[index - 1].fromEstimatedCall?.expectedDepartureTime;
      if (!arrival_time) return "Unable to fetch time";
      return new Date(
        new Date(arrival_time).getTime() + passed_duration * 1000,
      ).toISOString();
    } catch {
      return trip_pattern.expectedStartTime;
    }
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tid</TableHead>
            <TableHead>Fra</TableHead>
            <TableHead>Til</TableHead>
            <TableHead>Transport</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trip_pattern.legs.map((leg, i) => (
            <TableRow key={i}>
              <TableCell>
                {format_time(
                  leg.fromEstimatedCall?.expectedDepartureTime ??
                    find_walk_leg_time(i),
                )}
              </TableCell>
              <TableCell>
                {i === 0 ? results.fromLabel : leg.fromPlace.name}
              </TableCell>
              <TableCell>
                {i === trip_pattern.legs.length - 1
                  ? results.toLabel
                  : leg.toPlace.name}
              </TableCell>
              <TableCell>{transport_mode(leg)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
