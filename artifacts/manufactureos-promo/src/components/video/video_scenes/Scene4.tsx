import { motion } from 'framer-motion';
import { SceneLayout, SafeFrame, VideoText } from '@/lib/video';

export function Scene4() {
  const codeLines = [
    { text: "> initializing Open CLAW...", delay: 0.5 },
    { text: "> processing command: 'Buat NCR untuk defect di Line 1'", delay: 1.2 },
    { text: "[Quality Agent] Analyzing defect pattern...", delay: 2.0, color: "text-green-400" },
    { text: "[Quality Agent] Defect confirmed: Surface Scratch", delay: 2.8, color: "text-green-400" },
    { text: "> executing task: create_ncr", delay: 3.5, color: "text-purple-400" },
    { text: "[SUCCESS] NCR-2026-0317-004 generated.", delay: 4.2, color: "text-emerald-400" },
  ];

  return (
    <SceneLayout className="bg-slate-900 flex justify-center items-center overflow-hidden">
      
      {/* Background */}
      <motion.div 
        className="absolute inset-0 z-0 bg-gradient-to-tr from-purple-900/20 to-slate-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      />

      <SafeFrame className="z-10 w-full h-full flex flex-col justify-center px-16">
        
        <div className="flex gap-12 items-center w-full h-full">
          
          {/* Left Text */}
          <div className="flex-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <VideoText as="h2" scale="heading" className="text-white font-bold">
                  Open CLAW
                </VideoText>
              </div>
              <VideoText as="p" scale="body" className="text-purple-300">
                Command Language for Autonomous Workflows
              </VideoText>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <VideoText as="p" scale="caption" className="text-slate-400 leading-relaxed max-w-md">
                Ubah perintah bahasa natural menjadi aksi sistem nyata. Eksekusi lintas agen otomatis.
              </VideoText>
            </motion.div>
          </div>

          {/* Right Terminal */}
          <div className="flex-[1.2]">
            <motion.div 
              className="bg-[#0c1017] rounded-xl border border-slate-700/80 shadow-2xl overflow-hidden h-[400px] w-full flex flex-col"
              initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 1.1, rotateY: 10 }}
              transition={{ type: "spring", stiffness: 150, damping: 20, delay: 0.3 }}
              style={{ perspective: 1000 }}
            >
              {/* Terminal Header */}
              <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700/80 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-4 text-xs font-mono text-slate-400">claw-executor.sh</span>
              </div>
              
              {/* Terminal Body */}
              <div className="p-6 font-mono text-lg space-y-3 flex-1 overflow-hidden">
                {codeLines.map((line, i) => (
                  <motion.div
                    key={i}
                    className={line.color || "text-slate-300"}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: line.delay }}
                  >
                    {line.text}
                  </motion.div>
                ))}
                
                {/* Blinking Cursor */}
                <motion.div
                  className="w-3 h-6 bg-purple-400 mt-2"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 4.5 }}
                />
              </div>
            </motion.div>
          </div>
          
        </div>
      </SafeFrame>
    </SceneLayout>
  );
}
