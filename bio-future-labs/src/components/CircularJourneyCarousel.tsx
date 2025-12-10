import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import {
  Trophy,
  Rocket,
  Globe,
  Landmark,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Bg2023 from "@/assets/1.jpg";
import Bg2024 from "@/assets/2.jpg";
import Bg2025 from "@/assets/3.jpg";

const iconMap: Record<string, any> = {
  Trophy,
  Rocket,
  Globe,
  Landmark,
  ShieldCheck,
};

const backgroundMap: Record<number, string> = {
  2023: Bg2023,
  2024: Bg2024,
  2025: Bg2025,
};

interface Milestone {
  id: string;
  title: string;
  description: string;
  year: number;
  category: string;
  is_major: boolean;
  order_index: number;
}

interface JourneyYear {
  year: number;
  items: Milestone[];
}


const TimePortalJourney = () => {
  const [journeyData, setJourneyData] = useState<JourneyYear[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeYearIndex, setActiveYearIndex] = useState(0);
  const [autoMode, setAutoMode] = useState(true);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const scrollRef = useRef<HTMLDivElement>(null);

  const totalYears = journeyData.length;
  const currentYearData = journeyData[activeYearIndex];
  const currentBg =
    (currentYearData && backgroundMap[currentYearData.year]) ||
    Object.values(backgroundMap)[activeYearIndex % 3];

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/milestones`);
        if (!res.ok) throw new Error(`Failed to fetch milestones: ${res.status}`);
        const data = await res.json();

        const grouped: Record<number, Milestone[]> = {};
        data.forEach((item: Milestone) => {
          if (!grouped[item.year]) grouped[item.year] = [];
          grouped[item.year].push(item);
        });

        const formatted: JourneyYear[] = Object.keys(grouped)
          .map((year) => ({
            year: parseInt(year),
            items: grouped[parseInt(year)].sort(
              (a, b) => (a.order_index ?? 0) - (b.order_index ?? 0)
            ),
          }))
          .sort((a, b) => a.year - b.year); 
        setJourneyData(formatted);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Failed to load journey");
      } finally {
        setLoading(false);
      }
    };

    fetchMilestones();
  }, []);

  const goNext = () => setActiveYearIndex((p) => (p + 1) % totalYears);
  const goPrev = () => setActiveYearIndex((p) => (p - 1 + totalYears) % totalYears);

  useEffect(() => {
    if (!autoMode || totalYears === 0) return;
    const interval = setInterval(goNext, 4000);
    return () => clearInterval(interval);
  }, [autoMode, totalYears]);

  const handleUserIntervention = () => {
    setAutoMode(false);
    setLastInteraction(Date.now());
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (Date.now() - lastInteraction > 5000) setAutoMode(true);
    }, 1000);
    return () => clearInterval(timer);
  }, [lastInteraction]);


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      handleUserIntervention();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  if (loading) {
    return (
      <section className="h-[100vh] flex items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-500 border-t-transparent"></div>
          <p className="text-blue-300 text-sm">Loading Journey...</p>
        </div>
      </section>
    );
  }

  if (error || !journeyData.length) {
    return (
      <section className="h-[100vh] flex items-center justify-center bg-black text-white text-center">
        <div>
          <p className="text-red-400 mb-3">
            {error || "No milestones available."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      id="journey"
      className="relative h-[100vh] overflow-hidden bg-black text-white"
      onWheel={handleUserIntervention}
      onTouchStart={handleUserIntervention}
      onMouseMove={handleUserIntervention}
    >
      {/* --- Dynamic Background --- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBg}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${currentBg})`,
            filter: "brightness(0.35) blur(1px)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        />
      </AnimatePresence>

      {/* Rotating conic gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 animate-[spin_25s_linear_infinite] bg-[conic-gradient(from_0deg,rgba(0,100,255,0.1),transparent_50%,rgba(180,100,255,0.1))]" />
      </div>

      {/* --- Journey Content --- */}
      <div
        ref={scrollRef}
        className="relative h-full overflow-y-auto snap-y snap-mandatory"
        style={{ scrollBehavior: "smooth" }}
      >
        <div className="flex flex-col items-center justify-center min-h-full">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 tracking-wider">
            Our Journey
          </h2>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentYearData.year}
              initial={{ opacity: 0, scale: 0.8, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -100 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center justify-center"
            >
              {/* Pulsing ring */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-[400px] h-[400px] rounded-full border border-blue-400/30 blur-xl"
              />

              {/* Year */}
              <motion.h3
                className="text-6xl font-extrabold text-blue-400 drop-shadow-[0_0_20px_rgba(0,0,255,0.6)] mb-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {currentYearData.year}
              </motion.h3>

              {/* --- Milestones --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl px-6 z-10">
                {currentYearData.items.map((item, i) => {
                  const titleLower = item.title.toLowerCase();
                  let iconKey = "Trophy";
                  if (titleLower.includes("accelerator")) iconKey = "Rocket";
                  else if (titleLower.includes("program")) iconKey = "ShieldCheck";
                  else if (titleLower.includes("international")) iconKey = "Globe";
                  else if (titleLower.includes("parliament")) iconKey = "Landmark";
                  const IconComponent = iconMap[iconKey];

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: i * 0.3 }}
                      className="relative p-6 rounded-2xl bg-white/15 border border-blue-500/30 
                        shadow-[0_0_30px_rgba(50,100,255,0.4)] hover:shadow-[0_0_50px_rgba(100,150,255,0.7)] 
                        backdrop-blur-lg transition-all duration-700"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border border-white/30">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="text-lg font-bold text-blue-300 uppercase tracking-wider">
                          {item.category || "Milestone"}
                        </h4>
                      </div>
                      <h5 className="text-xl font-semibold text-white mb-2 leading-snug">
                        {item.title}
                      </h5>
                      <p className="text-gray-200 text-sm leading-relaxed">
                        {item.description}
                      </p>
                      {item.is_major && (
                        <div className="mt-4 flex items-center text-blue-300 text-sm font-medium">
                          <Trophy className="w-4 h-4 mr-1" />
                          Major Achievement
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* --- Navigation Buttons --- */}
      <button
        onClick={() => {
          handleUserIntervention();
          goPrev();
        }}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full border border-blue-400/40 shadow-lg transition-all"
      >
        <ChevronLeft className="text-blue-300 w-6 h-6" />
      </button>

      <button
        onClick={() => {
          handleUserIntervention();
          goNext();
        }}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full border border-blue-400/40 shadow-lg transition-all"
      >
        <ChevronRight className="text-blue-300 w-6 h-6" />
      </button>

      {/* --- Year Indicators --- */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {journeyData.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              handleUserIntervention();
              setActiveYearIndex(idx);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              idx === activeYearIndex
                ? "bg-blue-400 scale-125 shadow-[0_0_10px_rgba(100,150,255,0.8)]"
                : "bg-gray-600 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default TimePortalJourney;
