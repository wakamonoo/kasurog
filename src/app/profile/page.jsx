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
  const [showInfo, setShowInfo] = useState(true);
  const [showDriver, setShowDiver] = useState(false);

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

  function handleDriverTab() {
    setShowInfo(false);
    setShowDiver(true);
  }

  function handleInfoTab() {
    setShowInfo(true);
    setShowDiver(false);
  }

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

          <div className="flex justify-center items-center gap-8 mt-8">
            <button onClick={handleInfoTab} className={`pb-2 ${showInfo ? "border-b-2 border-[var(--color-highlight)]" : "border-none"}`}>
              <p className="text-normal font-normal">Personal Info</p>
            </button>
            <button onClick={handleDriverTab} className={`pb-2 ${showDriver ? "border-b-2 border-[var(--color-highlight)]" : "border-none"}`}>
              <p className="text-normal font-normal">Driver Page</p>
            </button>
          </div>

          {showInfo && (
            <div className="flex flex-col gap-2 p-4">
              <p className="text-header font-heading">Full Name: <span className="font-normal text-normal">Joven Bataller</span></p>
              <p className="text-header font-heading">Email: <span className="font-normal text-normal">Joven Bataller</span></p>
              <p className="text-header font-heading">Contact: <span className="font-normal text-normal">Joven Bataller</span></p>
              <p className="text-header font-heading">Address: <span className="font-normal text-normal">Joven Bataller</span></p>
              <button className="flex mt-4 p-4 bg-highlight rounded w-fit">
                <p>edit information</p>
              </button>
            </div>
          )}
          {showDriver && <p>handle driver</p>}
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
