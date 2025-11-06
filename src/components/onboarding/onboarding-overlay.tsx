'use client';

import { useEffect, useState } from 'react';

interface OnboardingOverlayProps {
  step: number;
  onNext: (step: number) => void;
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

const getElementCenter = (selector: string) => {
  const element = document.querySelector(selector);
  if (!element) return '50% 50%';
  const rect = element.getBoundingClientRect();
  return `${rect.left + rect.width / 2}px ${rect.top + rect.height / 2}px`;
};

const getCardPosition = (position: string, targetSelector: string) => {
  const element = document.querySelector(targetSelector);
  if (!element) return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
  const rect = element.getBoundingClientRect();
  
  if (position === 'bottom') {
    return `top-[${rect.bottom + 20}px] left-1/2 -translate-x-1/2`;
  }
  return `bottom-[${window.innerHeight - rect.top + 20}px] left-1/2 -translate-x-1/2`;
};


export default function OnboardingOverlay({ step, onNext, onSkip, onComplete }: OnboardingOverlayProps) {
  const [targetPosition, setTargetPosition] = useState({ x: '50%', y: '50%' });

  const currentStep = steps[step];

  useEffect(() => {
    const targetElement = document.querySelector(currentStep.target);
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      setTargetPosition({
        x: `${rect.left + rect.width / 2}px`,
        y: `${rect.top + rect.height / 2}px`,
      });
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [step, currentStep.target]);

  const cardStyle: React.CSSProperties = {};
  const targetElement = document.querySelector(currentStep.target);
  if (targetElement) {
    const rect = targetElement.getBoundingClientRect();
    if (currentStep.position === 'bottom') {
      cardStyle.top = `${rect.bottom + 20}px`;
    } else {
      cardStyle.top = `${rect.top - 20}px`;
      cardStyle.transform = 'translateY(-100%)';
    }
    cardStyle.left = `${rect.left + rect.width / 2}px`;
    cardStyle.transform = `${cardStyle.transform || ''} translateX(-50%)`;

     // Adjust if card goes off-screen
    if(rect.left + rect.width / 2 - 192 < 0) cardStyle.left = `16px`; cardStyle.transform = `translateY(${cardStyle.transform ? '-100%' : '0'})`;
    if(rect.left + rect.width / 2 + 192 > window.innerWidth) cardStyle.left = `${window.innerWidth - 16}px`; cardStyle.transform = `translateY(${cardStyle.transform ? '-100%' : '0'}) translateX(-100%)`;
  }


  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-all duration-500">
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: `radial-gradient(circle at ${targetPosition.x} ${targetPosition.y}, transparent 120px, rgba(0,0,0,0.8) 200px)`
        }}
      />
      
      <div style={cardStyle} className="absolute max-w-sm w-[calc(100vw-32px)] mx-4 transition-all duration-500">
        <div className="bg-gray-900 border border-primary/30 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-1">
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
            <span className="text-xs text-muted-foreground">{step + 1} of {steps.length}</span>
          </div>
          
          <h3 className="text-lg font-semibold mb-3 text-white">
            {currentStep.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            {currentStep.content}
          </p>
          
          <div className="flex items-center justify-between">
            <button 
              onClick={onSkip}
              className="text-sm text-muted-foreground hover:text-white transition-colors"
            >
              Skip Tour
            </button>
            
            <div className="flex items-center space-x-3">
              {step > 0 && (
                <button 
                  onClick={() => onNext(step - 1)}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Previous
                </button>
              )}
              
              <button 
                onClick={() => step === steps.length - 1 ? onComplete() : onNext(step + 1)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                {step === steps.length - 1 ? 'Get Started' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
