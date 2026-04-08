import { motion, AnimatePresence } from "motion/react";

interface GeometrySVGProps {
  step: number;
}

export default function GeometrySVG({ step }: GeometrySVGProps) {
  // Base coordinates
  const O = { x: 100, y: 350 };
  const A = { x: 100, y: 150 };
  const B = { x: 450, y: 350 };
  const P = { x: 300, y: 150 };
  const C = { x: 300, y: 350 };
  const M = { x: 100, y: 250 };
  const N = { x: 400, y: 350 };
  const F = { x: 175, y: 275 };

  // Helper to draw right angle symbol
  const RightAngle = ({ p, p1, p2, size = 15 }: { p: any, p1: any, p2: any, size?: number }) => {
    const dx1 = Math.sign(p1.x - p.x) * size || 0;
    const dy1 = Math.sign(p1.y - p.y) * size || 0;
    const dx2 = Math.sign(p2.x - p.x) * size || 0;
    const dy2 = Math.sign(p2.y - p.y) * size || 0;

    return (
      <path
        d={`M ${p.x + dx1} ${p.y + dy1} L ${p.x + dx1 + dx2} ${p.y + dy1 + dy2} L ${p.x + dx2} ${p.y + dy2}`}
        fill="none"
        stroke="#334155"
        strokeWidth="1.5"
      />
    );
  };

  return (
    <div className="w-full h-full flex items-start justify-center pt-8">
      <svg viewBox="0 0 500 450" className="w-full max-w-[450px] h-auto">
        {/* Base Lines (Always visible) */}
        <line x1={O.x} y1={O.y} x2={A.x} y2={A.y - 30} stroke="#334155" strokeWidth="2" />
        <line x1={O.x} y1={O.y} x2={B.x} y2={B.y} stroke="#334155" strokeWidth="2" />
        <line x1={O.x} y1={O.y} x2={P.x + 50} y2={P.y - 50} stroke="#334155" strokeWidth="2" />
        <line x1={A.x} y1={A.y} x2={P.x + 50} y2={P.y} stroke="#334155" strokeWidth="2" />

        {/* Base Right Angle at A */}
        <RightAngle p={A} p1={O} p2={P} />

        {/* Step 1: Draw PC and highlight square */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.polygon
                points={`${O.x},${O.y} ${A.x},${A.y} ${P.x},${P.y} ${C.x},${C.y}`}
                fill="rgba(59, 130, 246, 0.1)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              />
              <motion.line
                x1={P.x} y1={P.y} x2={C.x} y2={C.y}
                stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8 }}
              />
              <RightAngle p={C} p1={O} p2={P} />
              <RightAngle p={P} p1={A} p2={C} />
            </motion.g>
          )}
        </AnimatePresence>

        {/* Step 2 & 3: Draw PM, PN and highlight triangles */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.line
                x1={P.x} y1={P.y} x2={M.x} y2={M.y}
                stroke="#10b981" strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6 }}
              />
              <motion.line
                x1={P.x} y1={P.y} x2={N.x} y2={N.y}
                stroke="#10b981" strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              />
              <circle cx={M.x} cy={M.y} r="3" fill="#334155" />
              <circle cx={N.x} cy={N.y} r="3" fill="#334155" />
            </motion.g>
          )}
        </AnimatePresence>

        {/* Step 3: Highlight Congruent Triangles */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.polygon
                points={`${A.x},${A.y} ${P.x},${P.y} ${M.x},${M.y}`}
                fill="rgba(239, 68, 68, 0.15)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.polygon
                points={`${C.x},${C.y} ${P.x},${P.y} ${N.x},${N.y}`}
                fill="rgba(16, 185, 129, 0.15)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
              {/* Angle arcs for APM and CPN */}
              <path d={`M ${P.x - 30} ${P.y} A 30 30 0 0 0 ${P.x - 25} ${P.y + 12}`} fill="none" stroke="#ef4444" strokeWidth="2" />
              <path d={`M ${P.x} ${P.y + 30} A 30 30 0 0 0 ${P.x + 15} ${P.y + 26}`} fill="none" stroke="#10b981" strokeWidth="2" />
            </motion.g>
          )}
        </AnimatePresence>

        {/* Step 5 & 6: Draw MN and F */}
        <AnimatePresence>
          {step >= 5 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.line
                x1={M.x} y1={M.y} x2={N.x} y2={N.y}
                stroke="#f59e0b" strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8 }}
              />
              <circle cx={F.x} cy={F.y} r="3" fill="#f59e0b" />
            </motion.g>
          )}
        </AnimatePresence>

        {/* Step 6: Coordinate Axes */}
        <AnimatePresence>
          {step >= 6 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.line x1={O.x - 30} y1={O.y} x2={O.x} y2={O.y} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,4" />
              <motion.line x1={O.x} y1={O.y + 30} x2={O.x} y2={O.y} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,4" />
              <text x={B.x - 10} y={O.y + 20} className="font-serif italic text-sm fill-slate-500">x</text>
              <text x={O.x - 20} y={A.y - 20} className="font-serif italic text-sm fill-slate-500">y</text>
            </motion.g>
          )}
        </AnimatePresence>

        {/* Labels */}
        <text x={O.x - 20} y={O.y + 20} className="font-serif italic text-lg fill-slate-700">O</text>
        <text x={A.x - 20} y={A.y - 5} className="font-serif italic text-lg fill-slate-700">A</text>
        <text x={B.x + 10} y={B.y + 5} className="font-serif italic text-lg fill-slate-700">B</text>
        <text x={P.x + 10} y={P.y - 10} className="font-serif italic text-lg fill-slate-700">P</text>
        
        {step >= 1 && <text x={C.x + 10} y={C.y + 20} className="font-serif italic text-lg fill-slate-700">C</text>}
        {step >= 2 && (
          <>
            <text x={M.x - 25} y={M.y + 5} className="font-serif italic text-lg fill-slate-700">M</text>
            <text x={N.x + 5} y={N.y + 25} className="font-serif italic text-lg fill-slate-700">N</text>
          </>
        )}
        {step >= 5 && <text x={F.x - 5} y={F.y - 10} className="font-serif italic text-lg fill-slate-700">F</text>}

      </svg>
    </div>
  );
}
