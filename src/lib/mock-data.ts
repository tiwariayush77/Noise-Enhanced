export const MOCK_DATA = {
  user: {
    id: "user123",
    name: "Alex Chen",
    accountType: "individual" as "individual" | "enterprise", // "enterprise"
    subscription: "premium"
  },
  energyScore: 82,
  ecosystemScore: 91,
  healthMetrics: {
    sleep: { duration: 442, quality: 85, deep: 18, rem: 22 },
    heartRate: { current: 72, resting: 58, recovery: 92 },
    stress: { level: 35, peak: "14:30", trend: "improving" },
    activity: { steps: 8547, calories: 320, activeMinutes: 45 }
  },
  devices: [
    { id: "watch1", name: "ColorFit Pro 6 Max", type: "watch", battery: 67, connected: true, intelligence: 45 },
    { id: "ring1", name: "Luna Ring 2.0", type: "ring", battery: 89, connected: true, intelligence: 35 },
    { id: "buds1", name: "Master Buds Max", type: "earbuds", battery: null, connected: false, potential: 15 }
  ],
  patterns: [
    { type: "sleep", insight: "Evening walks improve sleep quality by 23%", confidence: 0.89, actionable: true },
    { type: "stress", insight: "5-min breathing sessions work 89% of the time", confidence: 0.91, actionable: true },
    { type: "energy", insight: "Peak focus occurs 10 AM - 12 PM daily", confidence: 0.87, actionable: true }
  ],
  timeline: [
    { time: "6-8 AM", title: "Optimal Workout", confidence: "high", current: true, subtitle: "HRV indicates high recovery", action: "Start Workout" },
    { time: "10-12 PM", title: "Peak Focus", confidence: "high", current: false, subtitle: "Cortisol optimal for concentration", action: "Schedule Tasks" },
    { time: "2-3 PM", title: "Movement Break", confidence: "medium", current: false, subtitle: "Beat the afternoon dip", action: "Take Walk" }
  ],
  enterprise: {
    organization: "TechCorp India Pvt Ltd",
    department: "Engineering",
    teamSize: 47,
    teamScore: 74,
    departments: [
        { name: "Engineering", score: 68, status: "warning" },
        { name: "Marketing", score: 81, status: "success" },
        { name: "Sales", score: 75, status: "success" }
    ]
  },
  challenges: [
    { id: "c1", name: "Mumbai Monsoon Fitness", rank: 47, total: 1247, progress: 67, emoji: "🌧️", action: "Continue" },
    { id: "c2", name: "Friend Circle Sprint", members: 4, creator: "Mike", goal: "10K daily steps", emoji: "👥", action: "View Board", subtitle: "Created by Mike" }
  ],
  achievements: [
    { id: "a1", title: "Pattern Master", subtitle: "Discovered 5 patterns", unlocked: true, icon: "✨" },
    { id: "a2", title: "Prediction Pro", subtitle: "89% AI accuracy", unlocked: true, icon: "🎯" }
  ]
};
