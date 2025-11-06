'use client';

import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import { MOCK_DATA } from '@/lib/mock-data';
import type { HealthMetrics, Device, Pattern, User } from '@/lib/types';
import { generateIntelligenceReport } from '@/ai/flows/intelligence-report';
import type { IntelligenceReportOutput } from '@/ai/schemas';

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
  aiReport: IntelligenceReportOutput | null;
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
  aiReport: null,
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(MOCK_DATA.user);
  const [accountType, setAccountType] = useState<AccountType>('individual');
  const [aiReport, setAiReport] = useState<IntelligenceReportOutput | null>(
    null
  );

  const metrics = MOCK_DATA.healthMetrics;
  const patterns = MOCK_DATA.patterns;

  useEffect(() => {
    async function getIntelligenceReport() {
      try {
        const input = {
          // Energy Score Inputs
          sleepDuration: metrics.sleep.duration,
          sleepQuality: metrics.sleep.quality,
          restingHeartRate: metrics.heartRate.resting,
          stressLevel: metrics.stress.level,
          activitySteps: metrics.activity.steps,
          activityCalories: metrics.activity.calories,
          userHabits:
            'Mix of office work and evening walks. Tries to sleep 7-8 hours.',
          // Timeline Inputs
          steps: metrics.activity.steps,
          calories: metrics.activity.calories,
          activeMinutes: metrics.activity.activeMinutes,
          habitsAndInsights: patterns.map((p) => p.insight),
        };
        const result = await generateIntelligenceReport(input);
        setAiReport(result);
      } catch (error) {
        console.error('Failed to generate intelligence report:', error);
        // You might want to set a fallback or error state here
      }
    }
    getIntelligenceReport();
  }, []); // Run once on mount

  const value = {
    user,
    setUser,
    accountType,
    setAccountType,
    energyScore: aiReport?.energyScore.energyScore ?? MOCK_DATA.energyScore,
    metrics: MOCK_DATA.healthMetrics,
    devices: MOCK_DATA.devices,
    patterns: MOCK_DATA.patterns,
    mockData: MOCK_DATA,
    aiReport,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
