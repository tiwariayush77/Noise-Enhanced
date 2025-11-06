
'use client';
import { useContext } from 'react';
import { AppContext } from '@/context/app-context';
import { Zap, Moon, Heart, Activity, Brain, TrendingUp, TrendingDown, ChevronRight } from 'lucide-react';

export default function EnergyContributors() {
  const { metrics } = useContext(AppContext);
    
  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center">
          <Zap className="w-5 h-5 mr-2 text-yellow-400" />
          Energy Contributors
        </h3>
        <button className="text-primary text-sm hover:text-primary/80 flex items-center">
          View Details
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-xl p-4 transition-all ease-in-out hover:transform hover:-translate-y-px hover:shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500/30 rounded-lg flex items-center justify-center">
                <Moon className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-sm font-medium ml-2">Sleep Quality</span>
            </div>
            <div className="flex items-center text-success">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span className="text-xs">+18 pts</span>
            </div>
          </div>
          
          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-400">{metrics.sleep.quality}%</div>
              <div className="text-xs text-muted-foreground">{(metrics.sleep.duration / 60).toFixed(1)}h duration</div>
            </div>
            <div className="text-right">
              <div className="w-12 h-6 bg-blue-500/20 rounded-full overflow-hidden">
                <div className="h-full bg-blue-400 rounded-full" style={{width: `${metrics.sleep.quality}%`}}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-600/20 to-red-800/20 border border-red-500/30 rounded-xl p-4 transition-all ease-in-out hover:transform hover:-translate-y-px hover:shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-500/30 rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-red-400" />
              </div>
              <span className="text-sm font-medium ml-2">Heart Fitness</span>
            </div>
            <div className="flex items-center text-success">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span className="text-xs">+22 pts</span>
            </div>
          </div>
          
          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-bold text-red-400">{metrics.heartRate.resting}</div>
              <div className="text-xs text-muted-foreground">BPM resting</div>
            </div>
            <div className="flex items-center">
              <div className="text-success text-xs font-medium animate-pulse">EXCELLENT</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 rounded-xl p-4 transition-all ease-in-out hover:transform hover:-translate-y-px hover:shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500/30 rounded-lg flex items-center justify-center">
                <Activity className="w-4 h-4 text-green-400" />
              </div>
              <span className="text-sm font-medium ml-2">Daily Activity</span>
            </div>
            <div className="flex items-center text-success">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span className="text-xs">+15 pts</span>
            </div>
          </div>
          
          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-bold text-green-400">{(metrics.activity.steps/1000).toFixed(1)}K</div>
              <div className="text-xs text-muted-foreground">steps today</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-green-400">{metrics.activity.calories} cal</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 border border-yellow-500/30 rounded-xl p-4 transition-all ease-in-out hover:transform hover:-translate-y-px hover:shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-yellow-500/30 rounded-lg flex items-center justify-center">
                <Brain className="w-4 h-4 text-yellow-400" />
              </div>
              <span className="text-sm font-medium ml-2">Stress Level</span>
            </div>
            <div className="flex items-center text-success">
              <TrendingDown className="w-3 h-3 mr-1" />
              <span className="text-xs">+12 pts</span>
            </div>
          </div>
          
          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-bold text-yellow-400">{metrics.stress.level}</div>
              <div className="text-xs text-muted-foreground">moderate level</div>
            </div>
            <div className="text-right">
              <div className="w-12 h-6 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-400 rounded-full" style={{width: `${metrics.stress.level}%`}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-purple-800/10 border border-primary/20 rounded-xl p-4 mt-4">
        <div className="flex items-center justify-center space-x-2 text-sm flex-wrap">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-blue-400">Sleep (18)</span>
          </div>
          <span className="text-muted-foreground">+</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <span className="text-red-400">Heart (22)</span>
          </div>
          <span className="text-muted-foreground">+</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-green-400">Activity (15)</span>
          </div>
          <span className="text-muted-foreground">+</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <span className="text-yellow-400">Stress (12)</span>
          </div>
          <span className="text-muted-foreground">=</span>
          <div className="flex items-center space-x-1">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-primary font-semibold">82 Energy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
