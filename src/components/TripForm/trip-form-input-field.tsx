"use client";

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
  value: string;
  setValue: (value: string) => void;
}

export function InputField({ value, setValue }: InputFieldProps) {
  const [suggestions, setSuggestions] = useState<GeocoderFeature[]>([]);

  const get_suggestions = async ({
    user_input_address,
  }: GeocoderSearchParams) => {
    const data = await get_bus_stop_data({
      user_input_address: user_input_address,
    });
    setSuggestions(data.features);
    console.log("Get suggestions triggered");
  };

  useEffect(() => {
    if (!value) {
      // Tøm forslag når input er tomt
      setSuggestions([]);
      return;
    }
    // Vent 300ms etter siste tastetrykk før vi kaller API-et
    const timer = setTimeout(() => {
      get_suggestions({ user_input_address: value });
    }, 300);
    // Avbryt timeren hvis brukeren skriver igjen før 300ms er gått
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <Combobox
      items={suggestions}
      itemToStringValue={({ properties: suggestion }: GeocoderFeature) =>
        suggestion.label
      }
    >
      <ComboboxInput
        showTrigger={false}
        placeholder="Søk ditt stopp"
        onChange={(e) => setValue(e.target.value)}
      />
      <ComboboxContent>
        <ComboboxEmpty>Ingen addresser funnet</ComboboxEmpty>
        <ComboboxList className="max-h-1000">
          {({ properties: suggestion }: GeocoderFeature) => (
            <ComboboxItem key={suggestion.stop_id} value={suggestion.label}>
              <Item size="xs" className="p-0">
                <ItemContent>
                  <ItemTitle className="whitespace-nowrap">
                    {suggestion.label}
                  </ItemTitle>
                  <ItemDescription>{suggestion.county}</ItemDescription>
                </ItemContent>
              </Item>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
