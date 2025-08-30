"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaCalendarAlt, FaGasPump } from "react-icons/fa";
import { MdAcUnit, MdGarage, MdPriceCheck } from "react-icons/md";
import Image from "next/image";
import { GiCarSeat, GiGearStick, GiGearStickPattern, GiPriceTag } from "react-icons/gi";

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
        <MdGarage className="w-[32vw] sm:w-[24vw] md:w-[16vw] h-auto" />
        <p className="text-sm sm:text-base md:text-xl text-label font-normal">
          sorry but no info for this car
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="py-12 sm:px-24 md:px-32 lg:px-48 xl:px-64 ">
        <a href="/">
          <FaArrowLeft className="absolute cursor-pointer left-[6vw] text-2xl sm:text-3xl md:text-4xl font-bold duration-200 hover:scale-110 active:scale-110" />
        </a>

        <div className="flex flex-col justify-center items-center">
          <Image
            src={car.image}
            alt="car"
            width={0}
            height={0}
            sizes="100vw"
            className="w-46 h-32 object-cover"
          />
          <h2 className="text-normal text-center font-heading text-xl sm:text-2xl md:text-3xl font-semibold uppercase">
            {car.car}
          </h2>

          <div className="grid grid-cols-1 gap-x-2 self-start px-8">
            <div className="flex gap-1 items-center">
            <FaCalendarAlt className="text-label text-2xl" />
            <p className="text-base">Year Model: {car.year}</p>
          </div>
          <div className="flex gap-1 items-center">
            <GiPriceTag className="text-label text-2xl" />
            <p className="text-base">Starts At: ₱{car.price}</p>
          </div>
          <div className="flex gap-1 items-center">
            <FaGasPump className="text-label text-2xl" />
            <p className="text-base">Fuel: <span className="uppercase">{car.fuel}</span></p>
          </div>
          <div className="flex gap-1 items-center">
            <GiGearStickPattern className="text-label text-2xl" />
            <p className="text-base">Gearbox: <span className="uppercase">{car.transmission}</span></p>
          </div>
          <div className="flex gap-1 items-center">
            <MdAcUnit className="text-label text-2xl" />
            <p className="text-base">AirConditioning: <span className="uppercase">{car.aircon}</span></p>
          </div>
          <div className="flex gap-1 items-center">
            <GiCarSeat className="text-label text-2xl" />
            <p className="text-base">Seat Cap: <span className="uppercase">{car.seat}</span></p>
          </div>
          </div>

        </div>
      </div>
    </div>
  );
}
