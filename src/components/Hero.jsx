// Hero section component displayed at the top of the homepage. Uses Framer Motion for animations and scroll-based transformations.
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "./Button";

export default function Hero() {
  const { scrollY } = useScroll(); // Get the current scroll position
  const y1 = useTransform(scrollY, [0, 500], [0, 100]); 
  const opacity = useTransform(scrollY, [0, 300], [1, 0]); // Change opacity based on scroll position

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Background Image */}
      <div
        className="bg-[url('/gym.png')] bg-cover bg-center bg-no-repeat absolute inset-0"
        style={{ filter: "brightness(0.4)" }}
      />

      {/* Content container */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col justify-center items-center text-center max-w-4xl mx-auto px-4"
        style={{ y: y1, opacity }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Transform Your Body with{" "}
          <span className="text-blue-400">PowerUP</span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Personalized workout plans, expert guidance, and a comprehensive
          exercise library to help you achieve your fitness goals.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button to="/generator" text="Create Workout" />
          <Button to="/exercises" text="Browse Exercises" />
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <div className="relative z-20 mb-8 flex justify-center">
        <a href="#features" className="text-white opacity-70 hover:opacity-100 animate-bounce">
          <i className="fa-solid fa-chevron-down text-2xl"></i>
        </a>
      </div>
    </section>
  );
}
