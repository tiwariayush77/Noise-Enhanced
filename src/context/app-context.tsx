'use client';

import { createContext, ReactNode, useState } from 'react';
import { MOCK_DATA } from '@/lib/mock-data';
import type { HealthMetrics, Device, Pattern, User } from '@/lib/types';

interface AppContextType {
  user: User;
  setUser: (user: User) => void;
  energyScore: number;
  metrics: HealthMetrics;
  devices: Device[];
  patterns: Pattern[];
  mockData: typeof MOCK_DATA;
}

export const AppContext = createContext<AppContextType>({
  user: MOCK_DATA.user,
  setUser: () => {},
  energyScore: MOCK_DATA.energyScore,
  metrics: MOCK_DATA.healthMetrics,
  devices: MOCK_DATA.devices,
  patterns: MOCK_DATA.patterns,
  mockData: MOCK_DATA,
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(MOCK_DATA.user);

  const value = {
    user,
    setUser,
    energyScore: MOCK_DATA.energyScore,
    metrics: MOCK_DATA.healthMetrics,
    devices: MOCK_DATA.devices,
    patterns: MOCK_DATA.patterns,
    mockData: MOCK_DATA,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
