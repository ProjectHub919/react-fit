import React, { useState } from "react";
import SectionWrapper from "./SectionWrapper";
import { SCHEMES, WORKOUTS } from "../utils/swoldier";
import Button from "./Button";

function Header({ index, title, description }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-2">
        <p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400">
          {index}
        </p>
        <h4 className="text-xl sm:text-2xl md:text-3xl font-medium">{title}</h4>
      </div>
      <p className="text-sm sm:text-base mx-auto">{description}</p>
    </div>
  );
}

export default function Generator({
  muscles,
  setMuscles,
  poison,
  setPoison,
  goal,
  setGoal,
  updateWorkout,
}) {
  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    setShowModal(!showModal);
  }

  function updateMuscles(muscleGroup) {
    if (muscles.includes(muscleGroup)) {
      setMuscles(muscles.filter((val) => val !== muscleGroup));
      return;
    }
    if (muscles.length > 2) {
      return;
    }
    if (poison !== "individual") {
      setMuscles([muscleGroup]);
      setShowModal(false);
      return;
    }
    setMuscles([...muscles, muscleGroup]);
    if (muscles.length === 2) {
      setShowModal(false);
    }
  }

  return (
    <SectionWrapper
      id={"generator"}
      header={"Personalized Workout Plan"}
      title={["Unlock", "Your", "Potential"]}
    >
      <Header
        index={"01"}
        title={"Select Your Workout Type"}
        description={
          "Choose the type of workout that aligns with your fitness goals."
        }
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.keys(WORKOUTS).map((type, typeIndex) => (
          <button
            onClick={() => {
              setMuscles([]);
              setPoison(type);
            }}
            className={`bg-slate-950 border duration-200 px-4 hover:border-blue-600 py-3 rounded-lg ${
              type === poison ? "border-blue-600" : "border-blue-400"
            }`}
            key={typeIndex}
          >
            <p className="capitalize">{type.replaceAll("_", " ")}</p>
          </button>
        ))}
      </div>

      <Header
        index={"02"}
        title={"Target Muscle Groups"}
        description={"Specify the muscle groups you want to focus on."}
      />
      <div className="bg-slate-950 border border-solid border-blue-400 rounded-lg flex flex-col">
        <button
          onClick={toggleModal}
          className="relative p-3 flex items-center justify-center"
        >
          <p className="capitalize">
            {muscles.length === 0 ? "Select muscle groups" : muscles.join(" ")}
          </p>
          <i className="fa-solid absolute right-3 top-1/2 -translate-y-1/2 fa-caret-down"></i>
        </button>
        {showModal && (
          <div className="flex flex-col px-3 pb-3">
            {(poison === "individual"
              ? WORKOUTS[poison]
              : Object.keys(WORKOUTS[poison])
            ).map((muscleGroup, muscleGroupIndex) => (
              <button
                onClick={() => updateMuscles(muscleGroup)}
                key={muscleGroupIndex}
                className={`hover:text-blue-400 duration-200 ${
                  muscles.includes(muscleGroup) ? "text-blue-400" : ""
                }`}
              >
                <p className="uppercase">{muscleGroup.replaceAll("_", " ")}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      <Header
        index={"03"}
        title={"Define Your Fitness Goal"}
        description={"Choose the training approach that fits your objectives."}
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Object.keys(SCHEMES).map((scheme, schemeIndex) => (
          <button
            onClick={() => setGoal(scheme)}
            className={`bg-slate-950 border duration-200 hover:border-blue-600 py-3 rounded-lg px-4 ${
              scheme === goal ? "border-blue-600" : "border-blue-400"
            }`}
            key={schemeIndex}
          >
            <p className="capitalize">{scheme.replaceAll("_", " ")}</p>
          </button>
        ))}
      </div>

      <Button func={updateWorkout} text={"Generate Workout Plan"} />
    </SectionWrapper>
  );
}
