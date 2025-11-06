'use client';

import { useState, useContext } from 'react';
import { AppContext } from '@/context/app-context';
import type { User } from '@/lib/types';

import Header from '@/components/layout/header';
import BottomNav from '@/components/layout/bottom-nav';
import IntelligenceTab from '@/components/tabs/intelligence/intelligence-tab';
import DevicesTab from '@/components/tabs/devices/devices-tab';
import EnterpriseTab from '@/components/tabs/enterprise/enterprise-tab';
import CommunityTab from '@/components/tabs/community/community-tab';

export type Tab = 'intelligence' | 'devices' | 'enterprise' | 'community';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('intelligence');
  const { user } = useContext(AppContext);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'intelligence':
        return <IntelligenceTab />;
      case 'devices':
        return <DevicesTab />;
      case 'enterprise':
        return user.accountType === 'enterprise' ? <EnterpriseTab /> : null;
      case 'community':
        return <CommunityTab />;
      default:
        return <IntelligenceTab />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6 pb-24">
        {renderTabContent()}
      </main>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} user={user as User} />
    </div>
  );
}
