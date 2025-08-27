import { MdClose } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function DriverApp({ onExit, user }) {
  const divRef = useRef();
  const [regForm, setRegForm] = useState({ orcr: null, license: null });

  useEffect(() => {
    function handleClick(e) {
      if (divRef.current && !divRef.current.contains(e.target)) {
        onExit();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleDriverReg = async () => {
    try {
      let orcrURL = "";
      let licenseURL = "";

      if (regForm.orcr) {
        const orcForm = new FormData();
        orcForm.append("file", regForm.orcr);

        const orcrRes = await fetch(`${BASE_URL}/api/images/imageUpload`, {
          method: "POST",
          body: orcForm,
        });

        const orcrData = await orcrRes.json();
        if (!orcrRes.ok) {
          throw new Error(orcrData.error || "image upload failed");
        }

        orcrURL = orcrData.url;
      }

      if (regForm.license) {
        const licenseForm = new FormData();
        licenseForm.append("file", regForm.license);

        const licenseRes = await fetch(`${BASE_URL}/api/images/imageUpload`, {
          method: "POST",
          body: licenseForm,
        });

        const licenseData = await licenseRes.json();
        if (!licenseRes.ok) {
          throw new Error(licenseData.error || "image upload failed");
        }

        licenseURL = licenseData.url;
      }

      const res = await fetch(`${BASE_URL}/api/register/driverReg`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          orcr: orcrURL,
          license: licenseURL,
          uid: user.uid,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          title: "Success",
          text: "Driver documents uploaded successfully!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        setRegForm({ orcr: null, license: null });
        onExit();
      } else {
        Swal.fire({
          title: "Error",
          text: data.error || "Upload failed",
          icon: "error",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: err.message || "Server error. Please try again later.",
        icon: "error",
      });
    }
  };

  const handleFileChange = (e) => {
    setRegForm((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
  };
  
  return (
    <div
      ref={divRef}
      className="relative bg-panel w-[350px] sm:w-[400px] md:w-[450px] h-[400px] sm:h-[450px] md:h-[500px] rounded-2xl p-6"
    >
      <div className="absolute cursor-pointer top-4 right-4 text-2xl sm:text-3xl md:text-4xl font-bold duration-200 hover:scale-110 active:scale-110">
        <button onClick={onExit}>
          <MdClose />
        </button>
      </div>
      <div className="mt-[6vh] flex flex-col h-[calc(100%-6vh-2rem)] gap-4 overflow-y-auto pr-2">
        <label className="text-gray-500 font-normal text-base sm:text-xl md:text-2xl">
          Upload OR/CR:
        </label>
        <input
          type="file"
          name="orcr"
          onChange={handleFileChange}
          className="bg-second font-normal text-base sm:text-xl md:text-2xl w-ful p-3 rounded text-gray-500"
        />
        <label className="text-gray-500 font-normal text-base sm:text-xl md:text-2xl">
          Upload Driver's License:
        </label>
        <input
          type="file"
          name="license"
          onChange={handleFileChange}
          className="bg-second font-normal text-base sm:text-xl md:text-2xl w-ful p-3 rounded text-gray-500"
        />
        <button
          onClick={handleDriverReg}
          className="bg-highlight group duration-200 cursor-pointer hover:bg-[var(--color-secondary)] p-4 w-fit rounded-full"
        >
          <p className="text-second duration-200 group-hover:text-[var(--color-highlight)] text-xl sm:text-2xl md:text-3xl">
            Upload
          </p>
        </button>
      </div>
    </div>
  );
}
