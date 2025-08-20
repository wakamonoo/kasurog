"use client";
import { auth } from "@/firebase/firebaseConfig";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaUserAltSlash } from "react-icons/fa";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((logged) => {
      setUser(logged);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="p-8">
      <a href="/">
        <FaArrowLeft />
      </a>

      {user ? (
        <div className="flex flex-col justify-center items-center gap-2 mt-8"> 
          <img src={user.photoURL} className="w-24 rounded-full" alt="user" />
          <p className="text-header font-normal">{user.displayName}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2 justify-center items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <FaUserAltSlash className="text-7xl" />
          <p className="text-header font-normal">kindly login first</p>
        </div>
      )}
    </div>
  );
}
