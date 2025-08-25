"use client";
import DriverApp from "@/components/driverprenuerApp";
import { auth, googleSignUp } from "@/firebase/firebaseConfig";
import { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaUserAltSlash, FaCar } from "react-icons/fa";
import Swal from "sweetalert2";
import Loader from "@/components/loader";
import { MdClose } from "react-icons/md";
import Fallback from "@/assets/user.png";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Profile() {
  const [fbAuth, setFbAuth] = useState(null);
  const [user, setUser] = useState(null);
  const [driverApp, setDriverApp] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showInfo, setShowInfo] = useState(true);
  const [showDriver, setShowDiver] = useState(false);
  const [edit, setEdit] = useState(false);
  const divRef = useRef();
  const ListRef = useRef();
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

  useEffect(() => {
    function handleAdd(e) {
      if (ListRef.current && !ListRef.current.contains(e.target)) {
        setAddCar(false);
      }
    }

    document.addEventListener("mousedown", handleAdd);
    return () => {
      document.removeEventListener("mousedown", handleAdd);
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
    <div className="p-12 sm:px-24 md:px-32 lg:px-48 xl:px-64 ">
      <a href="/">
        <FaArrowLeft className="absolute cursor-pointer left-12 text-2xl sm:text-3xl md:text-4xl font-bold duration-200 hover:scale-110 active:scale-110" />
      </a>

      {loading ? (
        <div className="flex justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full p-24 sm:px-32 md:px-48 lg:px-64 xl:px-82">
          <Loader />
        </div>
      ) : user ? (
        <div>
          <div className="flex flex-col justify-center items-center gap-2 mt-8">
            <img
              src={fbAuth.photoURL || Fallback}
              className="w-32 sm:w-40 md:w-50 rounded-full"
              alt="user"
            />
            <p className="text-header text-xl sm:text-2xl md:text-3xl font-extrabold text-center uppercase">
              {fbAuth.displayName}
            </p>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => setDriverApp(true)}
              className="bg-highlight group duration-200 cursor-pointer hover:bg-[var(--color-secondary)] p-4 w-fill rounded-full mt-2"
            >
              <div className="flex text-xl sm:text-2xl md:text-3xl items-center justify-center gap-2">
                <FaCar className="text-second duration-200 group-hover:text-[var(--color-highlight)]" />
                <p className="text-second duration-200 group-hover:text-[var(--color-highlight)]">
                  driverpreneur sign-up
                </p>
              </div>
            </button>
          </div>

          <div className="flex justify-center items-center gap-24 sm:gap-30 md:gap-36 mt-8">
            <button
              onClick={() => {
                setShowDiver(false), setShowInfo(true);
              }}
              className={`pb-2 cursor-pointer ${
                showInfo
                  ? "border-b-2 border-[var(--color-highlight)]"
                  : "border-none"
              }`}
            >
              <p
                className={`${
                  showInfo ? "text-header" : "text-normal"
                } text-base sm:text-xl md:text-2xl font-semibold`}
              >
                Personal Info
              </p>
            </button>
            <button
              onClick={() => {
                setShowDiver(true), setShowInfo(false);
              }}
              className={`pb-2 cursor-pointer ${
                showDriver
                  ? "border-b-2 border-[var(--color-highlight)]"
                  : "border-none"
              }`}
            >
              <p
                className={`${
                  showDriver ? "text-header" : "text-normal"
                } text-base sm:text-xl md:text-2xl font-semibold`}
              >
                Driver Page
              </p>
            </button>
          </div>

          {showInfo && (
            <div className="flex justify-left items-center flex-col gap-2 p-4 mt-2">
              <div className="flex flex-col gap-2 sm:gap-4 md:gap-6">
                <p className="text-header font-heading text-base sm:text-xl md:text-2xl leading-6 sm:leading-8 md:leading-10">
                  Full Name:
                  <br />
                  <span className="font-normal text-normal border-l-2 px-2 border-[var(--color-highlight)] text-base sm:text-xl md:text-2xl">
                    {user.name}
                  </span>
                </p>
                <p className="text-header font-heading text-base sm:text-xl md:text-2xl leading-6 sm:leading-8 md:leading-10">
                  Email:
                  <br />
                  <span className="font-normal text-normal border-l-2 px-2 border-[var(--color-highlight)] text-base sm:text-xl md:text-2xl">
                    {user.email}
                  </span>
                </p>
                <p className="text-header font-heading text-base sm:text-xl md:text-2xl leading-6 sm:leading-8 md:leading-10">
                  Contact:
                  <br />
                  <span
                    className={`font-normal border-l-2 px-2 border-[var(--color-highlight)] text-base sm:text-xl md:text-2xl ${
                      !user.contact ? "italic text-gray-500" : "text-normal"
                    }`}
                  >
                    {user.contact || "contact not yet added"}
                  </span>
                </p>
                <p className="text-header font-heading text-base sm:text-xl md:text-2xl leading-6 sm:leading-8 md:leading-10">
                  Address:
                  <br />
                  <span
                    className={`font-normal border-l-2 px-2 border-[var(--color-highlight)] text-base sm:text-xl md:text-2xl ${
                      !user.address ? "italic text-gray-500" : "text-normal"
                    }`}
                  >
                    {user.address || "contact not yet added"}
                  </span>
                </p>
                <button
                  onClick={() => setEdit(true)}
                  className="mt-4 bg-highlight group duration-200 cursor-pointer hover:bg-[var(--color-secondary)] p-4 w-fit rounded-full"
                >
                  <p className="text-second duration-200 group-hover:text-[var(--color-highlight)] text-xl sm:text-2xl md:text-3xl">
                    edit information
                  </p>
                </button>
              </div>
            </div>
          )}
          {showDriver && (
            <div className="flex flex-col justify-center items-center mt-2 gap-2 p-4">
              <button
                onClick={() => setAddCar(true)}
                className="mt-4 bg-highlight group duration-200 cursor-pointer hover:bg-[var(--color-secondary)] p-4 w-fit rounded-full"
              >
                <p className="text-second duration-200 group-hover:text-[var(--color-highlight)] text-xl sm:text-2xl md:text-3xl">
                  list a car
                </p>
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
            className="relative bg-panel w-[350px] sm:w-[400px] md:w-[450px] h-[400px] sm:h-[450px] md:h-[500px] rounded-2xl overflow-hidden p-6"
          >
            <button className="absolute cursor-pointer right-4 top-4 text-2xl sm:text-3xl md:text-4xl font-bold duration-200 hover:scale-110 active:scale-110">
              <MdClose onClick={() => setEdit(false)} />
            </button>
            <div className="mt-[6vh] flex flex-col h-[calc(100%-6vh-2rem)] gap-4 overflow-y-auto pr-2">
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                className="rounded bg-second font-normal text-base sm:text-xl md:text-2xl w-full p-3"
              />
              <input
                type="text"
                placeholder="Contact Number"
                name="contact"
                value={form.contact}
                onChange={handleInputChange}
                className="rounded  bg-second font-normal text-base sm:text-xl md:text-2xl w-full p-3"
              />
              <input
                type="text"
                placeholder="Address"
                name="address"
                value={form.address}
                onChange={handleInputChange}
                className="rounded  bg-second font-normal text-base sm:text-xl md:text-2xl w-ful p-3"
              />
              <button
                onClick={handleSubmit}
                className="bg-highlight group duration-200 cursor-pointer hover:bg-[var(--color-secondary)] p-4 w-fit rounded-full"
              >
                <p className="text-second duration-200 group-hover:text-[var(--color-highlight)] text-xl sm:text-2xl md:text-3xl">
                  Submit Changes
                </p>
              </button>
            </div>
          </div>
        </div>
      )}

      {addCar && (
        <div className="fixed w-full inset-0 backdrop-blur-xs z-[70] flex items-center justify-center">
          <div ref={ListRef} className="relative bg-panel w-[350px] sm:w-[400px] md:w-[450px] h-[400px] sm:h-[450px] md:h-[500px] rounded-2xl p-6">
            <MdClose
              onClick={() => setAddCar(false)}
              className="absolute cursor-pointer right-4 top-4 text-2xl sm:text-3xl md:text-4xl font-bold duration-200 hover:scale-110 active:scale-110"
            />
            <div className="mt-[6vh] flex flex-col h-[calc(100%-6vh-2rem)] gap-4 overflow-y-auto pr-2">
              <input
                type="text"
                placeholder="car model"
                name="car"
                value={carForm.car}
                onChange={handleCarInput}
                className="rounded bg-second font-normal text-base sm:text-xl md:text-2xl w-ful p-3"
              />
              <input
                type="text"
                placeholder="year of manufacture"
                name="year"
                value={carForm.year}
                onChange={handleCarInput}
                className="rounded bg-second font-normal text-base sm:text-xl md:text-2xl w-ful p-3"
              />
              <input
                type="text"
                placeholder="seat capacity"
                name="seat"
                value={carForm.seat}
                onChange={handleCarInput}
                className="rounded bg-second font-normal text-base sm:text-xl md:text-2xl w-ful p-3"
              />
              <input
                type="text"
                placeholder="starting price per day"
                name="price"
                value={carForm.price}
                onChange={handleCarInput}
                className="rounded bg-second font-normal text-base sm:text-xl md:text-2xl w-ful p-3"
              />
              <select
                name="fuel"
                onChange={handleCarInput}
                value={carForm.fuel}
                className="rounded bg-second font-normal text-base sm:text-xl md:text-2xl w-ful p-3 text-gray-500"
              >
                <option value="null">select fuel type</option>
                <option value="diesel">diesel</option>
                <option value="gasoline">gasoline</option>
              </select>
              <select
                name="transmission"
                onChange={handleCarInput}
                value={carForm.transmission}
                className="rounded bg-second font-normal text-base sm:text-xl md:text-2xl w-ful p-3 text-gray-500"
              >
                <option value="null">select transmission type</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
              <select
                name="aircon"
                onChange={handleCarInput}
                value={carForm.aircon}
                className="rounded bg-second font-normal text-base sm:text-xl md:text-2xl w-ful p-3 text-gray-500"
              >
                <option value="">air conditioning available?</option>
                <option value="yes">yes</option>
                <option value="no">no</option>
              </select>
              <label className="text-gray-500 font-normal text-base sm:text-xl md:text-2xl">
                Upload Car Image:
              </label>
              <input
                type="file"
                onChange={(e) =>
                  setCarForm({ ...carForm, image: e.target.files[0] })
                }
                className="bg-second font-normal text-base sm:text-xl md:text-2xl w-ful p-3 rounded text-gray-500"
              />
              <button
                onClick={handleCarSubmit}
                className="bg-highlight group duration-200 cursor-pointer hover:bg-[var(--color-secondary)] p-4 w-fit rounded-full"
              >
                <p className="text-second duration-200 group-hover:text-[var(--color-highlight)] text-xl sm:text-2xl md:text-3xl">
                  Add Car
                </p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
