"use client";
import DriverApp from "@/components/driverprenuerApp";
import { auth, googleSignUp } from "@/firebase/firebaseConfig";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaUserAltSlash, FaCar } from "react-icons/fa";
import Swal from "sweetalert2";
import Loader from "@/components/loader";
import { MdClose } from "react-icons/md";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [driverApp, setDriverApp] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showInfo, setShowInfo] = useState(true);
  const [showDriver, setShowDiver] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (logged) => {
      if (logged) {
        try {
          const res = await fetch(
            `http://localhost:4000/api/users/users/${logged.uid}`
          );
          const dbUser = await res.json();
          setUser(dbUser);
        } catch (err) {
          console.error("failed to fetch user from db, error:", err);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
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
              onClick={() => setDriverApp(true)}
              className="flex items-center justify-center gap-2 bg-highlight p-2 px-4 w-fill rounded mt-2"
            >
              <p>driverpreneur sign-up</p>
              <FaCar />
            </button>
          </div>

          <div className="flex justify-center items-center gap-8 mt-8">
            <button
              onClick={() => {setShowDiver(false), setShowInfo(true)}}
              className={`pb-2 ${
                showInfo
                  ? "border-b-2 border-[var(--color-highlight)]"
                  : "border-none"
              }`}
            >
              <p className="text-normal font-normal">Personal Info</p>
            </button>
            <button
              onClick={() => {setShowDiver(true), setShowInfo(false)}}
              className={`pb-2 ${
                showDriver
                  ? "border-b-2 border-[var(--color-highlight)]"
                  : "border-none"
              }`}
            >
              <p className="text-normal font-normal">Driver Page</p>
            </button>
          </div>

          {showInfo && (
            <div className="flex flex-col gap-2 p-4">
              <p className="text-header font-heading">
                Full Name:<br />
                <span className="font-normal text-normal">{user.name}</span>
              </p>
              <p className="text-header font-heading">
                Email:<br />
                <span className="font-normal text-normal">{user.email}</span>
              </p>
              <p className="text-header font-heading">
                Contact:<br />
                <span className={`font-normal ${!user.contact ? "italic text-gray-500" : "text-normal"}`}>{user.contact || "contact not yet added"}</span>
              </p>
              <p className="text-header font-heading">
                Address:<br />
                <span className={`font-normal ${!user.address ? "italic text-gray-500" : "text-normal"}`}>{user.adress || "contact not yet added"}</span>
              </p>
              <button onClick={() => setEdit(true)} className="flex mt-4 p-4 bg-highlight rounded w-fit">
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

      {edit && (
        <div className="flex absolute justify-center items center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-panel p-4"> 
          <div>
            <MdClose onClick={() => setEdit(false)} />
          </div>
          <div>
            <input type="text" placeholder="Full Name" />
            <input type="text" placeholder="Contact Number" />
            <input type="text" placeholder="Address" />
          </div>
        </div>
      )}
    </div>
  );
}
