import { Outlet } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

/* This is the main layout component that wraps around all pages in the app
It includes the Navbar, Footer, and ScrollToTop components in all pages */
export default function Layout() {
  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-r from-slate-800 to-slate-950 text-white text-sm sm:text-base'>
      <Navbar />
      {/* Enables smooth entrance/exit animations for pages */}
      <AnimatePresence>
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex-grow"
        >
          {/* This is where the child routes will be rendered (under layout like HomePage, ExerciseSearch Page) to share common layout elements like navbar*/}
          <Outlet />  
        </motion.main>
      </AnimatePresence>
      <Footer />
      <ScrollToTop />
    </div>
  );
}