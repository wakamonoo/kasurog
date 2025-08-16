"use client";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";

export default function Hero() {
  const [hideNav, setHideNav] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    function outNav(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setHideNav(false);
      }
    }
    document.addEventListener("pointerdown", outNav);
    return() => {
      document.removeEventListener("pointerdown", outNav);
    };
  }, []);

  return (
    <>
      <div className="flex justify-between p-4 h-screen text-header text-2xl font-header">
        <a href="/">
          <h1 className="">arqila.</h1>
        </a>
        <div>
          <button onClick={() => setHideNav((prev) => !prev)}>
            <FaBars className="duration-200 hover:scale-110 active:scale-110 cursor-pointer" />
          </button>
        </div>
      </div>
      {hideNav && (
        <div className="inset-0 fixed backdrop-blur-xs pointer-events-none z-50">
          <div
            ref={navRef}
            className="h-screen shadow-2xl fixed z-50 top-0 right-0 w-[60vw] bg-panel p-4"
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
    </>
  );
}
