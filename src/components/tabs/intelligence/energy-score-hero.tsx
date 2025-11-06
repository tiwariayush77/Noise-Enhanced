'use client';
import { useState, useEffect, useContext } from 'react';
import CircularProgress from '@/components/shared/circular-progress';
import { AppContext } from '@/context/app-context';
import type { EnergyScoreOutput } from '@/ai/schemas';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp } from 'lucide-react';
import { MOCK_DATA } from '@/lib/mock-data';

export default function EnergyScoreHero() {
  const { aiReport } = useContext(AppContext);
  const [energyData, setEnergyData] = useState<EnergyScoreOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (aiReport) {
      setEnergyData(aiReport.energyScore);
      setLoading(false);
    } else {
      // Fallback to mock data if AI report is not available
      setEnergyData({
        energyScore: MOCK_DATA.energyScore,
        explanation:
          'Your energy is high due to good sleep and low stress. Perfect day for challenges! 💪',
      });
      setLoading(false);
    }
  }, [aiReport]);

  const score = energyData?.energyScore ?? 0;
  const status =
    score > 80
      ? 'EXCELLENT'
      : score > 60
      ? 'GOOD'
      : score > 40
      ? 'FAIR'
      : 'LOW';
  const color =
    score > 80
      ? 'success'
      : score > 60
      ? 'primary'
      : score > 40
      ? 'warning'
      : 'error';
  const statusColor =
    score > 80
      ? 'text-success'
      : score > 60
      ? 'text-primary'
      : score > 40
      ? 'text-warning'
      : 'text-destructive';

  if (loading) {
    return <Skeleton className="h-[218px] w-full rounded-xl" />;
  }

  return (
    <div className="energy-score-section bg-gradient-to-br from-primary via-primary/80 to-purple-800 rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-4 text-primary-foreground">
        Your Energy Today
      </h2>
      <div className="flex items-center justify-center relative">
        <CircularProgress
          size={120}
          value={score}
          color={color}
          strokeWidth={10}
        />
        <div className="absolute text-center text-primary-foreground">
          <div className="text-3xl font-bold">
            {score}
            <span className="text-xl">/100</span>
          </div>
        </div>
        <div className="absolute -top-2 -right-2 bg-success rounded-full w-6 h-6 flex items-center justify-center border-4 border-primary">
          <TrendingUp className="w-4 h-4 text-white" />
        </div>
      </div>
      <div className="text-center mt-4 text-primary-foreground">
        <div className={`text-lg font-bold tracking-wider ${statusColor}`}>
          {status}
        </div>
      </div>
    </div>
  );
}
