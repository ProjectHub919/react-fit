// Exercise search page that provides a searchable exercise library.
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ExerciseCard from "../components/ExerciseCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { EXERCISES } from "../utils/swoldier";
import ReactPaginate from "react-paginate";

export default function ExerciseSearch() {
  // State variables for search term, workout type, muscle group, loading state, exercises, pagination state and refs
  const [searchTerm, setSearchTerm] = useState("");
  const [workoutType, setWorkoutType] = useState("all");
  const [muscleGroup, setMuscleGroup] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const exercisesPerPage = 12;
  const typeSelectRef = useRef(null);
  const muscleSelectRef = useRef(null);

  // Handle search and filtering
  useEffect(() => {
    // Retrieve exercises from the EXERCISES object and filter based on search term, workout type, and muscle group
    // Use Object.entries to convert the EXERCISES object into an array of [key, value] pairs
    const fetchExercises = async () => {
      setIsLoading(true);
      try {
        const exerciseArray = Object.entries(EXERCISES).map(
          ([name, details]) => ({
            id: name,
            name: name,
            ...details,
          })
        );

        // Filter exercises based on search term, workout type, and muscle group
        const filteredExercises = exerciseArray.filter((exercise) => {
          const matchesSearch =
            searchTerm === "" ||
            exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exercise.muscles.some((muscle) =>
              muscle.toLowerCase().includes(searchTerm.toLowerCase())
            );

          const matchesType =
            workoutType === "all" || exercise.type === workoutType;

          const matchesMuscle =
            muscleGroup === "all" || exercise.muscles.includes(muscleGroup);

          return matchesSearch && matchesType && matchesMuscle;
        });

        setExercises(filteredExercises); // Update exercises state with filtered results
      } catch (error) {
        console.error("Error filtering exercises:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    const debounceTimeout = setTimeout(fetchExercises, 300); // delay the execution of the fetchExercises function instead of keep getting called on every keystroke
    setCurrentPage(0); // Reset to first page on new search/filter
    return () => clearTimeout(debounceTimeout);
  }, [searchTerm, workoutType, muscleGroup]);

  // Get current exercises for pagination
  const indexOfLastExercise = (currentPage + 1) * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );
  const totalPages = Math.ceil(exercises.length / exercisesPerPage);

  // Pagination controls
  const handlePageChange = ({ selected }) => setCurrentPage(selected);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and filter controls */}
      <div className="space-y-4 mb-8">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search exercises..."
            className="w-full px-4 py-2 bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              X
            </button>
          )}
        </div>

        {/* Workout type select */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <select
              ref={typeSelectRef}
              value={workoutType}
              onChange={(e) => setWorkoutType(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="all">All Types</option>
              <option value="compound">Compound</option>
              <option value="accessory">Accessory</option>
            </select>
          </div>

          {/* Muscle group select */}
          <div>
            <select
              ref={muscleSelectRef}
              value={muscleGroup}
              onChange={(e) => setMuscleGroup(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="all">All Muscle Groups</option>
              <option value="chest">Chest</option>
              <option value="back">Back</option>
              <option value="shoulders">Shoulders</option>
              <option value="biceps">Biceps</option>
              <option value="triceps">Triceps</option>
              <option value="abs">Abs</option>
              <option value="quads">Quads</option>
              <option value="hamstrings">Hamstrings</option>
              <option value="glutes">Glutes</option>
              <option value="calves">Calves</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      ) : exercises.length > 0 ? (
        <>
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {currentExercises.map((exercise, index) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                i={index}
                progress={null}
                onProgressUpdate={null}
                onExerciseSearch={true}
              />
            ))}
          </motion.div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <ReactPaginate
              previousLabel={"←"}
              nextLabel={"→"}
              breakLabel={"..."}
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={"flex space-x-2 cursor-pointer inset-0"}
              pageClassName={"px-3 py-1 rounded-lg bg-slate-800 text-gray-400 hover:bg-blue-500 hover:text-white"}
              previousClassName={"px-3 py-1 rounded-lg bg-slate-800 text-gray-400 hover:bg-blue-500 hover:text-white"}
              nextClassName={"px-3 py-1 rounded-lg bg-slate-800 text-gray-400 hover:bg-blue-500 hover:text-white"}
              activeClassName={"bg-blue-500 text-white"}
              disabledClassName={"opacity-50 cursor-not-allowed"}
            />
          </div>
        </>
      ) : searchTerm || workoutType !== "all" || muscleGroup !== "all" ? (
        <div className="text-center py-12 text-gray-400">
          <p>No exercises found matching your criteria.</p>
        </div>
      ) : null}
    </div>
  );
}
