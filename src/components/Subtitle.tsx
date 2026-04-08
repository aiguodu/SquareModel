import { motion, AnimatePresence } from "motion/react";
import { TTSState } from "../services/ttsService";
import { Loader2, Volume2, Pause } from "lucide-react";

interface SubtitleProps {
  text: string;
  ttsState: TTSState;
}

export default function Subtitle({ text, ttsState }: SubtitleProps) {
  const isVisible = ttsState !== 'idle';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] z-50"
        >
          <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/10 flex items-start space-x-4 max-h-[120px] overflow-y-auto">
            <div className="flex-shrink-0 mt-1">
              {ttsState === 'loading' && <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />}
              {ttsState === 'playing' && <Volume2 className="w-5 h-5 text-green-400 animate-pulse" />}
              {ttsState === 'paused' && <Pause className="w-5 h-5 text-amber-400" />}
            </div>
            <p className="text-white/90 text-base leading-relaxed font-medium tracking-wide">
              {text}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
