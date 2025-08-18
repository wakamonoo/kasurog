import { FaTimes } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function SignUp({ onClose }) {
  return (
    <div className="bg-panel rounded left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  w-[80vw] h-[60vh] fixed z-[70] p-4">
      <button onClick={onClose}>
        <FaTimes className="text-xl text-header duration-200 hover:scale-110 active:scale-110 cursor-pointer" />
      </button>
      <div className="flex justify-center">
        <button className="flex items-center gap-2 bg-highlight p-2 px-4 rounded-full text-base font-normal text-normal py-2 bg-highlight w-fit mt-2 duration-150 hover:scale-105 hover:bg-highlight-hover active:scale-105 active:bg-highlight-hover cursor-pointer">
          continue with google
          <FcGoogle />
        </button>
      </div>
    </div>
  );
}
