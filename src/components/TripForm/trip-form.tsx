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
import { get_bus_stop_data } from "@/api/api";

export function TripForm() {
  const [fra, setFra] = useState("");
  const [til, setTil] = useState("");
  return (
    <div className="w-full max-w-md border-solid border-4 p-8 rounded-md">
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Trenger du paraply? ☂️</FieldLegend>
            <FieldDescription>
              Velg hvor du vil reise fra og til
            </FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel>Fra</FieldLabel>
                <InputField value={fra} setValue={setFra} />
              </Field>
              <Field>
                <FieldLabel>Til</FieldLabel>
                <InputField value={til} setValue={setTil} />
              </Field>
            </FieldGroup>
          </FieldSet>

          <Field orientation="vertical">
            <Button type="submit">Sjekk Nå</Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
