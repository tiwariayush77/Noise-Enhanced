'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy } from 'lucide-react';

export default function ChallengesTab() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Challenges</h2>
      
      <div className="flex space-x-6 border-b border-gray-800 mb-6">
        <button className="pb-3 border-b-2 border-primary text-primary font-medium">
          New
        </button>
        <button className="pb-3 text-gray-500 font-medium">
          Joined
        </button>
      </div>
      
      <Card className="bg-gradient-to-br from-primary/20 to-purple-900/20 border border-primary/30 rounded-2xl p-6">
        <div className="flex items-start space-x-4">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-primary rounded-full flex items-center justify-center flex-shrink-0">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1">Custom challenge</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create your own challenge & compete with your friends
            </p>
            <Button className="w-full bg-primary hover:bg-primary/80 text-primary-foreground py-3 h-auto rounded-xl font-medium transition-colors">
              Create a challenge
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
