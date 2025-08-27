"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Admin() {
  const [driverPreneurs, setDriverPreneurs] = useState([]);

  useEffect(() => {
    const getDriverReg = async () => {
      const res = await fetch(`${BASE_URL}/api/register/regGet`);
      const drivers = await res.json();
      setDriverPreneurs(drivers);
    };

    getDriverReg();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      {driverPreneurs.length === 0 ? (
        <div>no registrants</div>
      ) : (
        driverPreneurs.map((driverPren) => {
          return (
            <div key={driverPren.uid} className="flex flex-col gap-2 justify-center items-center">
              {driverPren.name}
              <Image
                src={driverPren.orcr}
                alt="orcr"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-48 object-cover"
              />
              <Image
                src={driverPren.license}
                alt="license"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-48 object-cover"
              />
            </div>
          );
        })
      )}
    </div>
  );
}
