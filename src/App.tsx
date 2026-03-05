import {
  get_bus_stop_data,
  get_route_details_data,
  get_weather_measurements_data,
} from "@/api/api";
import { useEffect } from "react";
import { TripForm } from "@/components/TripForm/trip-form";

function App() {
/*   useEffect(() => {
    get_weather_measurements_data({ lat: 62.5, lon: 8.111 }).then((data) =>
      console.log(data),
    );
    get_bus_stop_data({
      user_input_address: "rødstrandvegen 132, Molde",
    }).then((data) => console.log(data));
  }, []); */
  return (
    <div className="max-w-screen-xl mx-auto mt-8 flex justify-center">
      <TripForm />
    </div>
  );
}

export { App };
