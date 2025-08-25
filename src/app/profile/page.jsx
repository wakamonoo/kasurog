"use client";
import DriverApp from "@/components/driverprenuerApp";
import { auth, googleSignUp } from "@/firebase/firebaseConfig";
import { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaUserAltSlash, FaCar } from "react-icons/fa";
import Swal from "sweetalert2";
import Loader from "@/components/loader";
import { MdClose } from "react-icons/md";

const BASE_URL = process.env.NODE_ENV === "production" ? "https://arqila.onrender.com" : "http://localhost:4000";

export default function Profile() {
  const [fbAuth, setFbAuth] = useState(null);
  const [user, setUser] = useState(null);
  const [driverApp, setDriverApp] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showInfo, setShowInfo] = useState(true);
  const [showDriver, setShowDiver] = useState(false);
  const [edit, setEdit] = useState(false);
  const divRef = useRef();
  const [form, setForm] = useState({ name: "", contact: "", address: "" });
  const [carForm, setCarForm] = useState({
    car: "",
    year: "",
    seat: "",
    price: "",
    fuel: "",
    transmission: "",
    aircon: "",
    image: null,
  });
  const [addCar, setAddCar] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (logged) => {
      setFbAuth(logged);
      if (logged) {
        try {
          const res = await fetch(`${BASE_URL}/api/users/users/${logged.uid}`);
          const dbUser = await res.json();
          setUser(dbUser);

          setForm({
            name: dbUser.name || "",
            contact: dbUser.contact || "",
            address: dbUser.address || "",
          });
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

  useEffect(() => {
    function handleEdit(e) {
      if (divRef.current && !divRef.current.contains(e.target)) {
        setEdit(false);
      }
    }

    document.addEventListener("mousedown", handleEdit);
    return () => {
      document.removeEventListener("mousedown", handleEdit);
    };
  }, []);

  const handleInputChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCarInput = (e) => {
    setCarForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCarSubmit = async () => {
    try {
      let imageURL = "";

      if (carForm.image) {
        const formData = new FormData();
        formData.append("file", carForm.image);

        const uploadRes = await fetch(`${BASE_URL}/api/images/imageUpload`, {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) {
          throw new Error(uploadData.error || "image upload failed");
        }

        imageURL = uploadData.url;
      }

      const res = await fetch(`${BASE_URL}/api/cars/addCar`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          uid: fbAuth.uid,
          ...carForm,
          image: imageURL,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        Swal.fire({
          title: "Success",
          text: "Profile Updated",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        setCarForm({
          car: "",
          year: "",
          seat: "",
          fuel: "",
          price: "",
          transmission: "",
          aircon: "",
        });
        setAddCar(false);
      } else {
        Swal.fire({
          title: "Error",
          text: data.error || "Updated Failed",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Server Failed, try again later",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/users/updateUser`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          uid: fbAuth.uid,
          ...form,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        Swal.fire({
          title: "Success",
          text: "Profile Updated",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        setUser((prev) => ({ ...prev, ...form }));
        setEdit(false);
      } else {
        Swal.fire({
          title: "Error",
          text: data.error || "Updated Failed",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Server Failed, try again later",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
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
            <img
              src={fbAuth.photoURL}
              className="w-24 rounded-full"
              alt="user"
            />
            <p className="text-header font-normal">{fbAuth.displayName}</p>
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
              onClick={() => {
                setShowDiver(false), setShowInfo(true);
              }}
              className={`pb-2 ${
                showInfo
                  ? "border-b-2 border-[var(--color-highlight)]"
                  : "border-none"
              }`}
            >
              <p className="text-normal font-normal">Personal Info</p>
            </button>
            <button
              onClick={() => {
                setShowDiver(true), setShowInfo(false);
              }}
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
            <div className="flex justify-center items-center flex-col gap-2 p-4">
              <div>
                <p className="text-header font-heading">
                  Full Name:
                  <br />
                  <span className="font-normal text-normal border-l-2 px-2 border-[var(--color-highlight)]">
                    {user.name}
                  </span>
                </p>
                <p className="text-header font-heading">
                  Email:
                  <br />
                  <span className="font-normal text-normal border-l-2 px-2 border-[var(--color-highlight)]">
                    {user.email}
                  </span>
                </p>
                <p className="text-header font-heading">
                  Contact:
                  <br />
                  <span
                    className={`font-normal border-l-2 px-2 border-[var(--color-highlight)] ${
                      !user.contact ? "italic text-gray-500" : "text-normal"
                    }`}
                  >
                    {user.contact || "contact not yet added"}
                  </span>
                </p>
                <p className="text-header font-heading">
                  Address:
                  <br />
                  <span
                    className={`font-normal border-l-2 px-2 border-[var(--color-highlight)] ${
                      !user.address ? "italic text-gray-500" : "text-normal"
                    }`}
                  >
                    {user.address || "contact not yet added"}
                  </span>
                </p>
                <button
                  onClick={() => setEdit(true)}
                  className="flex mt-4 p-4 bg-highlight rounded w-fit"
                >
                  <p>edit information</p>
                </button>
              </div>
            </div>
          )}
          {showDriver && (
            <div className="flex flex-col justify-center items-center mt-8">
              <button
                onClick={() => setAddCar(true)}
                className="flex mt-4 p-4 bg-highlight rounded w-fit"
              >
                list a car
              </button>
            </div>
          )}
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
        <div className="fixed inset-0 backdrop-blur-xs z-[70] flex items-center justify-center">
          <div
            ref={divRef}
            className="flex absolute justify-center items center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-panel p-4"
          >
            <div className="">
              <MdClose onClick={() => setEdit(false)} />
            </div>
            <div className="mt-8 flex flex-col gap-2">
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                className="rounded bg-second font-normal text-sm w-[80vw] p-2"
              />
              <input
                type="text"
                placeholder="Contact Number"
                name="contact"
                value={form.contact}
                onChange={handleInputChange}
                className="rounded  bg-second font-normal text-sm w-[80vw] p-2"
              />
              <input
                type="text"
                placeholder="Address"
                name="address"
                value={form.address}
                onChange={handleInputChange}
                className="rounded  bg-second font-normal text-sm w-[80vw] p-2"
              />
              <button
                onClick={handleSubmit}
                className="text-normal font-normal bg-highlight p-2 rounded"
              >
                submit
              </button>
            </div>
          </div>
        </div>
      )}

      {addCar && (
        <div className="fixed w-full inset-0 backdrop-blur-xs z-[70] flex items-center justify-center">
          <div className="flex flex-col p-4 bg-panel justify-center items-center gap-4 absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[90vw] max-w-md max-h-[80vh]">
            <MdClose
              onClick={() => setAddCar(false)}
              className="absolute top-2 left-4"
            />
            <div className="flex flex-col gap-4 mt-8 overflow-y-auto pr-2">
              <input
                type="text"
                placeholder="car model"
                name="car"
                value={carForm.car}
                onChange={handleCarInput}
                className="bg-second p-2 rounded"
              />
              <input
                type="text"
                placeholder="year of manufacture"
                name="year"
                value={carForm.year}
                onChange={handleCarInput}
                className="bg-second p-2 rounded"
              />
              <input
                type="text"
                placeholder="seat capacity"
                name="seat"
                value={carForm.seat}
                onChange={handleCarInput}
                className="bg-second p-2 rounded"
              />
              <input
                type="text"
                placeholder="starting price per day"
                name="price"
                value={carForm.price}
                onChange={handleCarInput}
                className="bg-second p-2 rounded"
              />
              <select
                name="fuel"
                onChange={handleCarInput}
                value={carForm.fuel}
                className="bg-second p-2 rounded text-gray-500"
              >
                <option value="null">select fuel type</option>
                <option value="diesel">diesel</option>
                <option value="gasoline">gasoline</option>
              </select>
              <select
                name="transmission"
                onChange={handleCarInput}
                value={carForm.transmission}
                className="bg-second p-2 rounded text-gray-500"
              >
                <option value="null">select transmission type</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
              <select
                name="aircon"
                onChange={handleCarInput}
                value={carForm.aircon}
                className="bg-second p-2 rounded text-gray-500"
              >
                <option value="">air conditioning available?</option>
                <option value="yes">yes</option>
                <option value="no">no</option>
              </select>
              <label className="text-gray-500 font-normal text-base">
                upload car image:
              </label>
              <input
                type="file"
                onChange={(e) =>
                  setCarForm({ ...carForm, image: e.target.files[0] })
                }
                className="w-[70vw] bg-second p-2 rounded text-gray-500"
              />
              <button
                onClick={handleCarSubmit}
                className="text-normal font-normal bg-highlight p-2 rounded"
              >
                add car
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
