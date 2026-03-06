import { get_bus_stop_data } from "@/api/api";
import type { GeocoderFeature, GeocoderSearchParams } from "@/api/types";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { useEffect, useState } from "react";

interface InputFieldProps {
  name: string;
  required?: boolean;
  value: string;
  setValue: (value: string) => void;
}

export function InputField({ name, required, value, setValue }: InputFieldProps) {
  const [suggestions, setSuggestions] = useState<GeocoderFeature[]>([]);

  const get_suggestions = async ({
    user_input_address,
  }: GeocoderSearchParams) => {
    if (!value) {
      return;
    }
    const data = await get_bus_stop_data({
      user_input_address: user_input_address,
    });
    setSuggestions(data.features);
  };

  useEffect(() => {
    // Vent 300ms etter siste tastetrykk før vi kaller API-et for å redusere unødvendig calls
    const timer = setTimeout(() => {
      get_suggestions({ user_input_address: value });
    }, 300);
    // Avbryt timeren hvis brukeren skriver igjen før 300ms er gått
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <Combobox
      name={name}
      items={suggestions}
      // itemToStringValue serializes the full object for form submission
      itemToStringValue={(suggestion: GeocoderFeature) =>
        JSON.stringify(suggestion)
      }
      itemToStringLabel={(suggestion: GeocoderFeature) =>
        suggestion.properties.label
      }
    >
      <ComboboxInput
        showTrigger={false}
        required={required}
        placeholder="Søk ditt stopp"
        onChange={(e) => setValue(e.target.value)}
      />
      {/* Display Combobox content only if there is a value in the input field */}
      {value ? (
        <ComboboxContent>
          <ComboboxEmpty>Ingen addresser funnet</ComboboxEmpty>
          <ComboboxList className="max-h-1000">
            {(suggestion: GeocoderFeature) => (
              <ComboboxItem key={suggestion.properties.id} value={suggestion}>
                <Item size="xs" className="p-0">
                  <ItemContent>
                    <ItemTitle className="whitespace-nowrap">
                      {suggestion.properties.label}
                    </ItemTitle>
                    <ItemDescription>
                      {suggestion.properties.county}
                    </ItemDescription>
                  </ItemContent>
                </Item>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      ) : (
        <></>
      )}
    </Combobox>
  );
}
