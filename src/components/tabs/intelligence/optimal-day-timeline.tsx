'use client';
import { useState, useEffect, useContext } from 'react';
import ExpandableCard from '@/components/shared/expandable-card';
import type { OptimalDayTimelineOutput } from '@/ai/schemas';
import { AppContext } from '@/context/app-context';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { MOCK_DATA } from '@/lib/mock-data';

interface TimeSlotProps {
  time: string;
  title: string;
  subtitle: string;
  confidence: 'high' | 'medium' | 'low';
  action: string;
  current?: boolean;
}

const confidenceColors = {
  high: 'bg-success/20 text-success',
  medium: 'bg-warning/20 text-warning',
  low: 'bg-destructive/20 text-destructive',
};

function TimeSlot({
  time,
  title,
  subtitle,
  confidence,
  action,
  current,
}: TimeSlotProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-4 p-4 rounded-lg transition-all',
        current ? 'bg-primary/10 border-l-4 border-primary' : 'bg-secondary/50'
      )}
    >
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium text-muted-foreground">{time}</p>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="bg-accent text-accent-foreground hover:bg-accent/80 h-10 px-4 rounded-3xl"
      >
        {action} <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}

export default function OptimalDayTimeline() {
  const { aiReport } = useContext(AppContext);
  const [timelineData, setTimelineData] =
    useState<OptimalDayTimelineOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (aiReport) {
      setTimelineData(aiReport.timeline);
      setLoading(false);
    } else {
      // Fallback to mock data if AI report is not available
      setTimelineData({ timeline: MOCK_DATA.timeline });
      setLoading(false);
    }
  }, [aiReport]);

  return (
    <ExpandableCard title="🗓️ Your Optimal Day">
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-24 w-full rounded-lg" />
          <Skeleton className="h-24 w-full rounded-lg" />
          <Skeleton className="h-24 w-full rounded-lg" />
        </div>
      ) : (
        <div className="space-y-3">
          {timelineData?.timeline.map((slot, index) => (
            <TimeSlot
              key={index}
              time={slot.time}
              title={slot.title}
              subtitle={slot.subtitle}
              confidence={slot.confidence}
              action={slot.action}
              current={index === 0}
            />
          ))}
        </div>
      )}
    </ExpandableCard>
  );
}
