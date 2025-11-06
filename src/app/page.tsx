'use client';

import { useState, useContext } from 'react';
import { AppContext } from '@/context/app-context';

import Header from '@/components/layout/header';
import BottomNav from '@/components/layout/bottom-nav';
import IntelligenceTab from '@/components/tabs/intelligence/intelligence-tab';
import DevicesTab from '@/components/tabs/devices/devices-tab';
import CommunityTab from '@/components/tabs/community/community-tab';
import ChallengesTab from '@/components/tabs/challenges/challenges-tab';
import ShopTab from '@/components/tabs/shop/shop-tab';
import EnterpriseTab from '@/components/tabs/enterprise/enterprise-tab';

export type Tab = 'home' | 'challenges' | 'friends' | 'shop' | 'devices' | 'enterprise';

export default function Home() {
  const { user, accountType } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  
  const renderTabContent = () => {
    if (!user) {
      return (
        <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-primary/20 flex items-center justify-center">
          <div className="text-center">
            <img 
              src="https://cdn.brandfetch.io/idZViZh4Xg/w/820/h/820/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B" 
              alt="Noise" 
              className="w-16 h-16 mx-auto mb-4 animate-pulse"
            />
            <h2 className="text-2xl font-bold text-white mb-2">NoiseFit</h2>
            <p className="text-primary text-sm">Loading your intelligence...</p>
            <div className="mt-4 w-32 h-1 bg-gray-700 rounded-full overflow-hidden mx-auto">
              <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      );
    }

    if (accountType === 'enterprise' && activeTab === 'home') {
      return <EnterpriseTab />;
    }

    switch (activeTab) {
      case 'home':
        return <IntelligenceTab />;
      case 'challenges':
        return <ChallengesTab />;
      case 'friends':
        return <CommunityTab />;
      case 'shop':
        return <ShopTab />;
      case 'devices':
        return <DevicesTab />;
      case 'enterprise':
        return <EnterpriseTab />;
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
      {user && <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />}
    </div>
  );
}
