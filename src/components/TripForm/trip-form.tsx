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
  JourneyPlannerParam,
} from "@/api/types";

interface locationProps {
  from: string;
  to: string;
}

export function TripForm() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [, formAction, isPending] = useActionState(submitInputData, null);

  const handleClick = async ({ from, to }: locationProps) => {
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
    console.log(weatherFrom);
    console.log(weatherTo);
    console.log(route_details);
  };

  async function submitInputData(_previousState: null, formData: FormData) {
    try {
      const from = formData.get("from") as string;
      const to = formData.get("to") as string;
      console.log(from, to);
      await handleClick({ from, to });
    } catch (error) {
      return null;
    }
    return null;
  }
  return (
    <div className="w-full max-w-md border-solid border-4 p-8 rounded-md">
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
              {isPending ? "Søker etter ruter" : "Sjekk nå"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
