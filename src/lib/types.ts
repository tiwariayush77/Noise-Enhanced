export interface HealthMetrics {
  sleep: { duration: number; quality: number; deep: number; rem: number };
  heartRate: { current: number; resting: number; recovery: number };
  stress: { level: number; peak: string; trend: string };
  activity: { steps: number; calories: number; activeMinutes: number };
}

export interface Device {
  id: string;
  name: string;
  type: 'watch' | 'ring' | 'earbuds';
  battery: number | null;
  connected: boolean;
  intelligence?: number;
  potential?: number;
}

export interface Pattern {
  type: string;
  insight: string;
  confidence: number;
  actionable: boolean;
}

export interface User {
  id: string;
  name: string;
  accountType: 'individual' | 'enterprise';
  subscription: string;
}
