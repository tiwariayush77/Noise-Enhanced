'use client';

import { useContext } from 'react';
import { AppContext } from '@/context/app-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Zap, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const { user, setUser } = useContext(AppContext);

  const toggleAccountType = () => {
    setUser({
      ...user,
      accountType: user.accountType === 'individual' ? 'enterprise' : 'individual',
    });
  };

  return (
    <header className="container mx-auto px-4 pt-6 pb-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Zap className="text-primary" size={28} />
          <h1 className="text-3xl font-bold tracking-tight">InsightFlow</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={toggleAccountType} size="sm" className="rounded-full">
            {user.accountType === 'individual' ? '👤' : <Building2 size={16} />}
            <span className="ml-2 hidden sm:inline">{user.accountType === 'individual' ? 'Individual' : 'Enterprise'}</span>
          </Button>
          <Avatar>
            <AvatarImage src={`https://i.pravatar.cc/150?u=${user.id}`} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
