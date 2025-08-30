"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdGarage } from "react-icons/md";



const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://arqila.onrender.com"
    : "http://localhost:4000";

export default function CarPage() {
  const { carid } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const carFetch = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/cars/carsDisplay/${carid}`);
        const data = await res.json();
        setCar(data);
      } catch (err) {
        console.error(err);
      }
    };
    carFetch();
  }, [carid]);

  if (!car) {
    return (
      <div className="flex flex-col left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <MdGarage  className="w-[32vw] sm:w-[24vw] md:w-[16vw] h-auto" />
        <p className="text-sm sm:text-base md:text-xl text-label font-normal">
          sorry but no info for this car
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>{car.car}</h1>
      {car.price}
    </div>
  );
}
