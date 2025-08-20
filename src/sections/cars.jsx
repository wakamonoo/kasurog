import Image from "next/image";
import Starrex from "../assets/starrex.jpg";
import MessageOwner from "@/components/message";

export default function Cars() {
  return (
    <div className="p-4 mt-16">
      <div className="flex justify-center mb-16">
        <div className="flex flex-col leading-3">
          <h1 className="text-4xl font-bold text-center">the cars</h1>
          <p className="font-normal text-normal text-center">
            — find the right ride
          </p>
        </div>
      </div>

      {/* ———————————————————————————————————— cars card ——— */}
      <div className="flex flex-col gap-4 p-8">
        <div className="flex flex-col p-4 shadow-2xl rounded bg-panel">
          <p className="absolute bg-highlight px-6 p-2 text-base font-heading -skew-x-12 right-10 mt-1 shadow-2xl">diesel</p>
          <div>
            <Image src={Starrex} alt="car" />
          <h2 className="text-header text-center font-heading text-base mt-4 font-semibold">
            HYUNDAI STARREX
          </h2>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-center gap-2">
              <p className="text-normal text-sm font-normal">starting at</p>
              <p className="font-semibold text-normal text-base"><span>$50</span> per day</p>
            </div>
            <div className="flex justify-center items-center gap-2 mt-4">
              <button className="px-4 py-2 rounded shadow-2xl bg-second">
                <p className="font-normal text-normal">Details</p>
              </button>
              <MessageOwner  />
            </div>
          </div>
        </div>

        <div className="flex flex-col p-4 shadow-2xl rounded bg-panel">
          <p className="absolute bg-highlight px-6 p-2 text-base font-heading -skew-x-12 right-10 mt-1 shadow-2xl">diesel</p>
          <div>
            <Image src={Starrex} alt="car" />
          <h2 className="text-header text-center font-heading text-base mt-4 font-semibold">
            HYUNDAI STARREX
          </h2>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-center gap-2">
              <p className="text-normal text-sm font-normal">starting at</p>
              <p className="font-semibold text-normal text-base"><span>$50</span> per day</p>
            </div>
            <div className="flex justify-center items-center gap-2 mt-4">
              <button className="px-4 py-2 rounded shadow-2xl bg-second">
                <p className="font-normal text-normal">Details</p>
              </button>
              <MessageOwner  />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
