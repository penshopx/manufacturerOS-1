import { motion } from 'framer-motion';
import { SceneLayout, SafeFrame, VideoText } from '@/lib/video';

export function Scene3() {
  const metrics = [
    { label: "OEE", value: "82.3%", change: "+2.1%", trend: "up", delay: 0.5 },
    { label: "PPM", value: "850", change: "-50", trend: "down", delay: 0.7 },
    { label: "Output", value: "12,450", change: "+1,200", trend: "up", delay: 0.9 },
  ];

  const alerts = [
    { agent: "Production", action: "Detected bottleneck at Line 4", delay: 1.5, type: 'warning' },
    { agent: "Quality", action: "NCR auto-generated: Surface Scratch", delay: 1.8, type: 'info' },
  ];

  return (
    <SceneLayout className="bg-slate-900 flex justify-center items-center overflow-hidden">
      
      {/* Dynamic Background */}
      <motion.div 
        className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, backgroundPosition: ['0px 0px', '100px 100px'] }}
        exit={{ opacity: 0 }}
        transition={{ 
          backgroundPosition: { duration: 20, repeat: Infinity, ease: 'linear' },
          opacity: { duration: 0.8 }
        }}
      />
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950/40 z-0" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      />

      <SafeFrame className="z-10 w-full h-full flex flex-col justify-center px-16 py-12">
        
        {/* Header */}
        <motion.div 
          className="mb-12 border-l-4 border-teal-500 pl-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <VideoText as="h2" scale="heading" className="text-white mb-2 font-bold">
            Real-time Visibility
          </VideoText>
          <VideoText as="p" scale="body" className="text-slate-400">
            Live Monitoring & Activity Stream
          </VideoText>
        </motion.div>

        <div className="flex gap-10 w-full h-[400px]">
          {/* KPI Dashboard */}
          <div className="flex-1 flex flex-col gap-6">
            {metrics.map((metric) => (
              <motion.div 
                key={metric.label}
                className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 flex justify-between items-center shadow-lg"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: metric.delay }}
              >
                <div>
                  <VideoText as="span" scale="caption" className="text-slate-400 block mb-1">
                    {metric.label}
                  </VideoText>
                  <VideoText as="span" scale="display" className="text-white font-bold">
                    {metric.value}
                  </VideoText>
                </div>
                <div className={`px-4 py-2 rounded-full flex items-center gap-2 ${metric.trend === 'up' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                  {metric.trend === 'up' ? '↗' : '↘'} {metric.change}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Activity Stream */}
          <div className="flex-1 flex flex-col gap-6">
            <motion.div 
              className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 h-full flex flex-col origin-left"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <VideoText as="h3" scale="body" className="text-slate-300 mb-6 flex items-center gap-3 font-semibold">
                <span className="w-3 h-3 rounded-full bg-teal-500 animate-pulse" />
                Live Agent Activity
              </VideoText>
              
              <div className="space-y-4">
                {alerts.map((alert, i) => (
                  <motion.div 
                    key={i}
                    className="p-4 bg-slate-700/50 rounded-xl border border-slate-600/50"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25, delay: alert.delay }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-xs px-2 py-1 rounded-md font-mono ${
                        alert.agent === 'Production' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                      }`}>
                        {alert.agent}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">Just now</span>
                    </div>
                    <VideoText as="p" scale="caption" className="text-slate-200">
                      {alert.action}
                    </VideoText>
                  </motion.div>
                ))}
                
                {/* Typing indicator */}
                <motion.div 
                  className="p-4 flex gap-2 items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 2.5 }}
                >
                  <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="text-sm text-slate-500 ml-2 font-mono">Agents analyzing...</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

      </SafeFrame>
    </SceneLayout>
  );
}
