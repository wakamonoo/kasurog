"use client";

import { useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { MdClose } from "react-icons/md";

export default function CarListing({ carList }) {
  const [editCar, setEditCar] = useState(false);

  return (
    <div>
      <div className="flex flex-col gap-4 w-full px-4">
        {carList.length === 0 ? (
          <div>nothing</div>
        ) : (
          carList.map((car) => {
            return (
              <div key={car.carid}>
                <div className="flex justify-between items-center p-4 bg-second rounded w-full">
                  <h2 className="font-heading text-normal truncate w-40 text-base sm:text-xl md:text-2xl">
                    {car.car}
                  </h2>
                  <div className="flex gap-2">
                    <div className="flex text-center items-center justify-center cursor-pointer text-xl bg-highlight duration-200 hover:bg-[var(--color-accent)]  p-2 rounded-full">
                      <button onClick={() => setEditCar(true)}>
                        <FaPencilAlt />
                      </button>
                    </div>
                    <div className="flex text-center items-center justify-center cursor-pointer text-xl bg-red-600 duration-200 hover:bg-red-700  p-2 rounded-full">
                      <button>
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {editCar && (
        <div className="fixed w-full inset-0 backdrop-blur-xs z-[70] flex items-center justify-center">
          <div className="relative bg-panel w-[350px] sm:w-[400px] md:w-[450px] h-[400px] sm:h-[450px] md:h-[500px] rounded-2xl p-6">
            <MdClose
              onClick={() => setEditCar(false)}
              className="absolute cursor-pointer right-4 top-4 text-2xl sm:text-3xl md:text-4xl font-bold duration-200 hover:scale-110 active:scale-110"
            />
            <div className="mt-[6vh] flex flex-col h-[calc(100%-6vh-2rem)] gap-4 overflow-y-auto pr-2">
              <input
                type="text"
                placeholder="car model"
                name="car"
                className="rounded bg-second font-normal text-base sm:text-xl md:text-2xl w-ful p-3"
              />
              <input
                type="text"
                placeholder="year of manufacture"
                name="year"
                className="rounded bg-second font-normal text-base sm:text-xl md:text-2xl w-ful p-3"
              />
              <input
                type="text"
                placeholder="seat capacity"
                name="seat"
                className="rounded bg-second font-normal text-base sm:text-xl md:text-2xl w-ful p-3"
              />
              <input
                type="text"
                placeholder="starting price per day"
                name="price"
                className="rounded bg-second font-normal text-base sm:text-xl md:text-2xl w-ful p-3"
              />
              <select
                name="fuel"
                className="rounded bg-second font-normal text-base sm:text-xl md:text-2xl w-ful p-3 text-gray-500"
              >
                <option value="null">select fuel type</option>
                <option value="diesel">diesel</option>
                <option value="gasoline">gasoline</option>
              </select>
              <select
                name="transmission"
                className="rounded bg-second font-normal text-base sm:text-xl md:text-2xl w-ful p-3 text-gray-500"
              >
                <option value="null">select transmission type</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
              <select
                name="aircon"
                className="rounded bg-second font-normal text-base sm:text-xl md:text-2xl w-ful p-3 text-gray-500"
              >
                <option value="">air conditioning available?</option>
                <option value="yes">yes</option>
                <option value="no">no</option>
              </select>
              <label className="text-gray-500 font-normal text-base sm:text-xl md:text-2xl">
                Upload Car Image:
              </label>
              <input
                type="file"
                onChange={(e) =>
                  setCarForm({ ...carForm, image: e.target.files[0] })
                }
                className="bg-second font-normal text-base sm:text-xl md:text-2xl w-ful p-3 rounded text-gray-500"
              />
              <button className="bg-highlight group duration-200 cursor-pointer hover:bg-[var(--color-secondary)] p-4 w-fit rounded-full">
                <p className="text-second duration-200 group-hover:text-[var(--color-highlight)] text-xl sm:text-2xl md:text-3xl">
                  Add Car
                </p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
