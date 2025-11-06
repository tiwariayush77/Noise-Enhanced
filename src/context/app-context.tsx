'use client';

import { createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';
import { MOCK_DATA } from '@/lib/mock-data';
import type { HealthMetrics, Device, Pattern, User } from '@/lib/types';

type AccountType = 'individual' | 'enterprise';

interface AppContextType {
  user: User;
  setUser: (user: User) => void;
  accountType: AccountType;
  setAccountType: Dispatch<SetStateAction<AccountType>>;
  energyScore: number;
  metrics: HealthMetrics;
  devices: Device[];
  patterns: Pattern[];
  mockData: typeof MOCK_DATA;
}

export const AppContext = createContext<AppContextType>({
  user: MOCK_DATA.user,
  setUser: () => {},
  accountType: 'individual',
  setAccountType: () => {},
  energyScore: MOCK_DATA.energyScore,
  metrics: MOCK_DATA.healthMetrics,
  devices: MOCK_DATA.devices,
  patterns: MOCK_DATA.patterns,
  mockData: MOCK_DATA,
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(MOCK_DATA.user);
  const [accountType, setAccountType] = useState<AccountType>(MOCK_DATA.user.accountType);

  const value = {
    user,
    setUser,
    accountType,
    setAccountType,
    energyScore: MOCK_DATA.energyScore,
    metrics: MOCK_DATA.healthMetrics,
    devices: MOCK_DATA.devices,
    patterns: MOCK_DATA.patterns,
    mockData: MOCK_DATA,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
