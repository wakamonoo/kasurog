import { MdMessage } from "react-icons/md";

export default function MessageOwner() {
  return(
    <div className="flex gap-2 py-2 items-center px-4 bg-highlight w-fit mt-2 rounded-2xl duration-150 hover:scale-105 hover:bg-highlight-hover active:scale-105 active:bg-highlight-hover cursor-pointer">
      <p className="text-base font-normal text-normal">message owner</p>
      <MdMessage className="text-xl" />
    </div>
  );
}