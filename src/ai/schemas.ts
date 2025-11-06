/**
 * @fileOverview Centralized Zod schemas and TypeScript types for AI flows.
 */

import { z } from 'zod';

// --- Energy Score ---
export const EnergyScoreInputSchema = z.object({
  sleepDuration: z.number().describe('Sleep duration in minutes.'),
  sleepQuality: z.number().describe('Sleep quality percentage.'),
  restingHeartRate: z.number().describe('Resting heart rate in BPM.'),
  stressLevel: z.number().describe('Stress level (0-100, lower is better).'),
  activitySteps: z.number().describe('Number of steps taken.'),
  activityCalories: z.number().describe('Number of calories burned.'),
  userHabits: z
    .string()
    .optional()
    .describe('Description of user habits and routines.'),
});
export type EnergyScoreInput = z.infer<typeof EnergyScoreInputSchema>;

export const EnergyScoreOutputSchema = z.object({
  energyScore: z.number().describe('Overall energy score (0-100).'),
  explanation: z
    .string()
    .describe('Explanation of how the energy score was calculated.'),
});
export type EnergyScoreOutput = z.infer<typeof EnergyScoreOutputSchema>;

// --- Personalized Insights ---
export const HealthDataInputSchema = z.object({
  sleepDuration: z.number().describe('Average sleep duration in minutes.'),
  sleepQuality: z.number().describe('Average sleep quality score (0-100).'),
  restingHeartRate: z
    .number()
    .describe('Average resting heart rate in beats per minute.'),
  stressLevel: z.number().describe('Average stress level (0-100).'),
  activitySteps: z.number().describe('Average daily steps.'),
  userHabits: z.string().describe('Description of user habits and routines.'),
});
export type HealthDataInput = z.infer<typeof HealthDataInputSchema>;

export const HealthDataOutputSchema = z.object({
  insights: z
    .array(z.string())
    .describe('Personalized insights based on the health data.'),
  recommendations: z
    .array(z.string())
    .describe('Personalized recommendations for improving health.'),
});
export type HealthDataOutput = z.infer<typeof HealthDataOutputSchema>;

// --- Optimal Day Timeline ---
const TimeSlotSchema = z.object({
  time: z.string().describe('Time slot for the activity (e.g., 6-8 AM).'),
  title: z.string().describe('Title of the activity (e.g., Workout Window).'),
  subtitle: z
    .string()
    .describe(
      'Subtitle providing context for the activity (e.g., HRV indicates high recovery).'
    ),
  confidence: z
    .enum(['high', 'medium', 'low'])
    .describe('Confidence level of the recommendation.'),
  action: z.string().describe('Action the user can take (e.g., Start Workout).'),
});

export const OptimalDayTimelineInputSchema = z.object({
  sleepDuration: z.number().describe('Duration of sleep in minutes.'),
  sleepQuality: z.number().describe('Quality of sleep on a scale of 0-100.'),
  restingHeartRate: z
    .number()
    .describe('Resting heart rate in beats per minute.'),
  stressLevel: z.number().describe('Stress level on a scale of 0-100.'),
  steps: z.number().describe('Number of steps taken.'),
  calories: z.number().describe('Number of calories burned.'),
  activeMinutes: z.number().describe('Number of active minutes.'),
  habitsAndInsights: z
    .array(z.string())
    .describe('List of habits and insights about the user.'),
});
export type OptimalDayTimelineInput = z.infer<
  typeof OptimalDayTimelineInputSchema
>;

export const OptimalDayTimelineOutputSchema = z.object({
  timeline: z
    .array(TimeSlotSchema)
    .describe(
      'An array of time slots with personalized recommendations for the day.'
    ),
});
export type OptimalDayTimelineOutput = z.infer<
  typeof OptimalDayTimelineOutputSchema
>;

// --- Intelligence Report ---
export const IntelligenceReportInputSchema = EnergyScoreInputSchema.merge(
  OptimalDayTimelineInputSchema
).merge(HealthDataInputSchema);
export type IntelligenceReportInput = z.infer<
  typeof IntelligenceReportInputSchema
>;

export const IntelligenceReportOutputSchema = z.object({
  energyScore: EnergyScoreOutputSchema,
  timeline: OptimalDayTimelineOutputSchema,
  insights: HealthDataOutputSchema,
});
export type IntelligenceReportOutput = z.infer<
  typeof IntelligenceReportOutputSchema
>;
