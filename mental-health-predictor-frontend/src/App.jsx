import { motion } from "framer-motion";
import ContextPanel from "./components/ContextPanel";
import PredictionForm from "./components/PredictionForm";

export default function App() {
  return (
    <div className="min-h-screen bg-mist-50 px-4 py-10 sm:px-6 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
      >
        <div className="lg:sticky lg:top-10 lg:h-[calc(100vh-5rem)]">
          <ContextPanel />
        </div>
        <PredictionForm />
      </motion.div>
    </div>
  );
}
