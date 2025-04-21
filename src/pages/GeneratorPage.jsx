/* Workout generator page that handles the workout creation flow
Manages state for workout type, target muscles, and fitness goals
Coordinates between Generator component and Workout display
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Generator from "../components/Generator";
import Workout from "../components/Workout";
import { generateWorkout } from "../utils/functions";
import AnimatedPage from "../components/AnimatedPage";

export default function GeneratorPage() {
  const [workout, setWorkout] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [poison, setPoison] = useState("individual");
  const [muscles, setMuscles] = useState([]);
  const [goal, setGoal] = useState("strength_power");

  // Function to generate the workout based on selected options
  // Uses a timeout to simulate loading and then generates a new workout
  async function updateWorkout() {
    if (muscles.length < 1) {
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      let newWorkout = generateWorkout({ poison, muscles, goal });
      setWorkout(newWorkout);

      const workoutSection = document.getElementById("workout");
      if (workoutSection) {
        workoutSection.scrollIntoView({ behavior: "smooth" });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AnimatedPage>
      <main className="pt-16">
        <Generator
          muscles={muscles}
          setMuscles={setMuscles}
          poison={poison}
          setPoison={setPoison}
          goal={goal}
          setGoal={setGoal}
          updateWorkout={updateWorkout}
          isLoading={isLoading}
        />

        <AnimatePresence mode="wait">
          {workout && (
            <motion.div
              key="workout"
              className="pt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Workout workout={workout} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </AnimatedPage>
  );
}
