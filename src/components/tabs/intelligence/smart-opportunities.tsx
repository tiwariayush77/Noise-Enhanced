import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { TrendingUp, Wind, Footprints, type LucideIcon } from 'lucide-react';

interface OpportunityCardProps {
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  icon: LucideIcon;
  title: string;
  subtitle: string;
  action: string;
  successRate: number;
  gradient: string;
  borderColor: string;
}

const impactClasses = {
  HIGH: 'bg-primary text-primary-foreground',
  MEDIUM: 'bg-blue-500 text-white',
  LOW: 'bg-secondary text-secondary-foreground',
};

function OpportunityCard({ priority, icon: Icon, title, subtitle, action, successRate, gradient, borderColor }: OpportunityCardProps) {
  return (
    <Card className={cn('p-4 hover:scale-[1.02] transition-transform bg-gradient-to-r border', gradient, borderColor)}>
      <div className="flex items-start space-x-3">
        <div className="bg-primary/80 rounded-lg p-2">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <Badge variant="default" className={cn('text-xs font-bold', impactClasses[priority])}>
              {priority} IMPACT
            </Badge>
            <div className="flex items-center text-xs text-success">
              <TrendingUp className="w-3 h-3 mr-1" />
              {successRate}% success rate
            </div>
          </div>
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <Button size="sm" className="rounded-lg text-sm transition-colors whitespace-nowrap shrink-0">
          {action}
        </Button>
      </div>
    </Card>
  );
}

export default function SmartOpportunities() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">🎯 Smart Opportunities</h3>
      <div className="space-y-3">
        <OpportunityCard
          priority="HIGH"
          icon={Wind}
          title="5-min breathing at 2 PM"
          subtitle="Perfect timing based on your patterns"
          successRate={89}
          action="Set Reminder"
          gradient="from-primary/20 to-purple-800/20"
          borderColor="border-primary/30"
        />
        <OpportunityCard
          priority="MEDIUM"
          icon={Footprints}
          title="Evening walk tonight"
          subtitle="Boost tomorrow's sleep quality"
          successRate={76}
          action="Plan Route"
          gradient="from-blue-600/20 to-blue-800/20"
          borderColor="border-blue-500/30"
        />
      </div>
    </div>
  );
}
