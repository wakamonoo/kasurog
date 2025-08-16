"use client";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

export default function Home() {
  const [hideNav, setHideNav] = useState(false);

  return (
    <>
      <div className="flex justify-between p-4 h-screen text-header text-2xl font-header">
        <h1 className="">arqila.</h1>
        <div>
          <button onClick={() => setHideNav((prev) => !prev)}>
            <FaBars className="duration-200 hover:scale-110 active:scale-110 cursor-pointer" />
          </button>
        </div>
      </div>
      {hideNav && (
        <div className="inset-0 fixed backdrop-blur-xs z-50">
          <div className="h-screen shadow-2xl fixed z-50 top-0 right-0 w-[60vw] bg-panel p-4">
            <button onClick={() => setHideNav(false)}>
              <FaTimes className="text-xl text-header duration-200 hover:scale-110 active:scale-110 cursor-pointer" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
