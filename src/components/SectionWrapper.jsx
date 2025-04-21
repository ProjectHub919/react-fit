/* component that provides consistent section styling and animations
Used across the application to maintain visual consistency and add scroll-based animations */
import React from 'react'
import { motion } from 'framer-motion';

export default function SectionWrapper({ children, header, title, id }) {
  return (
    <section id={id} className='min-h-screen flex flex-col gap-10'>
      <motion.div 
        className='py-10 flex flex-col gap-2 justify-center items-center p-4'
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }} // to load the section when it is 100px away from the viewport 
      >
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className='uppercase font-medium'
        >
          {header}
        </motion.p>
        <motion.h2 
          className='font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center '
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          {title[0]}{' '}
          <span className='uppercase text-blue-400'>{title[1]}</span>{' '}
          {title[2]}
        </motion.h2>
      </motion.div>
      
      <motion.div 
        className='max-w-[800px] w-full flex flex-col mx-auto gap-10 p-4'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.4 }}
      >
        {children}
      </motion.div>
    </section>
  );
}