import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const socialIconVariants = {
  hidden: { scale: 0 },
  show: { scale: 1, transition: { type: "spring", stiffness: 260, damping: 20 } },
  hover: { scale: 1.2, rotate: 5, transition: { duration: 0.2 } }
};

export default function Footer() {
  const socialMedia = [
    { name: 'Twitter', icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z', link: 'https://twitter.com' },
    { name: 'Instagram', icon: 'M12 2a10 10 0 00-3.16 19.5c-.07-.7-.12-1.81.03-2.58.14-.7.91-4.42.91-4.42s-.23-.46-.23-1.15c0-1.08.62-1.88 1.41-1.88.66 0 .98.5.98 1.1 0 .67-.43 1.67-.65 2.6-.18.77.39 1.4 1.15 1.4 1.38 0 2.45-1.46 2.45-3.57 0-1.86-1.33-3.16-3.24-3.16-2.21 0-3.5 1.65-3.5 3.34 0 .66.26 1.37.59 1.76.07.08.08.15.06.23-.06.25-.2.8-.22.91-.03.13-.12.18-.26.1-1-.47-1.63-1.94-1.63-3.14 0-2.45 1.77-4.7 5.1-4.7 2.68 0 4.76 1.92 4.76 4.5 0 2.68-1.69 4.83-4.03 4.83-.79 0-1.53-.41-1.78-.9l-.49 1.85c-.17.67-.68 1.5-1.01 2.01A10 10 0 0022 12 10 10 0 0012 2z', link: 'https://instagram.com' },
    { name: 'YouTube', icon: 'M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z M9.75 15.02l5.75-3.27-5.75-3.27v6.54z', link: 'https://youtube.com' },
    { name: 'Facebook', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z', link: 'https://facebook.com' }
  ];

  return (
    <motion.footer 
      className="bg-slate-900 text-white"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="md:col-span-2">
            <Link to="/" className="inline-block">
              <h3 className="text-xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
                PowerUP
              </h3>
            </Link>
            <p className="mt-4 text-gray-300">
              Your personal fitness journey starts here. We provide customized workout routines, 
              expert guidance, and a supportive community to help you reach your fitness goals.
            </p>
            
            <motion.div 
              className="mt-6 flex space-x-4" 
              variants={containerVariants}
            >
              {socialMedia.map((platform) => (
                <motion.a
                  key={platform.name}
                  href={platform.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400"
                  variants={socialIconVariants}
                  whileHover="hover"
                  aria-label={platform.name}
                >
                  <svg 
                    className="w-6 h-6" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    strokeWidth="1.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={platform.icon} />
                  </svg>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { to: '/', text: 'Home' },
                { to: '/exercises', text: 'Exercises' },
                { to: '/generator', text: 'Workout Generator' }
              ].map((link) => (
                <motion.li 
                  key={link.to}
                  variants={itemVariants}
                >
                  <Link 
                    to={link.to} 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="text-blue-400 text-sm">→</span>
                    {link.text}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <motion.li 
                className="text-gray-300 flex items-center gap-2"
                variants={itemVariants}
              >
                <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>powerup@gmail.com</span>
              </motion.li>
              <motion.li 
                className="text-gray-300 flex items-center gap-2"
                variants={itemVariants}
              >
                <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+60 13-992 0928</span>
              </motion.li>
              <motion.li 
                className="text-gray-300 flex items-start gap-2"
                variants={itemVariants}
              >
                <svg className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Saradise Kuching<br />Jalan Stutong, 93350 <br />Kuching, Sarawak
                </span>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
}