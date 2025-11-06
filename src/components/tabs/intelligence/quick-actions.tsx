import { Card } from '@/components/ui/card';
import { Wind, Dumbbell, Bed, Activity } from 'lucide-react';

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
}

function QuickAction({ icon, label }: QuickActionProps) {
  return (
    <Card className="bg-card p-3 flex flex-col items-center justify-center gap-2 aspect-square cursor-pointer hover:bg-secondary transition-colors">
      <div className="text-3xl">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </Card>
  );
}

export default function QuickActions() {
  return (
    <div className="grid grid-cols-4 gap-3 mt-6">
      <QuickAction icon={<Wind />} label="Breathe" />
      <QuickAction icon={<Dumbbell />} label="Workout" />
      <QuickAction icon={<Bed />} label="Sleep" />
      <QuickAction icon={<Activity />} label="Analyze" />
    </div>
  );
}
