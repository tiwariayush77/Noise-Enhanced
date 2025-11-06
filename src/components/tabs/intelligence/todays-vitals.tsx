'use client';
import { useContext } from 'react';
import { AppContext } from '@/context/app-context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Footprints, Brain, Moon, Activity, ArrowDown, ArrowUp, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VitalCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  status: 'optimal' | 'good' | 'low';
  color: 'green' | 'blue' | 'yellow' | 'purple';
  trend: string;
}

const colorClasses = {
  green: {
    bg: 'bg-green-500/20',
    text: 'text-green-400',
  },
  blue: {
    bg: 'bg-blue-500/20',
    text: 'text-blue-400',
  },
  yellow: {
    bg: 'bg-yellow-500/20',
    text: 'text-yellow-400',
  },
  purple: {
    bg: 'bg-purple-500/20',
    text: 'text-purple-400',
  },
};

function VitalCard({ icon: Icon, value, label, color, trend }: VitalCardProps) {
  const trendIcon = trend.startsWith('+') ? <ArrowUp size={12} /> : <ArrowDown size={12} />;
  const trendColor = trend.startsWith('+') ? 'text-success' : 'text-destructive';

  return (
    <div className="text-center">
      <div className={cn('w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2', colorClasses[color].bg)}>
        <Icon className={cn('w-6 h-6', colorClasses[color].text)} />
      </div>
      <div className="text-lg font-semibold">{value}</div>
      <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
        <span>{label}</span>
        <span className={cn('flex items-center text-xs', trendColor)}>
          {trendIcon} {trend.substring(1)}
        </span>
      </div>
    </div>
  );
}

export default function TodaysVitals() {
  const { metrics } = useContext(AppContext);

  return (
    <Card className="bg-card rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Activity className="w-5 h-5 mr-2 text-primary" />
          Today's Vitals
        </h3>
        <Button variant="link" className="text-primary text-sm hover:text-primary/80">
          View Trends <ArrowRight className="ml-1" size={16} />
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <VitalCard
          icon={Heart}
          value={metrics.heartRate.current.toString()}
          label="BPM"
          status="optimal"
          color="green"
          trend="+2"
        />
        <VitalCard
          icon={Footprints}
          value={(metrics.activity.steps / 1000).toFixed(1) + 'K'}
          label="Steps"
          status="good"
          color="blue"
          trend="+1.2K"
        />
        <VitalCard icon={Brain} value={metrics.stress.level.toString()} label="Stress" status="low" color="yellow" trend="-5" />
        <VitalCard
          icon={Moon}
          value={(metrics.sleep.duration / 60).toFixed(1) + 'h'}
          label="Sleep"
          status="good"
          color="purple"
          trend="+0.3h"
        />
      </div>
    </Card>
  );
}
