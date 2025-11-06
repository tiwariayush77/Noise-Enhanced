'use client';

interface WelcomeScreenProps {
  onStartTour: () => void;
  onSkip: () => void;
}

export default function WelcomeScreen({ onStartTour, onSkip }: WelcomeScreenProps) {
  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-primary/80 via-gray-900 to-black flex items-center justify-center p-6">
      <div className="text-center">
        <img 
          src="https://www.gonoise.com/cdn/shop/files/Artboard_1_wf_1.png?v=1761318524" 
          alt="Noise" 
          className="h-12 mx-auto mb-6"
        />
        <h1 className="text-3xl font-bold text-white mb-4">Welcome to NoiseFit Intelligence</h1>
        <p className="text-lg text-gray-300 mb-8 max-w-md">
          Transform your health data into personalized insights and daily optimization recommendations
        </p>
        
        <div className="space-y-4">
          <button 
            onClick={onStartTour}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 px-6 rounded-xl font-semibold transition-colors"
          >
            Start Guided Tour
          </button>
          
          <button 
            onClick={onSkip}
            className="w-full bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-800 py-3 px-6 rounded-xl font-medium transition-colors"
          >
            Explore on My Own
          </button>
        </div>
        
        <p className="text-xs text-gray-500 mt-6">
          You can always access the tour later from the header menu
        </p>
      </div>
    </div>
  );
}
