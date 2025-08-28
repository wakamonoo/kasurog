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

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/users/driverReg`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          uid: selectDrivers.uid,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        Swal.fire({
          title: "Congrats",
          text: "You are now a DriverPreneur",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        setShowLegals(false);
      } else {
        Swal.fire({
          title: "Error",
          text: data.error || "Process Failed",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Failed",
        text: "Server Failed Try Again Later",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

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

      {showLegals && selectDrivers && (
        <div className="fixed w-full inset-0 backdrop-blur-xs z-[70] flex items-center justify-center">
          <div className="relative bg-panel w-[350px] sm:w-[400px] md:w-[450px] lg:w-[500px] xl:w-[550px] h-3/4 rounded-2xl p-6">
            <MdClose
              onClick={() => setShowLegals(false)}
              className="absolute cursor-pointer right-4 top-4 text-2xl sm:text-3xl md:text-4xl font-bold duration-200 hover:scale-110 active:scale-110"
            />
            <div className="mt-[6vh] flex flex-col h-[calc(100%-6vh-2rem)] gap-4 overflow-y-auto pr-2">
              <p>or/cr:</p>
              <Image
                src={selectDrivers.orcr}
                alt="orcr"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-full object-cover"
              />

              <p>driver's license</p>
              <Image
                src={selectDrivers.license}
                alt="license"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-full object-cover"
              />

              <button
                onClick={handleSubmit}
                className="bg-highlight group duration-200 cursor-pointer hover:bg-[var(--color-secondary)] p-4 w-fit rounded-full"
              >
                <p className="text-second duration-200 group-hover:text-[var(--color-highlight)] text-xl sm:text-2xl md:text-3xl">
                  approve application
                </p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
