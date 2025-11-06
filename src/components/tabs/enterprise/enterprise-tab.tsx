'use client'
import { useContext } from 'react';
import { AppContext } from '@/context/app-context';
import { Card } from '@/components/ui/card';
import CircularProgress from '@/components/shared/circular-progress';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface DeptScoreProps {
  dept: string;
  score: number;
  status: 'success' | 'warning' | 'error';
}

const statusColors = {
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-destructive',
};

function DeptScore({ dept, score, status }: DeptScoreProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium">{dept}</span>
        <span className="text-sm font-bold">{score}</span>
      </div>
      <Progress value={score} className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-accent" />
    </div>
  );
}

interface TeamOpportunityProps {
    priority: 'HIGH' | 'MEDIUM';
    title: string;
    impact: string;
    action: string;
}

function TeamOpportunity({ priority, title, impact, action }: TeamOpportunityProps) {
    return (
        <Card className="p-4 bg-card">
            <Badge className={cn(priority === 'HIGH' ? 'bg-primary' : 'bg-blue-500', 'text-primary-foreground mb-2')}>{priority} PRIORITY</Badge>
            <h4 className="font-semibold">{title}</h4>
            <p className="text-sm text-muted-foreground mb-3">{impact}</p>
            <Button className="w-full rounded-3xl h-11">{action}</Button>
        </Card>
    )
}


export default function EnterpriseTab() {
  const { mockData } = useContext(AppContext);
  const { enterprise } = mockData;
  const scoreColor = enterprise.teamScore > 80 ? 'success' : enterprise.teamScore > 60 ? 'warning' : 'error';
  const scoreStatus = enterprise.teamScore > 80 ? 'EXCELLENT' : enterprise.teamScore > 60 ? 'GOOD' : 'FAIR';


  return (
    <div className="space-y-6">
      <Card className="bg-card rounded-xl p-4">
        <div className="text-lg font-semibold">🏛️ {enterprise.organization}</div>
        <div className="text-muted-foreground">{enterprise.department} - {enterprise.teamSize} members</div>
      </Card>

      <Card className="bg-card rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-center">📊 Team Wellness</h3>
        <div className="flex justify-center relative">
          <CircularProgress size={80} value={enterprise.teamScore} color={scoreColor} />
           <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <div className="text-xl font-bold">{enterprise.teamScore}</div>
            </div>
        </div>
        <div className="text-center mt-2">
            <div className={cn("font-bold", `text-${scoreColor}`)}>{scoreStatus}</div>
        </div>
        <div className="mt-4 space-y-4">
            {enterprise.departments.map(dept => (
                 <DeptScore key={dept.name} dept={dept.name} score={dept.score} status={dept.status as 'success' | 'warning'} />
            ))}
        </div>
      </Card>

      <div className="space-y-4">
      <h3 className="text-lg font-semibold">🚀 Team Opportunities</h3>
        <TeamOpportunity 
            priority="HIGH"
            title="Team stress management program"
            impact="25% wellness boost potential"
            action="Suggest to HR"
        />
        <TeamOpportunity 
            priority="MEDIUM"
            title="Flexible work hours trial"
            impact="Based on team sleep patterns"
            action="View Details"
        />
      </div>
    </div>
  );
}
