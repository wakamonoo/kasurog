"use client";
import { googleSignUp } from "@/firebase/firebaseConfig";
import { FaTimes } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

export default function SignUp({ onClose }) {
  const handleSignIn = async () => {
    const { user, token, error } = await googleSignUp();
    if (user) {
      try {
        await fetch("https://localhost:4000/api/user/signup", {
          method: "POST",
          headers: { "Content-type" : "application/json" },
          body: JSON.stringify({ token })
        });
        onClose();
        Swal.fire({
          title: "Success!",
          html: `
            <div style="display:flex;align-items:center;gap:8px;">
              <img src="${user.photoURL}" style="width:40px;height:40px;border-radius:50%;"/>
              <p>${user.displayName}</p>
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
  };

  return (
    <div className="bg-panel rounded left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  w-[80vw] h-[60vh] fixed z-[70] p-4">
      <button onClick={onClose}>
        <FaTimes className="text-xl text-header duration-200 hover:scale-110 active:scale-110 cursor-pointer" />
      </button>
      <div className="flex justify-center">
        <button
          onClick={handleSignIn}
          className="flex items-center gap-2 bg-highlight p-2 px-4 rounded-full text-base font-normal text-normal py-2 bg-highlight w-fit mt-2 duration-150 hover:scale-105 hover:bg-highlight-hover active:scale-105 active:bg-highlight-hover cursor-pointer"
        >
          continue with google
          <FcGoogle />
        </button>
      </div>
    </div>
  );
}
