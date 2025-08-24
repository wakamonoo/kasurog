import { FiMessageCircle } from "react-icons/fi";

export default function MessageOwner() {
  return (
    <div className="flex w-full py-3 justify-center items-center px-4 bg-highlight gap-2 rounded duration-150 hover:scale-105 hover:bg-highlight-hover active:scale-105 active:bg-highlight-hover cursor-pointer">
      <FiMessageCircle className="text-base sm:text-xl md:text-2xl font-semibold" />
      <p className="font-normal text-normal text-base sm:text-xl md:text-2xl">
        driverpreneur chat
      </p>
    </div>
  );
}
