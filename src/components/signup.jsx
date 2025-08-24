"use client";
import { auth } from "@/firebase/firebaseConfig";
import { googleSignUp } from "@/firebase/firebaseConfig";
import { useEffect, useRef, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import Swal from "sweetalert2";

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
    <div ref={divRef} className="flex bg-panel p-4 w-fill rounded-2xl">
      <button onClick={onClose} className="flex">
        <MdClose />
      </button>
      <div className="p-4 mt-4 flex flex-col gap-4 justify-center items-center">
        <button
          onClick={handleSignIn}
          className="bg-highlight p-2 px-4 w-full rounded-2xl"
        >
          {isLoggedIn ? (
            <div className="flex items-center justify-center gap-2">
              <p>log-out account</p>
              <FiLogOut />
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <p>sign in with google</p>
              <FaGoogle />
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
