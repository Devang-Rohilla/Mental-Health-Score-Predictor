import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiChevronDown } from "react-icons/hi2";

/**
 * A styled replacement for <select> so every Literal-type field
 * (gender, platform, purpose, stress level, country) looks and
 * behaves consistently, with an optional search box for long lists.
 */
export default function SelectField({
  label,
  placeholder = "Choose one",
  value,
  onChange,
  options,
  searchable = false,
  required = false,
  error,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = useMemo(() => {
    if (!searchable || !query.trim()) return options;
    return options.filter((option) =>
      option.toLowerCase().includes(query.trim().toLowerCase())
    );
  }, [options, query, searchable]);

  return (
    <div className="flex flex-col gap-1.5" ref={wrapperRef}>
      <label className="text-sm font-medium text-ink-600">
        {label}
        {required && <span className="text-clay-600"> *</span>}
      </label>

      <div className="relative">
        <motion.button
          type="button"
          whileTap={{ scale: 0.99 }}
          onClick={() => setOpen((prev) => !prev)}
          className={`flex w-full items-center justify-between rounded-xl border bg-white px-4 py-3 text-left text-sm shadow-field transition-colors ${
            error ? "border-clay-500" : "border-mist-200 hover:border-pine-300"
          } ${open ? "border-pine-500 ring-2 ring-pine-100" : ""}`}
        >
          <span className={value ? "text-ink-800" : "text-ink-400"}>
            {value || placeholder}
          </span>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <HiChevronDown className="h-4 w-4 text-ink-400" />
          </motion.span>
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-mist-200 bg-white shadow-soft"
            >
              {searchable && (
                <div className="border-b border-mist-100 p-2">
                  <input
                    autoFocus
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search country"
                    className="w-full rounded-lg bg-mist-50 px-3 py-2 text-sm outline-none placeholder:text-ink-400"
                  />
                </div>
              )}
              <div className="max-h-56 overflow-y-auto py-1">
                {filtered.length === 0 && (
                  <p className="px-4 py-3 text-sm text-ink-400">No matches</p>
                )}
                {filtered.map((option) => (
                  <button
                    type="button"
                    key={option}
                    onClick={() => {
                      onChange(option);
                      setOpen(false);
                      setQuery("");
                    }}
                    className={`block w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-pine-50 ${
                      option === value ? "bg-pine-50 text-pine-700 font-medium" : "text-ink-600"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && <span className="text-xs text-clay-600">{error}</span>}
    </div>
  );
}
