import { useState, useEffect } from 'react';
import { stepsData } from './data/steps';
import GeometrySVG from './components/GeometrySVG';
import StepPanel from './components/StepPanel';
import Subtitle from './components/Subtitle';
import { ttsService, TTSState } from './services/ttsService';
import { ChevronLeft, ChevronRight, RotateCcw, Play, Pause } from 'lucide-react';

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [ttsState, setTtsState] = useState<TTSState>('idle');

  useEffect(() => {
    const unsubscribe = ttsService.subscribe(setTtsState);
    return () => {
      unsubscribe();
      ttsService.stop();
    };
  }, []);

  const handleNext = () => {
    if (currentStep < stepsData.length - 1) {
      ttsService.stop();
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      ttsService.stop();
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleReset = () => {
    ttsService.stop();
    setCurrentStep(0);
  };

  const toggleTTS = () => {
    if (ttsState === 'playing') {
      ttsService.pause();
    } else if (ttsState === 'paused') {
      ttsService.resume();
    } else {
      ttsService.play(stepsData[currentStep].tts);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <header className="h-16 bg-slate-900 text-white flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center space-x-4">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm font-medium rounded-full border border-blue-500/30">
              几何动点综合
            </span>
            <h1 className="text-lg font-semibold tracking-wide">
              “一线三直角”与正方形模型探究
            </h1>
          </div>
          <div className="text-slate-400 text-sm font-medium">
            步骤 {currentStep + 1} / {stepsData.length}
          </div>
        </header>

        {/* Main Content Area (Fixed Height 570px) */}
        <main className="h-[570px] flex flex-col md:flex-row relative">
          
          {/* Left: Visual/SVG Area (55%) */}
          <div className="w-full md:w-[55%] h-full relative bg-white">
            <GeometrySVG step={currentStep} />
            <Subtitle text={stepsData[currentStep].tts} ttsState={ttsState} />
          </div>

          {/* Right: Logic/Explanation Area (45%) */}
          <div className="w-full md:w-[45%] h-full">
            <StepPanel stepData={stepsData[currentStep]} stepIndex={currentStep} />
          </div>

        </main>

        {/* Footer Controls */}
        <footer className="h-16 bg-white border-t border-slate-100 flex items-center justify-between px-6 shrink-0">
          <button
            onClick={handleReset}
            className="flex items-center space-x-2 text-slate-500 hover:text-slate-800 transition-colors px-4 py-2 rounded-lg hover:bg-slate-50"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="font-medium">重新开始</span>
          </button>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTTS}
              className="flex items-center space-x-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors px-5 py-2.5 rounded-xl font-medium"
            >
              {ttsState === 'playing' ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>暂停讲解</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>{ttsState === 'paused' ? '继续讲解' : '播放讲解'}</span>
                </>
              )}
            </button>

            <div className="flex items-center space-x-2 border-l border-slate-200 pl-4">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                disabled={currentStep === stepsData.length - 1}
                className="flex items-center space-x-2 bg-slate-900 text-white px-6 py-2.5 rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
              >
                <span className="font-medium">下一步</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
