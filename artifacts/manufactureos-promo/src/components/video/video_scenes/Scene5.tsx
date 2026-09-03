import { motion, type Variants } from 'framer-motion';
import { SceneLayout, SafeFrame, VideoText } from '@/lib/video';

const springBouncy: Variants = {
  initial: { scale: 0 },
  animate: { scale: 1, transition: { type: 'spring', stiffness: 300, damping: 15 } },
  exit: { scale: 0 }
};

export function Scene5() {
  return (
    <SceneLayout className="bg-slate-900 flex justify-center items-center overflow-hidden">
      
      {/* Background layer */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-40 mix-blend-overlay"
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: 1.1, opacity: 0.4 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 6, ease: "easeOut" }}
      >
        <img 
          src={`${import.meta.env.BASE_URL}images/bg-grid.png`} 
          className="w-full h-full object-cover" 
          alt="Grid" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-950 via-slate-900 to-slate-900" />
      </motion.div>

      <SafeFrame className="z-10 flex flex-col items-center justify-center w-full h-full">
        
        {/* Logo / Brand Name */}
        <motion.div 
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div 
            className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-[0_0_60px_rgba(13,148,136,0.8)]"
            variants={springBouncy}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ delay: 0.3 }}
          >
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </motion.div>
          
          <div className="text-center">
            <VideoText 
              as="h1" 
              scale="display" 
              className="tracking-tight text-white mb-4 font-bold"
            >
              ManufactureOS
            </VideoText>
            
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <VideoText 
                as="p" 
                scale="body" 
                className="text-teal-400 font-medium tracking-wide"
              >
                Masa Depan Manufaktur.
              </VideoText>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA (visual only) */}
        <motion.div 
          className="absolute bottom-16 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <VideoText as="span" scale="caption" className="text-slate-400">
            Jadwalkan Demo Hari Ini
          </VideoText>
          <VideoText as="span" scale="body" className="text-white bg-slate-800/50 px-6 py-2 rounded-full border border-slate-700 font-semibold">
            manufactureos.id
          </VideoText>
        </motion.div>

      </SafeFrame>

    </SceneLayout>
  );
}
