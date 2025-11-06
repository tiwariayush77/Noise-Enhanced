'use client';

import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

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
    content:
      'AI analyzes sleep, heart rate, activity, and stress to predict your optimal day performance.',
    highlightClass: 'energy-score-section',
    pointer: '👇 See your current energy score above',
  },
  {
    title: '⚡ Energy Contributors',
    content:
      'See which health factors are boosting or limiting your daily energy score.',
    highlightClass: 'energy-contributors',
    pointer: '👇 Check the contributors section below',
  },
  {
    title: '🎯 Smart Opportunities',
    content:
      'Personalized recommendations based on your unique health patterns and proven outcomes.',
    highlightClass: 'smart-opportunities',
    pointer: '👇 View your opportunities below',
  },
  {
    title: '📅 Optimal Day Timeline',
    content:
      'AI predicts perfect timing for workouts, focus work, and recovery periods.',
    highlightClass: 'optimal-day-timeline',
    pointer: '👇 See your timeline below',
  },
  {
    title: '🧭 Navigation',
    content:
      'Shop devices, social challenges, device management, and enterprise features.',
    highlightClass: 'bottom-nav',
    pointer: '👇 Check the navigation bar below',
  },
  {
    title: '👤 Profile Settings',
    content: 'Switch between Personal and Enterprise modes here.',
    highlightClass: 'profile-section',
    pointer: '👆 Profile button in the top right',
  },
];
const totalSteps = steps.length;

export default function OnboardingOverlay({
  step,
  onNext,
  onPrevious,
  onSkip,
  onComplete,
}: OnboardingOverlayProps) {
  useEffect(() => {
    // Remove previous highlights
    document.querySelectorAll('.tour-highlight').forEach((el) => {
      el.classList.remove('tour-highlight');
    });

    // Add highlight to current element
    const currentElement = document.querySelector(
      `.${steps[step].highlightClass}`
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
  }, [step]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/10 backdrop-blur-[0px]">
      <div className="fixed top-20 left-4 right-4 z-[101] max-w-sm mx-auto">
        <div className="bg-gray-900/90 backdrop-blur border border-primary/40 rounded-2xl shadow-2xl">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
            <div className="flex space-x-1">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all duration-300',
                    index === step
                      ? 'bg-primary scale-110'
                      : index < step
                      ? 'bg-green-400'
                      : 'bg-gray-600'
                  )}
                />
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-muted-foreground">
                {step + 1}/{totalSteps}
              </span>
              <button
                onClick={onSkip}
                className="text-muted-foreground hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="px-4 py-3">
            <h3 className="text-base font-bold text-white mb-2">
              {steps[step].title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              {steps[step].content}
            </p>
            <div className="text-xs text-primary flex items-center space-x-1">
              <div className="w-1 h-1 bg-primary rounded-full animate-pulse"></div>
              <span>{steps[step].pointer}</span>
            </div>
          </div>

          <div className="flex items-center justify-between px-4 py-3 bg-gray-800/50 rounded-b-2xl">
            <button
              onClick={onSkip}
              className="text-sm text-muted-foreground hover:text-white transition-colors"
            >
              Skip Tour
            </button>
            <div className="flex items-center space-x-2">
              {step > 0 && (
                <button
                  onClick={onPrevious}
                  className="flex items-center space-x-1 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              )}
              <button
                onClick={step === totalSteps - 1 ? onComplete : onNext}
                className="bg-primary hover:bg-primary/90 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1"
              >
                <span>{step === totalSteps - 1 ? 'Finish' : 'Next'}</span>
                {step < totalSteps - 1 && (
                  <ChevronRight className="w-3 h-3" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
