"use client";
import { FaTimes } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle } from "@/firebase/firebaseConfig";
import Swal from "sweetalert2";

export default function SignUp({ onClose }) {
  const handleGoogleSignIn = async () => {
    const { user, error } = await signInWithGoogle();
    if (user) {
      onClose();
      Swal.fire({
        title: "success!",
        html: `
    <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
      <p style="margin: 0; font-size: 16px; font-weight: normal;">
        Signed in as
      </p>
      <img src="${user.photoURL}" alt="user" style="width: 40px; height: 40px; border-radius: 50%;" />
      <p style="margin: 0; font-size: 16px; font-weight: normal;">
        ${user.displayName}
      </p>
    </div>
  `,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } else if (error) {
      Swal.fire({
        title: "error!",
        text: "something went wrong",
        icon: "warning",
        timer: 2000,
        showConfirmButton: false,
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
          onClick={handleGoogleSignIn}
          className="flex items-center gap-2 bg-highlight p-2 px-4 rounded-full text-base font-normal text-normal py-2 bg-highlight w-fit mt-2 duration-150 hover:scale-105 hover:bg-highlight-hover active:scale-105 active:bg-highlight-hover cursor-pointer"
        >
          continue with google
          <FcGoogle />
        </button>
      </div>
    </div>
  );
}
