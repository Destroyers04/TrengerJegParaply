# Devlog — TrengerJegParaply☂️

## Dag 1

### Mål

- Planlegge layout for appen, sette opp enkle wireframes i Figma
- Lese opp på Yr.no API-en og prøve å hente ut data fra den
- Lese opp på Entur Journey Planner API-en og forstå hvilke endepunkter jeg trenger

### Hva jeg gjorde

- Lagde ferdig [designen](https://www.figma.com/design/Xo0pcKjoSD4errhlrv2jE5/TrengerJegParaply?node-id=0-1&t=Ln4QMDXXkBzQ8Z7U-1)
-

### Utfordringer & Løsninger

- De fleste datapunktene jeg er interessert i, er ikke tilgjengelige for fremtiden siden de kun finnes i «Instant»-objektet, som bare gjelder for akkurat nå.
  - "Vurderte å bruke vindpiler for å estimere fremtidig vindretning, men det ble for komplekst for
    dette prosjektet."
  - Bestemte meg for å bare vise paraplyvarselet basert på vindforholdene ved reisens start, noe jeg mener er
    godt nok siden det hjelper brukerne å avgjøre om de trenger paraply før de setter seg på bussen.
- User-Agent header trigget CORS preflight
- MET Norway sitt API støtter ikke CORS preflights som blir trigget av custom headers som `User-Agent`. Dette førte til en 403 feil. Men i deres TOS står det at apper med lavt volum kan bruke enkle cross-origin requests, og at nettleseren automatisk setter `Origin` headeren for identifikasjon. Å fjerne den custom `User-Agent` headeren løste problemet, siden nettleseren håndterer identifikasjon automatisk.

### Tanker

### Nowcast

- Nowcast oppdateres hver 5 minutt
- Apien returnerer GeoJSON formatert data, oppbyggningen finner [her](https://api.met.no/doc/ForecastJSON)
- Tiden er i UTC
- Viktige variabler:
  | Variable | Beskrivelse |
  |---|---|
  | `symbol_code` | Værikon for UI |
  | `precipitation_amount` | Om det regner |
  | `precipitation_rate` | Hvor kraftig nedbøren er |
  | `air_temperature` | Regn eller snø |
  | `wind_speed` | Om vinden er for sterk til paraply |
  | `wind_speed_of_gust` | Om vindkast gjør paraply ubrukelig |
- `precipitation_rate` kan være udefinert, må kunne håndtere det

### Journey Planner v3

- Headers:
  - `Content-Type: application/json`
  - `ET-Client-Name: <company>-<application>`
- Data returneres som GraphQL, må spesifisere hvilke felt jeg trenger
  i spørringen.
- Viktige variabler:
  | Variabel | Beskrivelse |
  | --------------------------------- | --------------------------------------------- |
  | `from` / `to` | Koordinater eller stopp-ID for start og slutt |
  | `legs` | Segmenter av reisen |
  | `legs.mode` | Transport type (BUS, FOOT, etc.) |
  | `legs.fromPlace` / `legs.toPlace` | Koordinater for hvert segment |
  | `expectedStartTime` | Sanntidsjustert avgangstid |
  | `duration` | Reisetid i sekunder |

---

## Dag 2

### Mål

- Skriv en funksjon som henter data fra Journey Planner API-et.

### Hva jeg gjorde

- Implementerte `get_route_details_data` i `api.tsx` som sender GraphQL POST-forespørsel til Entur Journey Planner
- Implementerte `get_bus_stop_data` i `api.tsx` som henter adresseforslag fra Entur Geocoder API
- Opprettet TypeScript-grensesnitt for Journey Planner-data: `JourneyPlannerParam`, `JourneyPlannerData`, `TripPattern`, `Leg`
- Bygde `TripForm` komponenten med Fra/Til-inputfelt og "Sjekk Nå"-knapp
- Bygde `InputField` komponenten med `Combobox` fra shadcn/Base UI for adresseautofullfør
- Koblet `ComboboxInput` til Geocoder API med debouncing (300ms) for å begrense API-kall
- La til rensing av forslagslisten når inputfeltet er tomt

### Utfordringer & Løsninger

- Siden brukere skriver inn navn på stoppesteder i søkefeltet, bruker jeg Geocoder API-en for å finne samsvarende stoppesteder med adresse og koordinater
- Nedtrekkspilen i `ComboboxInput` tømte inputfeltet internt uten å oppdatere React-tilstanden, løste dette ved å skjule knappen med `showTrigger={false}`

---
