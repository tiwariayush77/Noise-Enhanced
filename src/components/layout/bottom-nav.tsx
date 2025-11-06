'use client';

import type { Dispatch, SetStateAction } from 'react';
import { cn } from '@/lib/utils';
import type { Tab } from '@/app/page';
import { Home, Trophy, Users, ShoppingBag, Smartphone } from 'lucide-react';


interface BottomNavProps {
  activeTab: Tab;
  setActiveTab: Dispatch<SetStateAction<Tab>>;
}

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const NavButton = ({ active, onClick, icon, label }: NavButtonProps) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center space-y-1 py-2 px-4 transition-colors"
  >
    <div className={cn(active ? 'text-primary' : 'text-gray-500', 'transition-colors')}>
      {icon}
    </div>
    <span className={cn('text-xs font-medium', active ? 'text-primary' : 'text-gray-500')}>
      {label}
    </span>
  </button>
);

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800">
      <div className="container mx-auto flex items-center justify-around px-1 py-2">
        <NavButton
          active={activeTab === 'home' || activeTab === 'enterprise'}
          onClick={() => setActiveTab('home')}
          icon={<Home className="w-5 h-5" />}
          label="Home"
        />
        <NavButton
          active={activeTab === 'challenges'}
          onClick={() => setActiveTab('challenges')}
          icon={<Trophy className="w-5 h-5" />}
          label="Challenges"
        />
        <NavButton
          active={activeTab === 'friends'}
          onClick={() => setActiveTab('friends')}
          icon={<Users className="w-5 h-5" />}
          label="Friends"
        />
        <NavButton
          active={activeTab === 'shop'}
          onClick={() => setActiveTab('shop')}
          icon={<ShoppingBag className="w-5 h-5" />}
          label="Shop"
        />
        <NavButton
          active={activeTab === 'devices'}
          onClick={() => setActiveTab('devices')}
          icon={<Smartphone className="w-5 h-5" />}
          label="Devices"
        />
      </div>
    </nav>
  );
}
