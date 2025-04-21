import { motion } from "framer-motion";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="w-12 h-12 rounded-full border-4 border-blue-400 border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
        aria-hidden="true"
      />
      <span className="text-base px-3">Loading...</span>
    </div>
  );
}
