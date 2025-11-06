'use client'
import { useContext } from 'react';
import { AppContext } from '@/context/app-context';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Lock } from 'lucide-react';

interface ChallengeCardProps {
  title: string;
  rank?: string;
  progress?: number;
  action: string;
  emoji: string;
  subtitle?: string;
  members?: number;
}

function ChallengeCard({ title, rank, progress, action, emoji, subtitle, members }: ChallengeCardProps) {
  return (
    <Card className="p-4 bg-card flex gap-4 items-center">
      <div className="text-3xl bg-secondary p-3 rounded-lg">{emoji}</div>
      <div className="flex-1">
        <h4 className="font-semibold">{title}</h4>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        {rank && <p className="text-sm text-muted-foreground">Rank: {rank}</p>}
        {members && <p className="text-sm text-muted-foreground">{members} members</p>}
        {progress !== undefined && <Progress value={progress} className="h-2 mt-2" />}
      </div>
      <Button variant="outline" size="sm" className="rounded-3xl h-10">{action}</Button>
    </Card>
  )
}

interface AchievementBadgeProps {
  title: string;
  subtitle: string;
  icon: string;
  unlocked: boolean;
}

function AchievementBadge({ title, subtitle, icon, unlocked }: AchievementBadgeProps) {
  return (
    <Card className="p-4 bg-card flex flex-col items-center text-center gap-2">
      <div className="text-3xl bg-secondary p-3 rounded-full">{icon}</div>
      <h4 className="font-semibold">{title}</h4>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
      {unlocked ? 
        <div className="flex items-center gap-1 text-success text-xs font-medium"><CheckCircle2 size={14}/> Unlocked</div> :
        <div className="flex items-center gap-1 text-muted-foreground text-xs font-medium"><Lock size={14}/> Locked</div>
      }
    </Card>
  )
}

export default function CommunityTab() {
  const { mockData } = useContext(AppContext);

  return (
    <div className="space-y-6">
      <Card className="bg-card rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-center">🌟 Your Wellness Journey</h3>
        <div className="text-center">
          <div className="text-sm text-muted-foreground">6-Month Evolution</div>
          <div className="flex justify-between items-center mt-4">
            <div>
              <div className="text-2xl font-bold text-destructive">58</div>
              <div className="text-xs text-muted-foreground">Jan</div>
            </div>
            <div className="flex-1 mx-4 h-1.5 bg-gradient-to-r from-destructive via-warning to-success rounded-full"></div>
            <div>
              <div className="text-2xl font-bold text-success">82</div>
              <div className="text-xs text-muted-foreground">Jun</div>
            </div>
          </div>
          <div className="text-sm mt-4 text-center italic bg-secondary p-3 rounded-lg">
            Key Discovery: "Evening walks improved sleep by 23%"
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">🏆 Active Challenges</h3>
        {mockData.challenges.map(challenge => (
            <ChallengeCard 
                key={challenge.id}
                title={challenge.name}
                rank={challenge.rank ? `${challenge.rank}/${challenge.total}` : undefined}
                progress={challenge.progress}
                action={challenge.action}
                emoji={challenge.emoji}
                subtitle={challenge.subtitle}
                members={challenge.members}
            />
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">🏅 Achievements</h3>
        <div className="grid grid-cols-2 gap-4">
            {mockData.achievements.map(achievement => (
                <AchievementBadge
                    key={achievement.id}
                    title={achievement.title}
                    subtitle={achievement.subtitle}
                    icon={achievement.icon}
                    unlocked={achievement.unlocked}
                />
            ))}
        </div>
      </div>

    </div>
  );
}
