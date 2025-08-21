"use client";
import DriverApp from "@/components/driverprenuerApp";
import { auth, googleSignUp } from "@/firebase/firebaseConfig";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaUserAltSlash, FaCar } from "react-icons/fa";
import Swal from "sweetalert2";
import Loader from "@/components/loader";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [driverApp, setDriverApp] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((logged) => {
      setUser(logged);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  function handleApplication() {
    setDriverApp(true);
  }

  const handleUpgrade = async () => {
    try {
      const { token } = await googleSignUp();
      await fetch("http://localhost:4000/api/users/upgrade", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ token }),
      });
      Swal.fire({
        title: "Congratulations",
        text: "You're now a Driverpreneur!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Can't sign you up",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
      console.error(err);
    }
  };

  return (
    <div className="p-8">
      <a href="/">
        <FaArrowLeft />
      </a>

      {loading ? (
        <div className="flex justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full p-4">
          <Loader />
        </div>
      ) : user ? (
        <div>
          <div className="flex flex-col justify-center items-center gap-2 mt-8">
            <img src={user.photoURL} className="w-24 rounded-full" alt="user" />
            <p className="text-header font-normal">{user.displayName}</p>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleApplication}
              className="flex items-center justify-center gap-2 bg-highlight p-2 px-4 w-fill rounded mt-2"
            >
              <p>driverpreneur sign-up</p>
              <FaCar />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 justify-center items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <FaUserAltSlash className="text-7xl" />
          <p className="text-header font-normal">kindly login first</p>
        </div>
      )}

      {driverApp && (
        <div className="fixed inset-0 backdrop-blur-xs z-[70] flex items-center justify-center">
          <DriverApp onExit={() => setDriverApp(false)} />
        </div>
      )}
    </div>
  );
}
