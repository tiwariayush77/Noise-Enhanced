'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, Users, CheckCircle2, Lock, CloudRain } from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Reusable Components from Community/Challenges ---
interface ChallengeCardProps {
  title: string;
  rank?: string;
  progress?: number;
  action: string;
  icon: React.ReactNode;
  subtitle?: string;
  members?: number;
}

function ChallengeCard({ title, rank, progress, action, icon, subtitle, members }: ChallengeCardProps) {
  return (
    <Card className="p-4 bg-card flex gap-4 items-center">
      <div className="text-3xl bg-secondary p-3 rounded-lg">{icon}</div>
      <div className="flex-1">
        <h4 className="font-semibold">{title}</h4>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        {rank && <p className="text-sm text-muted-foreground">Rank: {rank}</p>}
        {members && <p className="text-sm text-muted-foreground">{members} members</p>}
        {progress !== undefined && <Progress value={progress} className="h-2 mt-2" />}
      </div>
      <Button variant="outline" size="sm" className="rounded-3xl h-10">
        {action}
      </Button>
    </Card>
  );
}

interface AchievementBadgeProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  unlocked: boolean;
}

function AchievementBadge({ title, subtitle, icon, unlocked }: AchievementBadgeProps) {
  return (
    <Card className="p-4 bg-card flex flex-col items-center text-center gap-2">
      <div className="text-3xl bg-secondary p-3 rounded-full">{icon}</div>
      <h4 className="font-semibold">{title}</h4>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
      {unlocked ? (
        <div className="flex items-center gap-1 text-success text-xs font-medium">
          <CheckCircle2 size={14} /> Unlocked
        </div>
      ) : (
        <div className="flex items-center gap-1 text-muted-foreground text-xs font-medium">
          <Lock size={14} /> Locked
        </div>
      )}
    </Card>
  );
}

// --- Social Tab ---
type SocialTabType = 'challenges' | 'friends';

export default function SocialTab() {
  const [socialTab, setSocialTab] = useState<SocialTabType>('challenges');

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Social Fitness</h2>
      
      <div className="flex space-x-6 border-b border-gray-800 mb-6">
        <button
          onClick={() => setSocialTab('challenges')}
          className={cn(
            'pb-3 border-b-2 font-medium transition-colors',
            socialTab === 'challenges'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500'
          )}
        >
          Challenges
        </button>
        <button
          onClick={() => setSocialTab('friends')}
          className={cn(
            'pb-3 border-b-2 font-medium transition-colors',
            socialTab === 'friends'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500'
          )}
        >
          Friends
        </button>
      </div>

      {socialTab === 'challenges' && (
        <div>
          <Card className="bg-gradient-to-br from-primary/20 to-purple-900/20 border border-primary/30 rounded-2xl p-6 mb-6">
            <div className="flex items-start space-x-4">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">Create Custom Challenge</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Challenge your friends to reach fitness goals
                </p>
                <Button className="w-full bg-primary hover:bg-primary/80 text-primary-foreground py-3 h-auto rounded-xl font-medium transition-colors">
                  Create Challenge
                </Button>
              </div>
            </div>
          </Card>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Active Challenges</h3>
            <ChallengeCard
              title="Mumbai Monsoon Fitness"
              rank="47/1247"
              progress={67}
              action="Continue"
              icon={<CloudRain className="text-blue-400" />}
            />
             <ChallengeCard
              title="Friend Circle Sprint"
              members={4}
              subtitle="Created by Mike"
              progress={82}
              action="View Board"
              icon={<Users className="text-green-400" />}
            />
          </div>
        </div>
      )}

      {socialTab === 'friends' && (
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
        </div>
      )}
    </div>
  );
}
