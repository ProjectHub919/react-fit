import React from "react";
import Button from "./Button";

export default function Hero() {
  return (
    <div className="min-h-screen flex flex-col gap-10 items-center justify-center text-center max-w-[800px] w-full mx-auto p-4">
      <div className="flex flex-col gap-4">
        <p>ACHIEVE YOUR FULL POTENTIAL</p>
        <h1 className="uppercase font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          Ultimate
          <span className="text-blue-400 font-medium"> Transformation</span>
        </h1>
      </div>
      <p className="text-sm md:text-base font-light">
        Take the first step toward{" "}
        <span className="text-blue-400 font-medium">
          unparalleled self-improvement
        </span>
        . This journey is designed to push your limits and redefine your{" "}
        <span className="text-blue-400 font-medium">
          strength and endurance
        </span>
        .
      </p>
      <Button
        func={() => {
          window.location.href = "#generator";
        }}
        text={"Start Your Journey"}
      ></Button>
    </div>
  );
}
