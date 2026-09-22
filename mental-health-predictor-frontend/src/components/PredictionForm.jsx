import { useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";

import SelectField from "./SelectField";
import NumberField from "./NumberField";
import ProgressTrack from "./ProgressTrack";
import ResultCard from "./ResultCard";
import {
  ACADEMIC_LEVEL_OPTIONS,
  COUNTRY_OPTIONS,
  GENDER_OPTIONS,
  INITIAL_FORM_STATE,
  PLATFORM_OPTIONS,
  PURPOSE_OPTIONS,
  STEP_FIELDS,
  STEP_META,
  STRESS_OPTIONS,
} from "../constants/formOptions";

const API_URL = "http://localhost:8000/predict";

function validateStep(stepIndex, form) {
  const errors = {};
  for (const field of STEP_FIELDS[stepIndex]) {
    const value = form[field];
    if (value === "" || value === null || value === undefined) {
      errors[field] = "Required";
      continue;
    }
    if (field === "age" && (Number(value) < 10 || Number(value) > 100)) {
      errors[field] = "Enter an age between 10 and 100";
    }
    if (
      ["avg_daily_usage_hours", "study_hours", "physical_activity_hours", "sleep_hours_per_night"].includes(
        field
      ) &&
      (Number(value) < 0 || Number(value) > 24)
    ) {
      errors[field] = "Must be between 0 and 24";
    }
    if (field === "daily_unlocks" && Number(value) < 0) {
      errors[field] = "Can't be negative";
    }
  }
  return errors;
}

export default function PredictionForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [score, setScore] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [direction, setDirection] = useState(1);

  const isLastStep = step === STEP_META.length - 1;

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function goNext() {
    const stepErrors = validateStep(step, form);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setDirection(1);
    setStep((prev) => Math.min(prev + 1, STEP_META.length - 1));
  }

  function goBack() {
    setDirection(-1);
    setStep((prev) => Math.max(prev - 1, 0));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const stepErrors = validateStep(step, form);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    const payload = {
      age: Number(form.age),
      gender: form.gender,
      country: form.country,
      academic_level: form.academic_level,
      most_used_platform: form.most_used_platform,
      purpose_of_use: form.purpose_of_use,
      avg_daily_usage_hours: Number(form.avg_daily_usage_hours),
      daily_unlocks: Number(form.daily_unlocks),
      study_hours: Number(form.study_hours),
      physical_activity_hours: Number(form.physical_activity_hours),
      sleep_hours_per_night: Number(form.sleep_hours_per_night),
      stress_level: form.stress_level,
    };

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await axios.post(API_URL, payload, {
        headers: { "Content-Type": "application/json" },
        timeout: 15000,
      });
      const predicted = response.data?.predicted_mental_health_score;
      if (typeof predicted !== "number") {
        throw new Error("The server responded without a usable score.");
      }
      setScore(predicted);
      setStatus("success");
    } catch (error) {
      let message = "Something went wrong reaching the prediction service.";
      if (error.code === "ECONNABORTED") {
        message = "The request timed out. Is the FastAPI server still running?";
      } else if (error.response) {
        message =
          error.response.data?.detail ||
          `The server returned an error (status ${error.response.status}).`;
      } else if (error.request) {
        message =
          "Couldn't reach the server at localhost:8000. Make sure the FastAPI backend is running and CORS is enabled.";
      }
      setErrorMessage(message);
      setStatus("error");
    }
  }

  function handleRetake() {
    setForm(INITIAL_FORM_STATE);
    setErrors({});
    setScore(null);
    setStatus("idle");
    setStep(0);
  }

  if (status === "success" && score !== null) {
    return <ResultCard score={score} onRetake={handleRetake} />;
  }

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 24 : -24, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -24 : 24, opacity: 0 }),
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-mist-200 bg-white p-6 shadow-soft sm:p-9"
    >
      <ProgressTrack currentStep={step} />

      <div className="mt-8 min-h-[19rem] overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2"
          >
            {step === 0 && (
              <>
                <NumberField
                  label="Age"
                  value={form.age}
                  onChange={(v) => updateField("age", v)}
                  min={10}
                  max={100}
                  step={1}
                  required
                  error={errors.age}
                />
                <SelectField
                  label="Gender"
                  value={form.gender}
                  onChange={(v) => updateField("gender", v)}
                  options={GENDER_OPTIONS}
                  required
                  error={errors.gender}
                />
                <SelectField
                  label="Country"
                  value={form.country}
                  onChange={(v) => updateField("country", v)}
                  options={COUNTRY_OPTIONS}
                  searchable
                  required
                  error={errors.country}
                />
                <SelectField
                  label="Academic level"
                  value={form.academic_level}
                  onChange={(v) => updateField("academic_level", v)}
                  options={ACADEMIC_LEVEL_OPTIONS}
                  required
                  error={errors.academic_level}
                />
              </>
            )}

            {step === 1 && (
              <>
                <SelectField
                  label="Most-used platform"
                  value={form.most_used_platform}
                  onChange={(v) => updateField("most_used_platform", v)}
                  options={PLATFORM_OPTIONS}
                  searchable
                  required
                  error={errors.most_used_platform}
                />
                <SelectField
                  label="Main purpose of use"
                  value={form.purpose_of_use}
                  onChange={(v) => updateField("purpose_of_use", v)}
                  options={PURPOSE_OPTIONS}
                  required
                  error={errors.purpose_of_use}
                />
                <NumberField
                  label="Average daily usage"
                  value={form.avg_daily_usage_hours}
                  onChange={(v) => updateField("avg_daily_usage_hours", v)}
                  min={0}
                  max={24}
                  step={0.1}
                  suffix="hrs"
                  required
                  error={errors.avg_daily_usage_hours}
                />
                <NumberField
                  label="Daily phone unlocks"
                  value={form.daily_unlocks}
                  onChange={(v) => updateField("daily_unlocks", v)}
                  min={0}
                  step={1}
                  suffix="times"
                  required
                  error={errors.daily_unlocks}
                />
              </>
            )}

            {step === 2 && (
              <>
                <NumberField
                  label="Study hours per day"
                  value={form.study_hours}
                  onChange={(v) => updateField("study_hours", v)}
                  min={0}
                  max={24}
                  step={0.1}
                  suffix="hrs"
                  required
                  error={errors.study_hours}
                />
                <NumberField
                  label="Physical activity per day"
                  value={form.physical_activity_hours}
                  onChange={(v) => updateField("physical_activity_hours", v)}
                  min={0}
                  max={24}
                  step={0.1}
                  suffix="hrs"
                  required
                  error={errors.physical_activity_hours}
                />
                <NumberField
                  label="Sleep per night"
                  value={form.sleep_hours_per_night}
                  onChange={(v) => updateField("sleep_hours_per_night", v)}
                  min={0}
                  max={24}
                  step={0.1}
                  suffix="hrs"
                  required
                  error={errors.sleep_hours_per_night}
                />
                <SelectField
                  label="Current stress level"
                  value={form.stress_level}
                  onChange={(v) => updateField("stress_level", v)}
                  options={STRESS_OPTIONS}
                  required
                  error={errors.stress_level}
                />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {status === "error" && (
        <div className="mt-6 rounded-xl border border-clay-400 bg-clay-200/40 px-4 py-3 text-sm text-ink-800">
          {errorMessage}
        </div>
      )}

      <div className="mt-8 flex items-center justify-between border-t border-mist-100 pt-6">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 0}
          className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium text-ink-600 transition-colors hover:text-pine-700 disabled:pointer-events-none disabled:opacity-0"
        >
          <HiOutlineArrowLeft className="h-4 w-4" />
          Back
        </button>

        {!isLastStep ? (
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={goNext}
            className="inline-flex items-center gap-2 rounded-xl bg-pine-700 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pine-600"
          >
            Continue
            <HiOutlineArrowRight className="h-4 w-4" />
          </motion.button>
        ) : (
          <motion.button
            type="submit"
            whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
            whileTap={{ scale: status === "loading" ? 1 : 0.98 }}
            disabled={status === "loading"}
            className="inline-flex min-w-[9.5rem] items-center justify-center gap-2 rounded-xl bg-pine-700 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pine-600 disabled:opacity-80"
          >
            {status === "loading" ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Checking in…
              </>
            ) : (
              "Get my score"
            )}
          </motion.button>
        )}
      </div>
    </form>
  );
}
