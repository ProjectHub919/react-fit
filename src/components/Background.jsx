import React from "react";
import { motion } from "framer-motion";

const Background = () => {
  const circlePath =
    "M200,200 m-100,0 a100,100 0 1,0 200,0 a100,100 0 1,0 -200,0"; // Circle
  const starPath =
    "M200,200 Q150,50 100,200 Q150,350 200,200 Q250,50 300,200 Q250,350 200,200"; // Star
  const wavePath =
    "M200,200 Q180,100 120,190 Q160,300 210,200 Q280,130 280,210 Q220,290 200,200"; // Wave-like shape

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(to right, #1e3c72, #2a5298)",
      }}
    >
      <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d={circlePath}
          stroke="white"
          fill="none"
          strokeWidth="4"
          initial={{ pathLength: 1 }}
          animate={{
            d: [circlePath, starPath, wavePath, circlePath], // Morphing paths
          }}
          transition={{
            duration: 6, // Duration for one cycle
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      </svg>
    </div>
  );
};

export default Background;
