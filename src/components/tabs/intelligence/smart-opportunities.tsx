import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface OpportunityCardProps {
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  subtitle: string;
  action: string;
  badgeColor: 'purple' | 'blue';
}

const impactClasses = {
  HIGH: 'bg-primary text-primary-foreground',
  MEDIUM: 'bg-blue-500 text-white',
  LOW: 'bg-secondary text-secondary-foreground'
}

function OpportunityCard({ impact, title, subtitle, action, badgeColor }: OpportunityCardProps) {
  return (
    <Card className="p-4 flex items-center gap-4 bg-card">
      <Badge variant="default" className={cn("text-xs font-bold", impactClasses[impact])}>{impact}</Badge>
      <div className="flex-1">
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <Button size="sm" className="rounded-3xl h-10">{action}</Button>
    </Card>
  )
}


export default function SmartOpportunities() {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">🎯 Smart Opportunities</h3>
            <OpportunityCard 
                impact="HIGH" 
                title="5-min breathing at 2 PM" 
                subtitle="Success rate: 89% for you" 
                action="Set Reminder" 
                badgeColor="purple" 
            />
            <OpportunityCard 
                impact="MEDIUM" 
                title="Evening walk tonight" 
                subtitle="Improves sleep quality 23%" 
                action="Plan Route" 
                badgeColor="blue" 
            />
        </div>
    )
}
