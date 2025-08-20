import { MdDriveEta, MdSecurity, MdVerified } from "react-icons/md";

export default function About() {
  return (
    <div className="p-12 mt-16">
      <div className="flex justify-center mb-16">
        <div className="flex flex-col leading-3">
          <h1 className="text-4xl font-bold text-center">why arqila?</h1>
          <p className="font-normal text-normal text-center">
            — your ride our promise
          </p>
        </div>
      </div>

      <div>
        <p className="flex justify-center text-justify text-normal font-normal">
          At Arqila, we make car rentals effortless and flexible. Whether you
          want to drive yourself or prefer a professional driver, we provide
          reliable vehicles and convenient services to get you where you need to
          go—safely and comfortably.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <div className="flex flex-col items-center justify-center p-4 bg-panel rounded-t-lg">
            <MdDriveEta className="text-7xl" />
            <h2 className="text-header text-center font-heading text-base font-semibold leading-4 mt-2">
              Driving
              <br />
              Convenience
            </h2>
            <p className="text-center font-normal text-normal leading-4 mt-4 px-4">Drive freely in our ready-to-go, well-maintained cars.</p>
          </div>

          <div className="flex flex-col items-center justify-center p-4 bg-panel rounded-t-lg">
            <MdSecurity className="text-7xl" />
            <h2 className="text-header text-center font-heading text-base font-semibold leading-4 mt-2">
              Driver
              <br />
              Service
            </h2>
            <p className="text-center font-normal text-normal leading-4 mt-4 px-4">Drive freely in our ready-to-go, well-maintained cars.</p>
          </div>

          <div className="flex flex-col items-center justify-center p-4 bg-panel rounded-t-lg">
            <MdVerified className="text-7xl" />
            <h2 className="text-header text-center font-heading text-base font-semibold leading-4 mt-2">
              Safety &
              <br />
              Reliable
            </h2>
            <p className="text-center font-normal text-normal leading-4 mt-4 px-4">Drive freely in our ready-to-go, well-maintained cars.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
