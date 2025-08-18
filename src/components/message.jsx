import { FiMessageCircle } from "react-icons/fi";

export default function MessageOwner() {
  return (
    <div className="flex py-2 items-center px-4 bg-highlight w-fit rounded duration-150 hover:scale-105 hover:bg-highlight-hover active:scale-105 active:bg-highlight-hover cursor-pointer">
      <FiMessageCircle className="text-xl" />
    </div>
  );
}
