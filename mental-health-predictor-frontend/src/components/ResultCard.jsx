import { motion } from "framer-motion";
import { HiOutlineArrowPath } from "react-icons/hi2";

const MAX_SCORE = 10;
const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function messageForScore(score) {
  if (score >= 7.5) {
    return {
      tone: "Looking steady",
      body: "Your habits are pointing toward solid wellbeing right now. Keep the routines that are working for you.",
    };
  }
  if (score >= 5) {
    return {
      tone: "Room to recover",
      body: "There are a few signs of strain in the mix — a little more sleep, movement, or downtime could help.",
    };
  }
  return {
    tone: "Worth paying attention to",
    body: "Several of your answers point to real strain. Consider talking to someone you trust or a counselor soon.",
  };
}

export default function ResultCard({ score, onRetake }) {
  const clamped = Math.max(0, Math.min(MAX_SCORE, score));
  const progressRatio = clamped / MAX_SCORE;
  const offset = CIRCUMFERENCE * (1 - progressRatio);
  const { tone, body } = messageForScore(clamped);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-3xl border border-mist-200 bg-white p-8 shadow-soft sm:p-10"
    >
      <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:gap-10">
        <div className="relative flex h-36 w-36 shrink-0 items-center justify-center">
          <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90">
            <circle
              cx="64"
              cy="64"
              r={RADIUS}
              fill="none"
              stroke="#EEF2F0"
              strokeWidth="10"
            />
            <motion.circle
              cx="64"
              cy="64"
              r={RADIUS}
              fill="none"
              stroke="#3A6863"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              initial={{ strokeDashoffset: CIRCUMFERENCE }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="font-display text-3xl font-medium text-ink-800">
              {clamped.toFixed(2)}
            </span>
            <span className="text-[11px] text-ink-400">out of {MAX_SCORE}</span>
          </div>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-pine-600">
            {tone}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-600">{body}</p>

          <button
            type="button"
            onClick={onRetake}
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-mist-200 px-4 py-2 text-sm font-medium text-ink-600 transition-colors hover:border-pine-300 hover:text-pine-700"
          >
            <HiOutlineArrowPath className="h-4 w-4" />
            Take it again
          </button>
        </div>
      </div>
    </motion.div>
  );
}
