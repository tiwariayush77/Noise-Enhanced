'use client';
import { useContext } from 'react';
import { AppContext } from '@/context/app-context';
import { Zap, Moon, Heart, Activity, Brain, Footprints } from 'lucide-react';

export default function EnergyContributors() {
  const { metrics } = useContext(AppContext);
    
  return (
    <div className="card-gradient backdrop-blur-lg rounded-xl p-5 mb-6 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Zap className="w-5 h-5 mr-2 text-yellow-400" />
          What's Powering Your Energy
        </h3>
      </div>

      <div className="space-y-4">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
              <Moon className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-sm font-medium">Sleep Quality</div>
              <div className="text-xs text-muted-foreground">{(metrics.sleep.duration / 60).toFixed(1)}h - {metrics.sleep.quality}% quality</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-400 rounded-full" style={{width: `${metrics.sleep.quality}%`}}></div>
            </div>
            <span className="text-blue-400 text-sm font-semibold">+18</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <div className="text-sm font-medium">Heart Fitness</div>
              <div className="text-xs text-muted-foreground">{metrics.heartRate.resting} BPM resting - Excellent</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-red-400 rounded-full" style={{width: '95%'}}></div>
            </div>
            <span className="text-red-400 text-sm font-semibold">+22</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
              <Footprints className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="text-sm font-medium">Daily Activity</div>
              <div className="text-xs text-muted-foreground">{(metrics.activity.steps/1000).toFixed(1)}K steps - {metrics.activity.calories} calories</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-green-400 rounded-full" style={{width: '75%'}}></div>
            </div>
            <span className="text-green-400 text-sm font-semibold">+15</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <Brain className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <div className="text-sm font-medium">Stress Control</div>
              <div className="text-xs text-muted-foreground">Level {metrics.stress.level} - Well managed</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-400 rounded-full" style={{width: `${100 - metrics.stress.level}%`}}></div>
            </div>
            <span className="text-yellow-400 text-sm font-semibold">+12</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-center space-x-1 text-xs">
          <span className="text-blue-400">18</span>
          <span className="text-muted-foreground">+</span>
          <span className="text-red-400">22</span>
          <span className="text-muted-foreground">+</span>
          <span className="text-green-400">15</span>
          <span className="text-muted-foreground">+</span>
          <span className="text-yellow-400">12</span>
          <span className="text-muted-foreground">=</span>
          <div className="flex items-center space-x-1 bg-primary/20 px-2 py-1 rounded-full">
            <Zap className="w-3 h-3 text-primary" />
            <span className="text-primary font-semibold">82 Energy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
