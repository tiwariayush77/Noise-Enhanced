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
  const NavTab = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col items-center justify-center gap-1 transition-colors duration-200 w-20',
        active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
      )}
      aria-current={active ? 'page' : undefined}
    >
      <Icon size={24} strokeWidth={active ? 2.5 : 2} />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-black to-gray-900 border-t border-white/10 backdrop-blur-lg">
      <div className="container mx-auto h-20 flex justify-around items-center">
        {navItems.map((item) => {
          if (item.enterpriseOnly && user?.accountType !== 'enterprise') {
            return null;
          }
          return (
            <NavTab
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={activeTab === item.id}
              onClick={() => setActiveTab(item.id as Tab)}
            />
          );
        })}
      </div>
       <div className="flex justify-center pb-1">
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>
       </div>
    </nav>
  );
}
