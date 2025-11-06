'use client';

import type { Dispatch, SetStateAction } from 'react';
import { BrainCircuit, Watch, Building2, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Tab } from '@/app/page';
import type { User } from '@/lib/types';

interface BottomNavProps {
  activeTab: Tab;
  setActiveTab: Dispatch<SetStateAction<Tab>>;
  user: User;
}

const navItems = [
  { id: 'intelligence', label: 'Intelligence', icon: BrainCircuit },
  { id: 'devices', label: 'Devices', icon: Watch },
  { id: 'enterprise', label: 'Enterprise', icon: Building2, enterpriseOnly: true },
  { id: 'community', label: 'Community', icon: Users },
];

export default function BottomNav({ activeTab, setActiveTab, user }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border h-20">
      <div className="container mx-auto h-full flex justify-around items-center">
        {navItems.map((item) => {
          if (item.enterpriseOnly && user.accountType !== 'enterprise') {
            return null;
          }
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={cn(
                'flex flex-col items-center justify-center gap-1 transition-colors duration-200 w-20',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
