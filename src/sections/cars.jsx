"use client";
import Image from "next/image";
import Starrex from "../assets/starrex.jpg";
import MessageOwner from "@/components/message";
import { useEffect, useState } from "react";

export default function Cars() {
  const [carInfo, setCarInfo] = useState([]);
  useEffect(() => {
    const getCarinfo = async () => {
      const res = await fetch("http://localhost:4000/api/cars/carsDisplay");
      const carInf = await res.json();
      setCarInfo(carInf);
    };

    getCarinfo();
  }, []);

  return (
    <div className="p-12 mt-16">
      <div className="flex justify-center mb-16">
        <div className="flex flex-col leading-3">
          <h1 className="text-4xl font-bold text-center">the cars</h1>
          <p className="font-normal text-normal text-center">
            — find the right ride
          </p>
        </div>
      </div>

      {/* ———————————————————————————————————— cars card ——— */}
      <div className="flex flex-col gap-4">
        {carInfo.map((car) => {
          return (
            <div
              key={car.carid}
              className="flex flex-col p-4 shadow-2xl rounded bg-panel"
            >
              <p className="absolute bg-highlight px-6 p-2 text-base font-heading -skew-x-12 right-10 mt-1 shadow-2xl uppercase">
                {car.fuel}
              </p>
              <div>
                <Image src={car.image} alt="car" width={0} height={0} sizes="100vw" style={{width: "100%", height: "auto"}} />
                <h2 className="text-header text-center font-heading text-base mt-4 font-semibold uppercase">
                  {car.car}
                </h2>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center justify-center gap-2">
                  <p className="text-normal text-sm font-normal">starting at</p>
                  <p className="font-semibold text-normal text-base">
                    <span>{car.price}</span> per day
                  </p>
                </div>
                <div className="flex justify-center items-center gap-2 mt-4">
                  <button className="px-4 py-2 rounded shadow-2xl bg-second">
                    <p className="font-normal text-normal">Details</p>
                  </button>
                  <MessageOwner />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
