import { MdClose } from "react-icons/md";
import { useState, useEffect, useRef } from "react";

export default function DriverApp({ onExit }) {
  const divRef = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (divRef.current && !divRef.current.contains(e.target)) {
        onExit();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  return (
    <div
      ref={divRef}
      className="bg-panel w-fill p-4 flex justify-center absolute rounded shadow-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <div className="absolute top-4 left-4">
        <button onClick={onExit}>
          <MdClose />
        </button>
      </div>
      <div className="flex flex-col justify-center gap-4 mt-8">
        <div>
          <p className="">kindly upload your driver's license:</p>
          <input
            type="file"
            className="bg-second font-normal text-sm w-[80vw] p-2"
          />
        </div>
        <div>
          <p>kindly upload your vehicle's or/cr:</p>
          <input
            type="file"
            className="bg-second font-normal text-sm w-[80vw] p-2"
          />
        </div>
        <button className="text-normal font-normal bg-highlight p-2 rounded">apply now</button>
      </div>
    </div>
  );
}
