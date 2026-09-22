import { motion } from "framer-motion";
import { STEP_META } from "../constants/formOptions";

export default function ProgressTrack({ currentStep }) {
  return (
    <ol className="flex items-start gap-2">
      {STEP_META.map((step, index) => {
        const state =
          index < currentStep ? "done" : index === currentStep ? "active" : "upcoming";
        return (
          <li key={step.title} className="flex flex-1 flex-col gap-2">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold transition-colors ${
                  state === "upcoming"
                    ? "bg-mist-100 text-ink-400"
                    : "bg-pine-700 text-white"
                }`}
              >
                {index + 1}
              </span>
              <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-mist-100">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-pine-600"
                  initial={false}
                  animate={{ width: state === "upcoming" ? "0%" : "100%" }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                />
              </div>
            </div>
            <div className="hidden sm:block">
              <p
                className={`text-xs font-semibold ${
                  state === "upcoming" ? "text-ink-400" : "text-ink-800"
                }`}
              >
                {step.title}
              </p>
              <p className="text-[11px] text-ink-400">{step.caption}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
