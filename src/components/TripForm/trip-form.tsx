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
import { get_weather_measurements_data } from "@/api/api";
import type { GeocoderFeature, Coordinates } from "@/api/types";

interface locationProps {
  from: string;
  to: string;
}

export function TripForm() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [, formAction, isPending] = useActionState(submitInputData, 0);

  const handleClick = async ({ from, to }: locationProps) => {
    const from_json = JSON.parse(from) as GeocoderFeature;
    const to_json = JSON.parse(to) as GeocoderFeature;

    console.log(from_json, to_json);
    const [weather_data_from, weather_data_to] = await Promise.all([
      get_weather_measurements_data({
        lat: from_json.geometry.coordinates[1],
        lon: from_json.geometry.coordinates[0],
      }),
      get_weather_measurements_data({
        lat: to_json.geometry.coordinates[1],
        lon: to_json.geometry.coordinates[0],
      }),
    ]);
    console.log(weather_data_from);
    console.log(weather_data_to);
  };

  async function submitInputData(previousState, formData) {
    try {
      const from = formData.get("from");
      const to = formData.get("to");
      console.log(from, to);
      await handleClick({ from, to });
    } catch (error) {
      return;
    }
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
