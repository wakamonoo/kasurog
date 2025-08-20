"use client";
import { googleSignUp } from "@/firebase/firebaseConfig";
import { FaTimes } from "react-icons/fa";
import { MdDriveEta } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { auth } from "@/firebase/firebaseConfig";
import { useEffect, useState } from "react";

export default function SignUp({ onClose }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignIn = async () => {
    if (user) {
      await auth.signOut();
      setUser(null);
      onClose();
      Swal.fire({
        title: "Logged out",
        text: "You have successfully logged out",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      const { user: loggedUser, token, error } = await googleSignUp();
      setUser(loggedUser);
      if (loggedUser) {
        setUser(loggedUser);
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
              <img src="${loggedUser.photoURL}" style="width:40px;height:40px;border-radius:50%;"/>
              <p>${loggedUser.displayName}</p>
            </div>`,
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (err) {
          console.error(err);
          Swal.fire({
            title: "Error",
            text: "Something went wrong",
            icon: "warning",
          });
        }
      } else if (error) {
        Swal.fire({
          title: "Error",
          text: "Something went wrong",
          icon: "warning",
        });
      }
    }
  };

  const handleSellerUpgrade = async () => {
    const loggedUser = auth.currentUser;
    if (!loggedUser) {
      Swal.fire({
        title: "Error",
        text: "Kindly sign-in first!",
        icon: "warning",
      });
    } else {
      const { token } = await googleSignUp();
      await fetch("http://localhost:4000/api/users/upgrade", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ token }),
      });
      onClose();
      Swal.fire({
        title: "Congrats",
        text: "You are now on seller account",
        icon: "Success",
      });
    }
  };

  return (
    <div className="bg-panel shadow-2xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  w-[80vw] h-fit fixed z-[70] px-4 py-8 rounded-2xl">
      <button onClick={onClose}>
        <FaTimes className="text-xl text-header duration-200 hover:scale-110 active:scale-110 cursor-pointer" />
      </button>
      <div className="flex gap-2 flex-col w-full items-center justify-center px-2 mt-4">
        <button
          onClick={handleSignIn}
          className="flex items-center gap-2 bg-highlight p-2 px-4 rounded-full text-base font-normal text-normal py-2 bg-highlight mt-2 duration-150 hover:scale-105 hover:bg-highlight-hover active:scale-105 active:bg-highlight-hover cursor-pointer w-full justify-center"
        >
          {user ? "logout" : "continue with google"}
          {user ? <FaSignOutAlt /> : <FcGoogle />}
        </button>
        <p className="text-normal text-sm font-normal">then:</p>
        <button
          onClick={handleSellerUpgrade}
          className="flex justify-center items-center gap-2 bg-highlight p-2 px-4 rounded-full text-base font-normal text-normal py-2 bg-highlight w-full mt-2 duration-150 hover:scale-105 hover:bg-highlight-hover active:scale-105 active:bg-highlight-hover cursor-pointer"
        >
          driverpreneur register
          <MdDriveEta />
        </button>
      </div>
    </div>
  );
}
