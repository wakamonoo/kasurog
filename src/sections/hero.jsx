"use client";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import CarHero from "../assets/heroCar.png";
import GetStarted from "@/components/ctaOne";

export default function Hero() {
  const [hideNav, setHideNav] = useState(false);
  const navRef = useRef(null);

  {
    /* ———————————————————————————————————— outside click nav ——— */
  }
  useEffect(() => {
    function outNav(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setHideNav(false);
      }
    }
    document.addEventListener("pointerdown", outNav);
    return () => {
      document.removeEventListener("pointerdown", outNav);
    };
  }, []);

  return (
    <div className="h-screen bg-gradient-to-b from-indigo-950">
      <div className="flex justify-between p-4 text-highlight text-2xl font-header">
        <a href="/">
          <h1 className="font-medium">arqila.</h1>
        </a>
        <div>
          <button onClick={() => setHideNav((prev) => !prev)}>
            <FaBars className="duration-200 hover:scale-110 active:scale-110 cursor-pointer" />
          </button>
        </div>
      </div>

      {hideNav && (
        <div className="contains">
          <div className="inset-0 fixed backdrop-blur-xs pointer-events-none z-50"></div>
          <div
            ref={navRef}
            className="h-screen shadow-2xl fixed z-50 top-0 right-0 w-[60vw] bg-highlight p-4"
          >
            <button onClick={() => setHideNav(false)}>
              <FaTimes className="text-xl text-header duration-200 hover:scale-110 active:scale-110 cursor-pointer" />
            </button>
            <div className="flex flex-col p-4 gap-2 font-normal text-normal text-base sm:text-xl md:text-2xl">
              <a href="">
                <p>home</p>
              </a>
              <a href="">
                <p>cars</p>
              </a>
              <a href="">
                <p>about</p>
              </a>
              <a href="">
                <p>contact</p>
              </a>
              <a href="">
                <p>sign-up</p>
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center pt-16 px-8">
        <div className="flex flex-col">
          <div className="p-2 mb-4">
            <h1 className="text-4xl text-header font-bold text-left leading-8">
              modern renting, <br /> local trust
            </h1>
            <p className="text-base leading-4">
              from daily rides to long-term needs, arqila makes renting simple
              and reliable
            </p>
            <GetStarted />
          </div>
          <Image src={CarHero} alt="imageCar" className="object-cover w-[100vw] h-auto" />
        </div>
      </div>
    </div>
  );
}
