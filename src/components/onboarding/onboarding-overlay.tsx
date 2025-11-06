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
    target: '.energy-score-section',
    title: '🔋 Your Daily Energy Score',
    content: 'This AI-powered score analyzes your sleep, heart rate, activity, and stress to predict your optimal day. Higher scores mean better performance potential!',
    position: 'bottom'
  },
  {
    target: '.energy-contributors',
    title: '⚡ What Powers Your Energy',
    content: 'See exactly which health factors are boosting or limiting your energy. Each metric contributes points to your daily score.',
    position: 'top'
  },
  {
    target: '.smart-opportunities',
    title: '🎯 Smart Opportunities',
    content: 'Personalized recommendations based on your patterns. These aren\'t generic tips - they\'re proven to work for users with your health profile.',
    position: 'top'
  },
  {
    target: '.optimal-day-timeline',
    title: '📅 Your Optimal Day',
    content: 'AI predicts your best times for workouts, focus work, and breaks. Tap to expand and see your personalized daily schedule.',
    position: 'top'
  },
  {
    target: '.bottom-navigation',
    title: '🧭 Navigation Hub',
    content: 'Shop for devices, track social challenges with friends, monitor your connected devices, and access enterprise features (when available).',
    position: 'top'
  },
  {
    target: '.profile-dropdown',
    title: '👤 Profile & Settings',
    content: 'Switch between Personal and Enterprise modes here. Enterprise mode unlocks team wellness features for workplace health management.',
    position: 'bottom'
  }
];


export default function OnboardingOverlay({ step, onNext, onPrevious, onSkip, onComplete }: OnboardingOverlayProps) {
  const currentStep = steps[step];
  const totalSteps = steps.length;

  useEffect(() => {
    const targetElement = document.querySelector(currentStep.target);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [step, currentStep.target]);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm">
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: `radial-gradient(circle at ${getElementCenter(currentStep.target)}, transparent 120px, rgba(0,0,0,0.8) 200px)`
        }}
      />
      
       <div className="fixed inset-x-4 bottom-24 top-auto z-60 max-w-md mx-auto">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-primary/40 rounded-2xl shadow-2xl">
          
          <div className="px-6 py-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
               <div className="flex space-x-1.5">
                {steps.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === step ? 'bg-primary' : 
                      index < step ? 'bg-green-400' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground font-medium">
                {step + 1} of {totalSteps}
              </span>
            </div>
          </div>
          
          <div className="px-6 py-5">
            <h3 className="text-xl font-bold text-white mb-3">
              {currentStep.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {currentStep.content}
            </p>
          </div>
          
          <div className="px-6 py-4 bg-gray-800/50 rounded-b-2xl">
            <div className="flex items-center justify-between">
              <button 
                onClick={onSkip}
                className="text-sm text-muted-foreground hover:text-white transition-colors py-2 px-1"
              >
                Skip Tour
              </button>
              
              <div className="flex items-center space-x-3">
                {step > 0 && (
                  <button 
                    onClick={onPrevious}
                    className="text-sm text-primary hover:text-primary/80 transition-colors py-2 px-3"
                  >
                    Previous
                  </button>
                )}
                
                <button 
                  onClick={step === totalSteps - 1 ? onComplete : onNext}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                >
                  {step === totalSteps - 1 ? 'Get Started!' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getElementCenter = (selector: string) => {
  const element = document.querySelector(selector);
  if (!element) return '50% 50%';
  const rect = element.getBoundingClientRect();
  return `${rect.left + rect.width / 2}px ${rect.top + rect.height / 2}px`;
};
