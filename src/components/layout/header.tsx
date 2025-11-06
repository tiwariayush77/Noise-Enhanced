'use client';

import { useContext, type Dispatch, type SetStateAction, type RefObject } from 'react';
import { AppContext } from '@/context/app-context';
import { User, Bell, Building2, Settings, HelpCircle } from 'lucide-react';

interface HeaderProps {
  showProfileDropdown: boolean;
  setShowProfileDropdown: Dispatch<SetStateAction<boolean>>;
  profileDropdownRef: RefObject<HTMLDivElement>;
}

export default function Header({
  showProfileDropdown,
  setShowProfileDropdown,
  profileDropdownRef
}: HeaderProps) {
  const { accountType, setAccountType } = useContext(AppContext);

  return (
    <header className="app-header">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src="https://www.gonoise.com/cdn/shop/files/Artboard_1_wf_1.png?v=1761318524"
              alt="Noise"
              className="h-6"
              onError={(e) => {
                const target = e.currentTarget;
                target.onerror = null; // prevent infinite loop
                target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 30'%3E%3Ctext x='10' y='20' fill='white' font-family='Arial' font-size='16' font-weight='bold'%3ENoise%3C/text%3E%3C/svg%3E";
              }}
            />
            <div className="h-4 w-px bg-gray-600"></div>
            <span className="text-xs text-primary font-medium">Intelligence</span>
          </div>

          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-white/5 rounded-full transition-colors relative">
              <Bell className="w-5 h-5 text-gray-400" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></div>
            </button>
            
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={() => setShowProfileDropdown(prev => !prev)}
                className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center"
              >
                <User className="w-4 h-4 text-white" />
              </button>

              {showProfileDropdown && (
                <div className="absolute right-0 top-10 w-48 bg-gray-900 border border-gray-700 rounded-xl shadow-lg z-50">
                  <div className="p-3 border-b border-gray-700">
                    <p className="text-sm font-medium text-white">Hi, Ayush</p>
                    <p className="text-xs text-muted-foreground">Premium Member</p>
                  </div>

                  <div className="p-2">
                    <button
                      onClick={() => {
                        setAccountType(prev => prev === 'individual' ? 'enterprise' : 'individual');
                        setShowProfileDropdown(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        {accountType === 'individual' ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Building2 className="w-4 h-4" />
                        )}
                        <span>{accountType === 'individual' ? 'Personal' : 'Enterprise'}</span>
                      </div>
                      <div className="text-xs text-primary">Switch</div>
                    </button>
                    <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded-lg transition-colors">
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </button>
                    <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded-lg transition-colors">
                      <HelpCircle className="w-4 h-4" />
                      <span>Help & Support</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
