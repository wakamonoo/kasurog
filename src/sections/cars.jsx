import Image from "next/image";
import Starrex from "../assets/starrex.jpg";
import MessageOwner from "@/components/message";

export default function Cars() {
  return (
    <div className="p-4 mt-">
      <div className="flex justify-center mb-8">
        <h1 className="text-2xl">the cars</h1>
      </div>
      <div className="flex flex-col p-8 rounded bg-panel">
        <Image src={Starrex} alt="car" />
        <h2 className="text-heading font-heading text-base font-semibold">
          HYUNDAI STARREX
        </h2>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-normal text-sm font-normal">starting at</p>
            <p className="font-semibold text-normal text-base">$50</p>
          </div>
          <MessageOwner />
        </div>
      </div>
    </div>
  );
}
