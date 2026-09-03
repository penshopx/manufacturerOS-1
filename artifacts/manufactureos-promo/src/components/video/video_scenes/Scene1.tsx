import { motion, type Variants } from 'framer-motion';
import { SceneLayout, SafeFrame, VideoText } from '@/lib/video';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const slideUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 }
};

const springBouncy: Variants = {
  initial: { scale: 0 },
  animate: { scale: 1, transition: { type: 'spring', stiffness: 300, damping: 15 } },
  exit: { scale: 0 }
};

export function Scene1() {
  return (
    <SceneLayout className="bg-transparent flex flex-col justify-center items-center">
      
      {/* Background layer */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-40"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 4, ease: "easeOut" }}
      >
        <img 
          src={`${import.meta.env.BASE_URL}images/manufacturing-hero.png`} 
          className="w-full h-full object-cover" 
          alt="Factory" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/30" />
      </motion.div>

      {/* Grid overlay */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-30 mix-blend-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <img 
          src={`${import.meta.env.BASE_URL}images/bg-grid.png`} 
          className="w-full h-full object-cover" 
          alt="Grid" 
        />
      </motion.div>

      <SafeFrame className="z-10 flex flex-col items-center justify-center h-full">
        {/* Logo / Brand Name */}
        <motion.div 
          className="flex items-center gap-4 mb-6"
          variants={springBouncy}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.div 
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-[0_0_40px_rgba(13,148,136,0.6)]"
            initial={{ rotate: -90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <VideoText 
              as="h1" 
              scale="display"
              className="tracking-tight text-white drop-shadow-xl font-bold"
            >
              ManufactureOS
            </VideoText>
          </motion.div>
        </motion.div>

        {/* Tagline */}
        <div className="overflow-hidden">
          <motion.div
            variants={slideUp}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={1}
            transition={{ delay: 1 }}
          >
            <VideoText 
              as="h2" 
              scale="heading"
              className="text-teal-400 font-display text-center font-medium"
            >
              AI Command Center
            </VideoText>
          </motion.div>
        </div>
        
        <div className="overflow-hidden mt-3">
          <motion.div
            variants={slideUp}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={2}
            transition={{ delay: 1.2 }}
          >
            <VideoText 
              as="p" 
              scale="body"
              className="text-slate-300 text-center"
            >
              untuk Manufaktur Indonesia.
            </VideoText>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <motion.div 
          className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-teal-500 to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 1, delay: 2, ease: "circOut" }}
          style={{ transformOrigin: "top" }}
        />
      </SafeFrame>

    </SceneLayout>
  );
}
