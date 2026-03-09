import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { InputField } from "@/components/TripForm/trip-form-input-field";
import { useActionState, useState } from "react";
import {
  get_route_details_data,
  get_weather_measurements_data,
} from "@/api/api";
import type {
  GeocoderFeature,
  Coordinates,
  WeatherData,
  JourneyPlannerData,
} from "@/api/types";

interface LocationProps {
  from: string;
  to: string;
}

export interface TripResults {
  weatherFrom: WeatherData;
  weatherTo: WeatherData;
  route_details: JourneyPlannerData;
}
interface TripFormProps {
  status: boolean;
  setStatus: (value: boolean) => void;
  setResults: (results: TripResults | null) => void;
}

export function TripForm({ status, setStatus, setResults }: TripFormProps) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [, formAction, isPending] = useActionState(submitInputData, null);

  const handleClick = async ({ from, to }: LocationProps) => {
    const fromLocation = JSON.parse(from) as GeocoderFeature;
    const toLocation = JSON.parse(to) as GeocoderFeature;
    const fromCords: Coordinates = {
      lat: fromLocation.geometry.coordinates[1],
      lon: fromLocation.geometry.coordinates[0],
    };

    const toCords: Coordinates = {
      lat: toLocation.geometry.coordinates[1],
      lon: toLocation.geometry.coordinates[0],
    };
    const currentTime: Date = new Date();

    const [weatherFrom, weatherTo, route_details] = await Promise.all([
      get_weather_measurements_data(fromCords),
      get_weather_measurements_data(toCords),
      get_route_details_data({
        from: { coordinates: fromCords },
        to: { coordinates: toCords },
        dateTime: currentTime.toISOString(),
      }),
    ]);
    setResults({ weatherFrom, weatherTo, route_details });
    setStatus(true);
  };

  async function submitInputData(_previousState: null, formData: FormData) {
    try {
      const from = formData.get("from") as string;
      const to = formData.get("to") as string;
      await handleClick({ from, to });
    } catch (error) {
      return null;
    }
    return null;
  }
  return (
    <form action={formAction}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Trenger du paraply? ☂️</FieldLegend>
          <FieldDescription>Velg hvor du reiser fra og til</FieldDescription>
          <FieldGroup className="gap-3">
            <Field>
              <FieldLabel>Fra</FieldLabel>
              <InputField
                name="from"
                required
                value={from}
                setValue={setFrom}
              />
            </Field>
            <Field>
              <FieldLabel>Til</FieldLabel>
              <InputField name="to" required value={to} setValue={setTo} />
            </Field>
          </FieldGroup>
        </FieldSet>

        <Field orientation="vertical">
          <Button type="submit">
            {isPending
              ? "Søker etter ruter"
              : status
                ? "Søk igjen"
                : "Sjekk nå"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
