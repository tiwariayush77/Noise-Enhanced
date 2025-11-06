'use client';

import { useEffect } from 'react';

interface OnboardingOverlayProps {
  step: number;
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
  onComplete: () => void;
}

const steps = [
    {
      title: '🔋 Your Daily Energy Score',
      content: 'AI analyzes sleep, heart rate, activity, and stress to predict your optimal day performance.',
      highlightClass: 'energy-score-section'
    },
    {
      title: '⚡ Energy Contributors', 
      content: 'See which health factors are boosting or limiting your daily energy score.',
      highlightClass: 'energy-contributors'
    },
    {
      title: '🎯 Smart Opportunities',
      content: 'Personalized recommendations based on your unique health patterns.',
      highlightClass: 'smart-opportunities'
    },
    {
      title: '📅 Optimal Day Timeline',
      content: 'AI predicts perfect timing for workouts, focus work, and recovery.',
      highlightClass: 'optimal-day-timeline'
    },
    {
      title: '🧭 Navigation',
      content: 'Shop devices, social challenges, device management, and enterprise features.',
      highlightClass: 'bottom-nav'
    },
    {
      title: '👤 Profile Settings',
      content: 'Switch between Personal and Enterprise modes here.',
      highlightClass: 'profile-section'
    }
  ];

export default function OnboardingOverlay({
  step,
  onNext,
  onPrevious,
  onSkip,
  onComplete,
}: OnboardingOverlayProps) {
  const totalSteps = steps.length;
  const currentStep = steps[step];

  useEffect(() => {
    document.querySelectorAll('.tour-highlight').forEach((el) => {
      el.classList.remove('tour-highlight');
    });

    const currentElement = document.querySelector(
      `.${currentStep.highlightClass}`
    );
    if (currentElement) {
      currentElement.classList.add('tour-highlight');
      currentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return () => {
      document.querySelectorAll('.tour-highlight').forEach((el) => {
        el.classList.remove('tour-highlight');
      });
    };
  }, [step, currentStep.highlightClass]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm">
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-80 max-w-[90vw]">
        <div className="bg-gray-900 border border-primary/40 rounded-2xl shadow-2xl">
          <div className="px-5 py-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex space-x-1">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === step
                        ? 'bg-primary scale-125'
                        : index < step
                        ? 'bg-green-400'
                        : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground font-medium">
                {step + 1} of {totalSteps}
              </span>
            </div>
          </div>

          <div className="px-5 py-4">
            <h3 className="text-lg font-bold text-white mb-2">
              {currentStep.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              {currentStep.content}
            </p>
            <div className="flex items-center space-x-1 text-primary">
              <div className="w-1 h-1 bg-primary rounded-full animate-pulse"></div>
              <span className="text-xs">Feature highlighted below</span>
            </div>
          </div>

          <div className="px-5 py-4 bg-gray-800/50 rounded-b-2xl">
            <div className="flex items-center justify-between">
              <button
                onClick={onSkip}
                className="text-xs text-muted-foreground hover:text-white transition-colors"
              >
                Skip Tour
              </button>

              <div className="flex items-center space-x-3">
                {step > 0 && (
                  <button
                    onClick={onPrevious}
                    className="text-xs text-primary hover:text-primary/80 transition-colors px-2 py-1"
                  >
                    Previous
                  </button>
                )}

                <button
                  onClick={step === totalSteps - 1 ? onComplete : onNext}
                  className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors"
                >
                  {step === totalSteps - 1 ? 'Complete Tour' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
