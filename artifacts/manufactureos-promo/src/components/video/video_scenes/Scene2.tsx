import { motion } from 'framer-motion';
import { SceneLayout, SafeFrame, VideoText } from '@/lib/video';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export function Scene2() {
  const agents = [
    { name: 'Production', icon: '⚙️', color: 'from-blue-500 to-blue-700', delay: 0.6 },
    { name: 'Quality', icon: '🎯', color: 'from-green-500 to-green-700', delay: 0.8 },
    { name: 'Compliance', icon: '📝', color: 'from-purple-500 to-purple-700', delay: 1.0 },
    { name: 'HSE', icon: '🛡️', color: 'from-red-500 to-red-700', delay: 1.2 },
  ];

  return (
    <SceneLayout className="bg-slate-900 flex justify-center items-center overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-teal-900/20 blur-[120px]"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 2 }}
        />
        <motion.div 
          className="absolute inset-0 opacity-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </motion.div>
      </div>

      <SafeFrame className="z-10 flex flex-col items-center justify-center w-full">
        
        {/* Title */}
        <motion.div 
          className="text-center mb-16"
          variants={fadeUp}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <VideoText as="h2" scale="heading" className="text-white mb-4 font-bold">
            Specialist Agents
          </VideoText>
          <VideoText as="p" scale="body" className="text-teal-400">
            Satu orkestrator, fungsi tanpa batas
          </VideoText>
        </motion.div>

        {/* Central Hub & Branches */}
        <div className="relative w-full max-w-4xl h-[400px] flex items-center justify-center">
          
          {/* Central AI */}
          <motion.div 
            className="absolute z-20 w-32 h-32 rounded-2xl bg-slate-800 border-2 border-teal-500/50 shadow-[0_0_50px_rgba(13,148,136,0.4)] flex items-center justify-center overflow-hidden"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 45 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
          >
             <img 
              src={`${import.meta.env.BASE_URL}images/ai-chip.png`} 
              className="w-24 h-24 object-cover" 
              alt="AI Core" 
            />
          </motion.div>

          {/* Lines & Agent Nodes */}
          {agents.map((agent, i) => {
            const angle = (i * (360 / agents.length)) * (Math.PI / 180);
            const radius = 220;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <div key={agent.name} className="absolute z-10 w-full h-full flex items-center justify-center">
                {/* Connecting Line */}
                <motion.div 
                  className="absolute h-0.5 bg-gradient-to-r from-teal-500/50 to-transparent"
                  style={{ 
                    width: radius,
                    rotate: `${i * (360 / agents.length)}deg`,
                    transformOrigin: 'left center'
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0 }}
                  transition={{ duration: 0.6, delay: agent.delay - 0.2, ease: "circOut" }}
                />
                
                {/* Agent Node */}
                <motion.div 
                  className="absolute"
                  style={{ x, y }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: agent.delay }}
                >
                  <div className="flex flex-col items-center gap-3 w-32">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${agent.color} flex items-center justify-center text-3xl shadow-lg border border-white/20`}>
                      {agent.icon}
                    </div>
                    <VideoText as="span" scale="caption" className="text-white text-center drop-shadow-md bg-slate-900/80 px-3 py-1 rounded-full border border-slate-700/50 font-medium">
                      {agent.name}
                    </VideoText>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

      </SafeFrame>
    </SceneLayout>
  );
}
