import Image from "next/image";
import Starrex from "../assets/starrex.jpg";
import MessageOwner from "@/components/message";

export default function Cars() {
  return (
    <div className="p-4 mt-16">
      <div className="flex justify-center mb-16">
        <div className="flex flex-col leading-1">
          <h1 className="text-4xl font-bold text-center">the cars</h1>
          <p className="font-normal text-normal text-center">
            — find the right ride
          </p>
        </div>
      </div>

      {/* ———————————————————————————————————— cars card ——— */}
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col p-8 shadow-2xl rounded bg-panel">
          <Image src={Starrex} alt="car" />
          <h2 className="text-heading font-heading text-base font-semibold">
            HYUNDAI STARREX
          </h2>

          <div className="flex flex-col items-start">
            <div>
              <p className="text-normal text-sm font-normal">starting at</p>
              <p className="font-semibold text-normal text-base">$50</p>
            </div>
            <MessageOwner />
          </div>
        </div>

        <div className="flex flex-col p-8 shadow-2xl rounded bg-panel">
          <Image src={Starrex} alt="car" />
          <h2 className="text-heading font-heading text-base font-semibold">
            HYUNDAI STARREX
          </h2>

          <div className="flex flex-col items-start">
            <div>
              <p className="text-normal text-sm font-normal">starting at</p>
              <p className="font-semibold text-normal text-base">$50</p>
            </div>
            <MessageOwner />
          </div>
        </div>
      </div>
    </div>
  );
}
