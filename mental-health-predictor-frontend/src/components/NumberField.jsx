import { motion } from "framer-motion";

export default function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix,
  required = false,
  error,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-ink-600">
        {label}
        {required && <span className="text-clay-600"> *</span>}
      </label>
      <motion.div
        whileFocus={{ scale: 1.01 }}
        className={`flex items-center rounded-xl border bg-white px-4 py-3 shadow-field transition-colors focus-within:border-pine-500 focus-within:ring-2 focus-within:ring-pine-100 ${
          error ? "border-clay-500" : "border-mist-200 hover:border-pine-300"
        }`}
      >
        <input
          type="number"
          inputMode="decimal"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(event) => onChange(event.target.value)}
          placeholder={`${min}–${max}`}
          className="w-full bg-transparent text-sm text-ink-800 outline-none placeholder:text-ink-400"
        />
        {suffix && <span className="ml-2 shrink-0 text-xs text-ink-400">{suffix}</span>}
      </motion.div>
      {error && <span className="text-xs text-clay-600">{error}</span>}
    </div>
  );
}
