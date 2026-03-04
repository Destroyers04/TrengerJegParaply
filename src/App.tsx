import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { get_weather_measurements } from "@/api/api";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    get_weather_measurements({ lat: 62.5, lon: 8.111 })
      .then(data => console.log(data))
  }, [])
  return (
    <>
      
    </>
  );
}

export { App };
