/* Reusable button component with consistent styling and animations.
Supports both link (router) and function call behaviors.
Features hover animations and loading/disabled states. */
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Button({ to, func, text, disabled = false }) {

  const baseClasses = `
    relative px-6 py-3 bg-slate-950 text-white font-medium rounded-lg
    border border-blue-400 hover:bg-blue-400 hover:text-slate-950
    transition-colors duration-200 focus:outline-none focus:ring-2
    focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-950
    disabled:hover:text-white
  `;

  const buttonContent = (
    <>
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute inset-0 bg-blue-400 rounded-lg"
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
        transition={{ duration: 0.2 }}
      />
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        className={baseClasses}
      >
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      onClick={func}
      disabled={disabled}
      className={baseClasses}
      aria-disabled={disabled}
    >
      {buttonContent}
    </button>
  );
}
