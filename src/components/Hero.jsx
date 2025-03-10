import React from "react";
import Button from "./Button";

export default function Hero() {
  return (
    <div className="min-h-screen flex flex-col gap-10 items-center justify-center text-center max-w-[800px] w-full mx-auto p-4">
      <div className="flex flex-col gap-4">
        <p>PREPARE TO EMBRACE</p>
        <h1 className="uppercase font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          Ultimate<span className="text-blue-400 font-medium">Ascension</span>
        </h1>
      </div>
      <p className="text-sm md:text-base font-light">
        By proceeding, I fully accept the possibility of{" "}
        <span className="text-blue-400 font-medium">
          unparalleled transformation
        </span>{" "}
        and acknowledge all consequences of evolving into a{" "}
        <span className="text-blue-400 font-medium">limitless powerhouse</span>,
        forever altering my perception of reality and physical boundaries.
      </p>
      <Button
        func={() => {
          window.location.href = "#generator";
        }}
        text={"Accept & Begin"}
      ></Button>
    </div>
  );
}
