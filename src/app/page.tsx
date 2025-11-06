'use client';

import { useState, useContext, useEffect, useRef } from 'react';
import { AppContext } from '@/context/app-context';

import Header from '@/components/layout/header';
import BottomNav from '@/components/layout/bottom-nav';
import IntelligenceTab from '@/components/tabs/intelligence/intelligence-tab';
import DevicesTab from '@/components/tabs/devices/devices-tab';
import SocialTab from '@/components/tabs/social/social-tab';
import ShopTab from '@/components/tabs/shop/shop-tab';
import EnterpriseTab from '@/components/tabs/enterprise/enterprise-tab';

export type Tab =
  | 'home'
  | 'social'
  | 'shop'
  | 'devices'
  | 'enterprise';

export default function Home() {
  const { user, accountType, setAccountType } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // If switching to individual and currently on enterprise tab, redirect to home
    if (accountType === 'individual' && activeTab === 'enterprise') {
      setActiveTab('home');
    }
  }, [accountType, activeTab]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileDropdownRef]);


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
      case 'social':
        return <SocialTab />;
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
      <Header
        showProfileDropdown={showProfileDropdown}
        setShowProfileDropdown={setShowProfileDropdown}
        profileDropdownRef={profileDropdownRef}
      />
      <main className="flex-grow container mx-auto px-4 py-6 pb-24">
        {renderTabContent()}
      </main>
      {user && (
        <BottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          accountType={accountType}
        />
      )}
    </div>
  );
}
