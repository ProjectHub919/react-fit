/* 404 Not Found page component. 
Displayed when users navigate to non-existent routes. */
import React from "react";
import Button from "../components/Button";
import { motion } from "framer-motion";
import AnimatedPage from "../components/AnimatedPage";

export default function NotFound() {
  return (
    <AnimatedPage>
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            id="error-title"
            className="text-6xl font-bold text-blue-400 mb-4"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            404
          </motion.h1>
          <motion.h2
            className="text-2xl font-semibold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Page Not Found
          </motion.h2>
          <motion.p
            className="text-gray-400 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            The page you're looking for doesn't exist or has been moved.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button to="/" text="Return Home" />
          </motion.div>
        </motion.div>
      </div>
    </AnimatedPage>
  );
}
