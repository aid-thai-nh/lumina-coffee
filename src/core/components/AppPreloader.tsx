import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coffee, Sparkles, ChevronRight } from 'lucide-react';
import { projectConfig } from '../../config/project.config';

interface AppPreloaderProps {
  onComplete: () => void;
  minDuration?: number; // milliseconds
}

const LOADING_STAGES = [
  {
    progress: 25,
    titleVi: 'Tuyển chọn hạt cà phê đặc sản',
    titleEn: 'Selecting specialty green lots',
    subtitleVi: 'Arabica Cầu Đất & Typica sơ chế yếm khí...',
    subtitleEn: 'High-altitude Arabica & anaerobic lots...',
  },
  {
    progress: 55,
    titleVi: 'Cân chỉnh tỉ lệ chiết xuất vàng',
    titleEn: 'Calibrating golden extraction profile',
    subtitleVi: 'Nhiệt độ nước 93°C và áp suất mộc 9 bar...',
    subtitleEn: 'Water temp at 93°C with balanced bar pressure...',
  },
  {
    progress: 85,
    titleVi: 'Đánh thức tầng hương tinh tế',
    titleEn: 'Unlocking blooming tasting notes',
    subtitleVi: 'Hương quả mọng chín, hoa cam và hậu vị caramel mượt...',
    subtitleEn: 'Ripe berries, orange blossoms and silky caramel finish...',
  },
  {
    progress: 100,
    titleVi: 'Chào mừng đến với Lumina Coffee',
    titleEn: 'Welcome to Lumina Roastery & Atelier',
    subtitleVi: 'Trải nghiệm không gian cà phê nghệ nhân đương đại...',
    subtitleEn: 'Step into an artisanal coffee sanctuary...',
  },
];

export const AppPreloader: React.FC<AppPreloaderProps> = ({
  onComplete,
  minDuration = 1800,
}) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Progressive timer
  useEffect(() => {
    const startTime = Date.now();
    const intervalTime = 30;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min(
        100,
        Math.floor((elapsed / minDuration) * 100)
      );

      setProgress(calculatedProgress);

      if (calculatedProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(() => {
            onComplete();
          }, 500); // Wait for exit animation
        }, 300);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [minDuration, onComplete]);

  // Find current stage based on progress
  const currentStage =
    LOADING_STAGES.find((s) => progress <= s.progress) ||
    LOADING_STAGES[LOADING_STAGES.length - 1];

  const handleSkip = () => {
    setIsFinished(true);
    setTimeout(onComplete, 200);
  };

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="app-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#150b06] text-white select-none overflow-hidden"
        >
          {/* Subtle Ambient Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#d36b00]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-[#ea7c1b]/20 rounded-full blur-2xl pointer-events-none" />

          {/* Top Skip Button */}
          <div className="absolute top-6 right-6">
            <button
              onClick={handleSkip}
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white text-xs font-semibold tracking-wider transition-all flex items-center gap-1 cursor-pointer border border-white/10"
              title="Bỏ qua chờ đợi và vào thẳng website"
            >
              <span>Vào nhanh</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Main Hero Container */}
          <div className="relative z-10 max-w-md w-full px-6 flex flex-col items-center text-center">
            {/* Animated Dripper & Coffee Cup Icon */}
            <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
              {/* Spinning Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-dashed border-[#c68e58]/40"
              />

              {/* Pulse Ambient Ring */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-1 rounded-full bg-gradient-to-tr from-[#ea7c1b]/30 to-[#d36b00]/10"
              />

              {/* Central Coffee Cup */}
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-b from-[#2c1810] to-[#1a0e08] border border-[#c68e58]/50 shadow-xl flex items-center justify-center">
                <Coffee className="w-7 h-7 text-[#ea7c1b]" />

                {/* Steam Waves */}
                <motion.span
                  animate={{ y: [-2, -8, -12], opacity: [0, 0.8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut', delay: 0.1 }}
                  className="absolute -top-3 left-4 w-1 h-3 rounded-full bg-[#ea7c1b]/60 blur-[0.5px]"
                />
                <motion.span
                  animate={{ y: [-2, -9, -14], opacity: [0, 0.9, 0] }}
                  transition={{ duration: 1.7, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
                  className="absolute -top-4 left-7 w-1 h-4 rounded-full bg-[#ffdcc3]/70 blur-[0.5px]"
                />
                <motion.span
                  animate={{ y: [-2, -7, -11], opacity: [0, 0.7, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut', delay: 0.7 }}
                  className="absolute -top-3 left-9 w-1 h-2.5 rounded-full bg-[#ea7c1b]/60 blur-[0.5px]"
                />
              </div>
            </div>

            {/* Brand Title */}
            <div className="mb-6 space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-[#ea7c1b] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Specialty Coffee Experience</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-wider text-[#ffdcc3] uppercase">
                {projectConfig.client.brandName}
              </h1>
              <p className="text-xs tracking-[0.2em] text-[#8c7a6b] uppercase font-medium">
                {projectConfig.client.tagline}
              </p>
            </div>

            {/* Stage Message */}
            <div className="min-h-[56px] flex flex-col items-center justify-center mb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStage.titleVi}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-1"
                >
                  <p className="text-sm font-semibold text-white/90">
                    {currentStage.titleVi}
                  </p>
                  <p className="text-xs text-[#8c7a6b]">
                    {currentStage.subtitleVi}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full max-w-xs space-y-2">
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/5 relative">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#835423] via-[#ea7c1b] to-[#ffdcc3] shadow-[0_0_12px_rgba(234,124,27,0.8)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>

              {/* Percentage & Notes */}
              <div className="flex items-center justify-between text-[11px] font-mono text-[#8c7a6b]">
                <span className="tracking-wider">BREWING TASTE</span>
                <span className="font-bold text-[#ea7c1b]">{progress}%</span>
              </div>
            </div>
          </div>

          {/* Footer Quality Stamp */}
          <div className="absolute bottom-6 left-0 right-0 text-center">
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/30">
              SCA 85+ Specialty Standard • Dalat Terroir
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
