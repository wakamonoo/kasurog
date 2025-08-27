"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Admin() {
  const [driverPreneurs, setDriverPreneurs] = useState([]);
  const [showLegals, setShowLegals] = useState(false);
  const [selectDrivers, setSelectDrivers] = useState(null);

  useEffect(() => {
    const getDriverReg = async () => {
      const res = await fetch(`${BASE_URL}/api/register/regGet`);
      const drivers = await res.json();
      setDriverPreneurs(drivers);
    };

    getDriverReg();
  }, []);

  return (
    <div>
      <div className="py-12 sm:px-24 md:px-32 lg:px-48 xl:px-64 ">
        <a href="/">
          <FaArrowLeft className="absolute cursor-pointer left-[6vw] text-2xl sm:text-3xl md:text-4xl font-bold duration-200 hover:scale-110 active:scale-110" />
        </a>
        <div className="flex justify-center items-center">
          <h1>Konnichiwa, Wakamonoo!</h1>
        </div>
        <div className="flex flex-col justify-center items-center mt-8">
          {driverPreneurs.length === 0 ? (
            <div>no registrants</div>
          ) : (
            driverPreneurs.map((driverPren) => {
              return (
                <button
                  onClick={() => {
                    setSelectDrivers(driverPren);
                    setShowLegals(true);
                  }}
                  key={driverPren.uid}
                  className="flex bg-highlight gap-6 rounded-full items-center cursor-pointer w-fill p-4 mt-8"
                >
                  <h4 className="text-base font-bold">{driverPren.name}</h4>
                  <p className="text-xs text-label">{driverPren.submittedAt}</p>
                </button>
              );
            })
          )}
        </div>
      </div>
      
    </div>
  );
}
