"use client";
import { auth } from "@/firebase/firebaseConfig";
import { googleSignUp } from "@/firebase/firebaseConfig";
import { useEffect, useState } from "react";
import { FaCar, FaGoogle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import Swal from "sweetalert2";

export default function SignUp({ onClose }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

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
          text: "Something went wrong",
          icon: "warning",
        });
        console.error(error);
      }
      if (user) {
        try {
          await fetch("http://localhost:4000/api/users/signup", {
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
          console.error(err);
        }
      }
    }
  };

  const handleDriver = async () => {
    if (!isLoggedIn) {
      onClose();
      alert("fcking log in");
    } else {
      try {
        const { token } = await googleSignUp();
        await fetch("http://localhost:4000/api/users/upgrade", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ token }),
        });
        alert("upgraded");
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <div className="flex bg-panel p-4 w-fill rounded">
      <MdClose />
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
        <p className="text-xs font-normal">or:</p>
        <button onClick={handleDriver} className="flex items-center justify-center gap-2 bg-highlight p-2 px-4 w-full rounded-2xl">
          <p>driverpreneur sign-up</p>
          <FaCar />
        </button>
      </div>
    </div>
  );
}
