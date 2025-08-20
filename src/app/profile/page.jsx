"use client";
import { useState, useEffect } from "react";
import { auth } from "@/firebase/firebaseConfig";
import { FaArrowLeft, FaUserAltSlash } from "react-icons/fa";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
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

      <div className="p-4">
        {user ? (
          <div className="flex flex-col gap-2 justify-center items-center mt-4">
            <img src={user.photoURL} className="w-24 h-auto rounded-full" />
            <p className="text-header font-normal">{user.displayName}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 justify-center items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <FaUserAltSlash className="text-7xl" />
            <p className="text-normal font-normal text-center leading-3">kindly log in first to access this page</p>
            <button className="bg-highlight p-2">
              go to login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
