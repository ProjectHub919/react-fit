/* Workout component that displays the generated workout plan.
Handles exercise list display, progress tracking, and exercise completion states. */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ExerciseCard from "./ExerciseCard";

export default function Workout({ workout }) {
  const [selectedExercise, setSelectedExercise] = useState(0);
  const [workoutProgress, setWorkoutProgress] = useState(
    workout.map(() => ({ completed: false, sets: 0 }))
  );

  // Reset progress when workout changes
  useEffect(() => {
    setWorkoutProgress(workout.map(() => ({ completed: false, sets: 0 })));
  }, [workout]);

  // Calculate progress percentage
  const completedExercises = workoutProgress.filter(p => p.completed).length;
  const totalExercises = workout.length;
  const progress = Math.round((completedExercises / totalExercises) * 100);

  // Handle progress update for each exercise (Updates the progress of the selected exercise and marks it as completed if all sets are done)
  const handleProgressUpdate = (i, sets) => {
    setWorkoutProgress(prev => {
      const newProgress = [...prev];
      newProgress[i] = {
        sets,
        completed: sets === 5
      };
      return newProgress;
    });
  };

  return (
    <motion.section
      id="workout"
      className="min-h-screen flex flex-col gap-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-slate-950 py-10 flex flex-col gap-2 justify-center items-center">
        <p className="uppercase font-medium">Your Personalized</p>
        <h2 className="font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          WORKOUT <span className="text-blue-400">PLAN</span>
        </h2>
      </div>

      <div className="max-w-[800px] w-full flex flex-col mx-auto gap-10 p-4">
        {workout.map((exercise, i) => (
          <motion.div
            key={`${exercise.name}-${i}`}
            id={`exercise-${i}`}
            className={`relative ${selectedExercise === i ? 'ring-2 ring-blue-400 rounded-lg' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelectedExercise(i)}
          >
            <ExerciseCard
              exercise={exercise}
              i={i}
              progress={workoutProgress[i]}
              onProgressUpdate={(sets) => handleProgressUpdate(i, sets)}
            />
            {workoutProgress[i]?.completed && (
              <motion.div
                className="absolute top-4 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                Completed!
              </motion.div>
            )}
          </motion.div>
        ))}

        <motion.div 
          className="sticky bottom-4 left-0 right-0 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: workout.length * 0.1 }}
        >
          <div className="bg-slate-950 border border-blue-400 px-4 py-2 rounded-lg">
            <p>Progress: {progress}%</p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
