"use client";
import { auth } from "@/firebase/firebaseConfig";
import { googleSignUp } from "@/firebase/firebaseConfig";
import { useEffect, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { RiLogoutCircleRLine } from "react-icons/ri";

import { MdClose } from "react-icons/md";
import Swal from "sweetalert2";
import Logo from "@/assets/logo.png";
import Image from "next/image";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://arqila.onrender.com"
    : "http://localhost:4000";

export default function SignUp({ onClose }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const divRef = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (divRef.current && !divRef.current.contains(e.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((loggedIn) => {
      setIsLoggedIn(loggedIn);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignIn = async () => {
    if (isLoggedIn) {
      await auth.signOut();
      setIsLoggedIn(null);
      onClose();
      Swal.fire({
        title: "Logged out",
        text: "You have successfully logged out",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      const { user, token, error } = await googleSignUp();
      if (error) {
        Swal.fire({
          title: "Error",
          text: "Unexpect error occured",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
        console.error(error);
      }
      if (user) {
        try {
          await fetch(`${BASE_URL}/api/users/signup`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ token }),
          });
          onClose();
          Swal.fire({
            title: "Success!",
            html: `
            <div style="display:flex;align-items:center;gap:8px;justify-content: center;">
              <p>logged in as</p>
              <img src="${user.photoURL}" style="width:40px;height:40px;border-radius:50%;"/>
              <p>${user.displayName}</p>
            </div>`,
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (err) {
          Swal.fire({
            title: "Error",
            text: "Unexpect error occured",
            icon: "error",
            timer: 2000,
            showConfirmButton: false,
          });
          console.error(err);
        }
      }
    }
  };

  return (
    <div
      ref={divRef}
      className="flex relative justify-center bg-panel w-[350px] sm:w-[400px] md:w-[450px] h-[350px] sm:h-[400px] md:h-[450px] rounded-2xl overflow-hidden"
    >
      <button onClick={onClose} className="absolute cursor-pointer top-4 right-4 text-2xl sm:text-3xl md:text-4xl font-bold duration-200 hover:scale-110 active:scale-110">
        <MdClose />
      </button>
      <div className="p-4 mt-4 flex flex-col justify-center items-center">
        <Image src={Logo} alt="logo" className="w-32 sm:w-40 md:w-48 h-auto" />
        <div className="flex flex-col items-center justify-center">
          <h4 className="text-normal text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold leading-3 sm:leading-3.5 md:leading-4">
            vroom now!
          </h4>
          <p className="text-sm sm:text-base md:text-xl text-label">your ride starts here!</p>
        </div>
        <button
          onClick={handleSignIn}
          className="bg-highlight group duration-200 cursor-pointer hover:bg-[var(--color-secondary)] p-4 w-full rounded-full mt-12"
        >
          {isLoggedIn ? (
            <div className="flex text-xl sm:text-2xl md:text-3xl items-center justify-center gap-2">
              <RiLogoutCircleRLine className="text-second duration-200 group-hover:text-[var(--color-highlight)]" />
              <p className="text-second duration-200 group-hover:text-[var(--color-highlight)]">log-out your account</p>
            </div>
          ) : (
            <div className="flex text-xl sm:text-2xl md:text-3xl items-center justify-center gap-2">
              <FcGoogle />
              <p className="text-second duration-200 group-hover:text-[var(--color-highlight)]">sign in with google</p>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
