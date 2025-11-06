'use client';

import { useContext } from 'react';
import { AppContext } from '@/context/app-context';
import { User, Search, Bell } from 'lucide-react';

export default function Header() {
  const { user, setUser } = useContext(AppContext);

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
            <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <Search className="w-5 h-5 text-gray-400" />
            </button>
            
            <button className="p-2 hover:bg-white/5 rounded-full transition-colors relative">
              <Bell className="w-5 h-5 text-gray-400" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></div>
            </button>
            
            <button className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
