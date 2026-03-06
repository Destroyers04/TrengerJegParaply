import { useState } from "react";
import { TripForm } from "@/components/TripForm/trip-form";
import { cn } from "@/lib/utils";
function App() {
  const [status, setStatus] = useState<boolean>(false);
  return (
    <div className="relative min-h-screen">
      <div
        className="trip-card border-solid border-4 p-8 rounded-md"
        data-submitted={status}
      >
        <TripForm status={status} setStatus={setStatus} />
      </div>
      <div
        className={cn(
          status
            ? "max-w-screen-xl flex justify-center items-center h-screen pt-8"
            : "hidden",
        )}
      >
        hidden object
      </div>
    </div>
  );
}

export { App };
