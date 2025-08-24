"use client";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import CarHero from "../assets/heroCar.png";
import GetStarted from "@/components/ctaOne";
import SignUp from "@/components/signup";

export default function Hero() {
  const [hideNav, setHideNav] = useState(false);
  const navRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [hideMNav, setHideMNav] = useState(true);
  const [showPNav, setShowPNav] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (showSignUp === true) {
      setHideNav(false);
    }
  }, [showSignUp]);

  useEffect(() => {
    const handleNav = () => {
      if (window.innerWidth >= 768) {
        setHideMNav(false);
        setShowPNav(true);
      } else {
        setHideMNav(true);
        setShowPNav(false);
      }
    };

    handleNav();

    window.addEventListener("resize", handleNav);
    return () => {
      window.removeEventListener("resize", handleNav);
    };
  }, []);

  return (
    <div className="h-screen bg-gradient-to-b from-indigo-950">
      <div
        className={`fixed p-4 text-highlight w-full text-2xl font-header z-50 ${
          isScrolled ? "backdrop-blur-xs" : "bg-transparent"
        }`}
      >
        <div className="flex justify-between items-center">
          <a href="/">
            <h1 className="font-medium">arqila.</h1>
          </a>
          {hideMNav && (
            <div>
              <button onClick={() => setHideNav((prev) => !prev)}>
                <FaBars className="duration-200 hover:scale-110 active:scale-110 cursor-pointer" />
              </button>
            </div>
          )}
          {showPNav && (
            <div className="flex gap-4 text-normal font-normal text-base">
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
              <a
                onClick={() => setShowSignUp((prev) => !prev)}
                className="flex"
              >
                <p>auth</p>
              </a>
              <a href="/profile">
                <p>profile</p>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* ———————————————————————————————————— nav section ——— */}
      {hideNav && (
        <div className="contents">
          <div className="inset-0 fixed backdrop-blur-xs pointer-events-none z-50"></div>
          <div
            ref={navRef}
            className="h-screen shadow-2xl fixed z-50 top-0 right-0 w-[60vw] bg-panel p-4"
          >
            <button onClick={() => setHideNav(false)}>
              <FaTimes className="text-xl text-header duration-200 hover:scale-110 active:scale-110 cursor-pointer" />
            </button>
            <div className="flex flex-col p-4 gap-2 font-normal text-normal text-base z-[60]">
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
              <a
                onClick={() => setShowSignUp((prev) => !prev)}
                className="flex"
              >
                <p>auth</p>
              </a>
              <a href="/profile">
                <p>profile</p>
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center pt-32 px-8 sm:px-16 md:px-32">
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
          <div className="absolute top-32 -z-10 right-2 bg-panel w-[80vw] sm:w-[70vw] md:w-[60vw] h-[80vw] sm:h-[70vw] md:h-[60vw] rounded-full" />
          <Image
            src={CarHero}
            alt="imageCar"
            priority="true"
            className="object-contain w-full max-h-screen"
            style={{ height: "auto" }}
          />
        </div>
      </div>

      {showSignUp && (
        <div className="fixed inset-0 backdrop-blur-xs z-[70] flex items-center justify-center">
          <SignUp onClose={() => setShowSignUp(false)} />
        </div>
      )}
    </div>
  );
}
