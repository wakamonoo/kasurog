"use client";
import Image from "next/image";
import MessageOwner from "@/components/message";
import { useEffect, useState } from "react";
import { FaBoxOpen, FaGasPump } from "react-icons/fa";
import { GiGearStickPattern } from "react-icons/gi";
import { MdAcUnit } from "react-icons/md";

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
    <div className="p-12 sm:px-24 md:px-32 lg:px-48 xl:px-64 mt-16">
      <div className="flex justify-center mb-16">
        <div className="flex flex-col">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-center leading-5 sm:leading-11 md:leading-17">
            the cars
          </h1>
          <p className="text-normal text-base sm:text-xl text-center md:text-2xl font-normal">
            — find the right ride
          </p>
        </div>
      </div>

      {/* ———————————————————————————————————— cars card ——— */}
      <div className="flex flex-wrap justify-center gap-4">
        {carInfo.length === 0 ? (
          <div className="flex flex-col justify-center items-center">
            <FaBoxOpen className="w-[32vw] h-auto" />
            <p className="text-sm text-label font-normal">
              nothing to display yet
            </p>
          </div>
        ) : (
          carInfo.map((car) => {
            return (
              <div
                key={car.carid}
                className="flex flex-col p-4 py-8 shadow-2xl rounded bg-panel relative w-[300px] sm:w-[350px] md:w-[270px] lg:w-[330px] h-auto"
              >
                <div>
                  <Image
                    src={car.image}
                    alt="car"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-48 object-cover rounded"
                  />
                  <h2 className="text-header text-center font-heading text-base sm:text-xl md:text-2xl mt-4 font-semibold uppercase">
                    {car.car}
                  </h2>
                  <div className="flex justify-center">
                    <div className="text-2xl sm:text-3xl md:text-4xl flex flex-col items-left p-4 gap-2 text-header justify-center">
                      <div className="flex items-center gap-2">
                        <FaGasPump />
                        <p className="text-normal text-sm sm:text-base md:text-xl font-normal uppercase">
                          {car.fuel}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <GiGearStickPattern />
                        <p className="text-normal text-sm sm:text-base md:text-xl font-normal uppercase">
                          {car.transmission}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <MdAcUnit />
                        <p className="text-normal text-sm sm:text-base md:text-xl font-normal uppercase">
                          {car.aircon}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-normal text-sm sm:text-base md:text-xl font-normal">
                      starting at
                    </p>
                    <p className="text-normal text-sm sm:text-base md:text-xl">
                      <span className="text-base sm:text-xl md:text-2xl font-semibold">
                        {car.price}
                      </span>{" "}
                      per day
                    </p>
                  </div>
                  <div className="flex flex-col w-full justify-center items-center gap-4 mt-4">
                    <button className="px-4 py-2 rounded shadow-2xl bg-second w-full duration-150 hover:scale-105 hover:bg-highlight-hover active:scale-105 active:bg-highlight-hover cursor-pointer">
                      <p className="font-normal text-normal text-base sm:text-xl md:text-2xl">
                        see full details
                      </p>
                    </button>
                    <MessageOwner />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
