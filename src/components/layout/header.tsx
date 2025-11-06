'use client';

import { useContext } from 'react';
import Image from 'next/image';
import { AppContext } from '@/context/app-context';
import { Building2, User as UserIcon } from 'lucide-react';

export default function Header() {
  const { user, setUser } = useContext(AppContext);

  const toggleAccountType = () => {
    if (user) {
      setUser({
        ...user,
        accountType: user.accountType === 'individual' ? 'enterprise' : 'individual',
      });
    }
  };

  return (
    <header className="app-header">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Image 
              src="https://cdn.brandfetch.io/idZViZh4Xg/w/820/h/820/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B" 
              alt="Noise"
              width={32}
              height={32}
              className="noise-logo"
            />
            <div>
              <h1 className="text-xl font-bold text-white">NoiseFit</h1>
              <div className="text-xs text-primary font-medium">Intelligence Platform</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={toggleAccountType}
              className="text-xs bg-primary hover:bg-primary/80 px-3 py-1.5 rounded-full transition-colors flex items-center space-x-1 text-primary-foreground"
            >
              {user?.accountType === 'individual' ? (
                <>
                  <UserIcon className="w-3 h-3" />
                  <span>Personal</span>
                </>
              ) : (
                <>
                  <Building2 className="w-3 h-3" />
                  <span>Enterprise</span>
                </>
              )}
            </button>
            
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <UserIcon className="w-4 h-4 text-primary-foreground" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
