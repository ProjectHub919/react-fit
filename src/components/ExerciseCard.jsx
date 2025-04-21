/* Exercise card component that displays individual exercise details
Shows exercise name, description, sets/reps, and tracks completion status
Features interactive set counting */
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function ExerciseCard({
  exercise,
  i,
  progress,
  onProgressUpdate,
  onExerciseSearch = false,
}) {
  const progressColor =
    progress?.sets === 5
      ? "text-green-400"
      : progress?.sets >= 3
      ? "text-yellow-400"
      : "text-gray-400";

  useEffect(() => {
    if (!onExerciseSearch && !progress) {
      onProgressUpdate?.(0);
    }
  }, [progress, onProgressUpdate, onExerciseSearch]);

  function handleSetIncrement() {
    const newSets = ((progress?.sets || 0) + 1) % 6;
    onProgressUpdate?.(newSets);
  }

  return (
    <motion.div
      className="p-4 rounded-md flex flex-col gap-4 bg-slate-950 sm:flex-wrap overflow-hidden"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-x-4">
        <motion.h4
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl hidden sm:inline sm:text-4xl md:text-5xl font-semibold text-slate-400"
        >
          {String(i + 1).padStart(2, "0")}
        </motion.h4>
        <h2 className="capitalize whitespace-nowrap truncate max-w-full text-lg sm:text-xl md:text-2xl flex-1 sm:text-center">
          {exercise.name.replaceAll("_", " ")}
        </h2>
        <span className="text-sm text-slate-400 capitalize">
          {exercise.type}
        </span>
      </div>

      <motion.div
        className="flex flex-col"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-slate-400 text-sm">Muscle Groups</h3>
        <p className="capitalize">{exercise.muscles.join(" & ")}</p>
      </motion.div>

      <motion.div
        className="flex flex-col bg-slate-950 rounded gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {exercise.description.split("___").map((val, index) => (
          <div key={index} className="text-sm text-justify">
            {val}
          </div>
        ))}
      </motion.div>

      {onExerciseSearch ? null : (
        <div className="text-center gap-2 grid grid-cols-2 sm:grid-cols-4 sm:place-items-center">
          {["reps", "rest", "tempo"].map((info, index) => (
            <motion.div
              key={info}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className={`flex flex-col p-2 rounded border-[1.5px] border-solid border-slate-900 w-full`}
            >
              <h3 className="capitalize text-slate-400 text-sm">
                {info === "reps" ? `${exercise.unit}` : info}
              </h3>
              <p className="font-medium">{exercise[info]}</p>
            </motion.div>
          ))}

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSetIncrement}
            className={`flex flex-col p-2 rounded border-[1.5px] duration-200 border-solid hover:border-blue-600 w-full ${
              progress?.sets === 5 ? "border-green-400" : "border-blue-900"
            }`}
          >
            <h3 className="text-slate-400 text-sm capitalize">
              Sets completed
            </h3>
            <p className={`font-medium ${progressColor}`}>
              {progress?.sets || 0} / 5
            </p>
            <div className="w-full bg-slate-800 h-1 mt-1 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-400"
                initial={{ width: 0 }}
                animate={{ width: `${((progress?.sets || 0) / 5) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}
