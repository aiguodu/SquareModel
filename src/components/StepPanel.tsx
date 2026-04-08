import { motion, AnimatePresence } from "motion/react";
import { StepData } from "../data/steps";

interface StepPanelProps {
  stepData: StepData;
  stepIndex: number;
}

export default function StepPanel({ stepData, stepIndex }: StepPanelProps) {
  return (
    <div className="w-full h-full p-8 overflow-y-auto bg-slate-50 border-l border-slate-100">
      <AnimatePresence mode="wait">
        <motion.div
          key={stepIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
              {stepData.icon}
            </div>
            <h2 className="text-xl font-bold text-slate-800">{stepData.title}</h2>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
              核心结论
            </h3>
            <p className="text-slate-700 leading-relaxed">
              {stepData.desc}
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
              详细推导过程
            </h3>
            <div className="prose prose-slate prose-sm max-w-none">
              <pre className="whitespace-pre-wrap font-serif text-slate-700 bg-transparent p-0 m-0 text-[15px] leading-loose">
                {stepData.detail}
              </pre>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
