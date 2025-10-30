import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home, UtensilsCrossed, Dumbbell, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

const slides = [
  {
    icon: Home,
    title: "Find your new home",
    description: "Browse verified accommodations tailored to your budget and preferences",
    color: "#2563EB",
  },
  {
    icon: UtensilsCrossed,
    title: "Affordable meals & gyms nearby",
    description: "Discover local food services and fitness centers close to your place",
    color: "#16A34A",
  },
  {
    icon: Dumbbell,
    title: "Smart combos that fit your budget",
    description: "Save more with intelligently bundled monthly packages",
    color: "#8B5CF6",
  },
];

export function OnboardingScreens({ onComplete }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col px-6 pt-12 pb-8">
        <div className="flex justify-end mb-8">
          {currentSlide < slides.length - 1 && (
            <button
              onClick={handleSkip}
              className="text-[#6B7280] px-4 py-2"
            >
              Skip
            </button>
          )}
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center"
            >
              <div
                className="w-32 h-32 rounded-full flex items-center justify-center mb-8"
                style={{ backgroundColor: `${slides[currentSlide].color}15` }}
              >
                {(() => {
                  const Icon = slides[currentSlide].icon;
                  return (
                    <Icon
                      className="w-16 h-16"
                      style={{ color: slides[currentSlide].color }}
                    />
                  );
                })()}
              </div>

              <h2 className="text-2xl mb-4 text-[#111827]">
                {slides[currentSlide].title}
              </h2>
              
              <p className="text-[#6B7280] max-w-sm">
                {slides[currentSlide].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col items-center space-y-6">
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "w-8 bg-[#2563EB]"
                    : "w-2 bg-[#E5E7EB]"
                }`}
              />
            ))}
          </div>

          <Button
            onClick={handleNext}
            className="w-full bg-[#2563EB] hover:bg-[#1E40AF] text-white rounded-xl h-12"
          >
            {currentSlide < slides.length - 1 ? (
              <>
                Next
                <ChevronRight className="ml-2 w-5 h-5" />
              </>
            ) : (
              "Get Started"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
