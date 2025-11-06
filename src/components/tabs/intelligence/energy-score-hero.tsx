'use client';
import { useState, useEffect, useContext } from 'react';
import CircularProgress from '@/components/shared/circular-progress';
import { AppContext } from '@/context/app-context';
import { calculateEnergyScore, EnergyScoreOutput } from '@/ai/flows/energy-score-calculation';
import { Skeleton } from '@/components/ui/skeleton';

export default function EnergyScoreHero() {
  const { metrics } = useContext(AppContext);
  const [energyData, setEnergyData] = useState<EnergyScoreOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getEnergyScore() {
      try {
        setLoading(true);
        const input = {
          sleepDuration: metrics.sleep.duration,
          sleepQuality: metrics.sleep.quality,
          restingHeartRate: metrics.heartRate.resting,
          stressLevel: metrics.stress.level,
          activitySteps: metrics.activity.steps,
          activityCalories: metrics.activity.calories,
        };
        const result = await calculateEnergyScore(input);
        setEnergyData(result);
      } catch (error) {
        console.error("Failed to calculate energy score:", error);
        // Fallback to mock data on error
        setEnergyData({
          energyScore: 82,
          explanation: "Your energy is high due to good sleep and low stress. Perfect day for challenges! 💪",
        });
      } finally {
        setLoading(false);
      }
    }
    getEnergyScore();
  }, [metrics]);

  const score = energyData?.energyScore ?? 0;
  const status = score > 80 ? 'EXCELLENT' : score > 60 ? 'GOOD' : score > 40 ? 'FAIR' : 'LOW';
  const color = score > 80 ? 'success' : score > 60 ? 'primary' : score > 40 ? 'warning' : 'error';
  const statusColor = score > 80 ? 'text-success' : score > 60 ? 'text-primary' : score > 40 ? 'text-warning' : 'text-destructive';

  if (loading) {
    return <Skeleton className="h-[280px] w-full rounded-xl" />;
  }

  return (
    <div className="bg-gradient-to-br from-primary via-primary/80 to-purple-800 rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-4 text-primary-foreground">Your Energy Today</h2>
      <div className="flex items-center justify-center relative">
        <CircularProgress size={120} value={score} color={color} strokeWidth={10} />
        <div className="absolute text-center text-primary-foreground">
          <div className="text-3xl font-bold">{score}<span className="text-xl">/100</span></div>
        </div>
      </div>
      <div className="text-center mt-4 text-primary-foreground">
        <div className={`text-lg font-bold tracking-wider ${statusColor}`}>{status}</div>
        <p className="text-sm mt-2 text-primary-foreground/80">{energyData?.explanation}</p>
      </div>
    </div>
  );
}
