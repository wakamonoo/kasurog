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
      className="relative bg-panel w-[350px] sm:w-[400px] md:w-[450px] h-[400px] sm:h-[450px] md:h-[500px] rounded-2xl p-6"
    >
      <div className="absolute cursor-pointer top-4 right-4 text-2xl sm:text-3xl md:text-4xl font-bold duration-200 hover:scale-110 active:scale-110">
        <button onClick={onExit}>
          <MdClose />
        </button>
      </div>
      <div className="mt-[6vh] flex flex-col h-[calc(100%-6vh-2rem)] gap-4 overflow-y-auto pr-2">
        <label className="text-gray-500 font-normal text-base sm:text-xl md:text-2xl">
          Upload OR/CR:
        </label>
        <input
          type="file"
          className="bg-second font-normal text-base sm:text-xl md:text-2xl w-ful p-3 rounded text-gray-500"
        />
        <label className="text-gray-500 font-normal text-base sm:text-xl md:text-2xl">
          Upload Driver's License:
        </label>
        <input
          type="file"
          className="bg-second font-normal text-base sm:text-xl md:text-2xl w-ful p-3 rounded text-gray-500"
        />
      </div>
    </div>
  );
}
