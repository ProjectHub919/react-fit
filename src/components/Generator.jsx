/* Workout generator component that allows users to create personalized workout plans
Provides interface for selecting workout type, target muscles, and fitness goals
Uses the SectionWrapper component for consistent styling and animations */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { SCHEMES, WORKOUTS } from "../utils/swoldier";
import Button from "./Button";
import LoadingSpinner from "./LoadingSpinner";

/* Header subcomponent for generator sections, displays numbered sections with title and description */
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
  isLoading
}) {
  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    setShowModal(!showModal);
  }

  // Updates the selected muscle groups based on user interaction
  function updateMuscles(muscleGroup) {
    // Check if the muscle group is already selected
    if (muscles.includes(muscleGroup)) {
      // Remove the muscle group from the list if already selected
      setMuscles(muscles.filter((val) => val !== muscleGroup));
      return;
    }
    
    // Limit selection to a maximum of 2 muscle groups
    if (muscles.length > 2) {
      return;
    }
    
    // If workout type is not "individual", select only the current muscle group
    if (poison !== "individual") {
      setMuscles([muscleGroup]);
      setShowModal(false);
      return;
    }
    
    // Otherwise, add the muscle group to the list
    setMuscles([...muscles, muscleGroup]);
    
    // Close the modal if the maximum number of selections is reached
    if (muscles.length === 2) {
      setShowModal(false);
    }
  }

  return (
    <SectionWrapper
      id={"generator"}
      header={"Personalized Workout Plan"}
      title={["Unlock", "YOUR", "Potential"]}
    >
      <Header
        index={"01"}
        title={"Select Your Workout Type"}
        description={"Choose the type of workout that aligns with your fitness goals."}
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Map through the workout types and create buttons for each type */}
        {Object.keys(WORKOUTS).map((type) => (
          <motion.button
            key={type}
            onClick={() => {
              // If click reset the muscle groups
              setMuscles([]);
              setPoison(type);
            }}
            className={`bg-slate-950 border duration-200 px-4 hover:border-blue-600 py-3 rounded-lg ${
              type === poison ? "bg-blue-600 border-blue-400" : "border-blue-400"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <p className="capitalize">{type.replaceAll("_", " ")}</p>
          </motion.button>
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
        <AnimatePresence>
          {showModal && (
            <motion.div 
              className="flex flex-col px-3 pb-3"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              {/* Map through the muscle groups and create buttons for each group */}
              {/* if poison is "individual", show all muscle groups, else show only the selected muscle groups for the current poison */}
              {(poison === "individual"
                ? WORKOUTS[poison]
                : Object.keys(WORKOUTS[poison])
              ).map((muscleGroup, muscleGroupIndex) => (
                <motion.button
                  onClick={() => updateMuscles(muscleGroup)}
                  key={muscleGroupIndex}
                  className={`hover:text-blue-400 duration-200 py-2 ${
                    muscles.includes(muscleGroup) ? "text-blue-400" : ""
                  }`}
                  whileHover={{ x: 10 }}
                >
                  <p className="uppercase">{muscleGroup.replaceAll("_", " ")}</p>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Header
        index={"03"}
        title={"Define Your Fitness Goal"}
        description={"Choose the training approach that fits your objectives."}
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Object.keys(SCHEMES).map((scheme, schemeIndex) => (
          <motion.button
            onClick={() => {
              setGoal(scheme);
            }}
            className={`bg-slate-950 border duration-200 hover:border-blue-600 py-3 rounded-lg px-4 ${
              scheme === goal ? "bg-blue-600 border-blue-400" : "border-blue-400"
            }`}
            key={schemeIndex}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <p className="capitalize">{scheme.replaceAll("_", " ")}</p>
          </motion.button>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4">
        <Button 
          func={updateWorkout} 
          text={isLoading ? "Generating Workout..." : "Generate Workout Plan"} // Change button text based on loading state
          disabled={muscles.length < 1 || isLoading}  // Disable button if no muscle groups are selected or if loading
        />
        {isLoading && <LoadingSpinner />} {/* Show loading spinner when generating workout */}
      </div>
    </SectionWrapper>
  );
}
