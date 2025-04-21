// A component that wraps pages with animation effects for enter/exit transitions and reuse purpose. 
import React from 'react'
import { motion } from 'framer-motion';

export default function AnimatedPage({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}