'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing historical health data,
 * identifying patterns, and providing personalized insights and recommendations.
 * 
 * - analyzeHealthData - A function that triggers the health data analysis flow.
 * - HealthDataInput - The input type for the analyzeHealthData function.
 * - HealthDataOutput - The return type for the analyzeHealthData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HealthDataInputSchema = z.object({
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

const HealthDataOutputSchema = z.object({
  insights: z
    .array(z.string())
    .describe('Personalized insights based on the health data.'),
  recommendations: z
    .array(z.string())
    .describe('Personalized recommendations for improving health.'),
});
export type HealthDataOutput = z.infer<typeof HealthDataOutputSchema>;

export async function analyzeHealthData(
  input: HealthDataInput
): Promise<HealthDataOutput> {
  return analyzeHealthDataFlow(input);
}

const healthAnalysisPrompt = ai.definePrompt({
  name: 'healthAnalysisPrompt',
  input: {schema: HealthDataInputSchema},
  output: {schema: HealthDataOutputSchema},
  prompt: `Analyze the following health data and user habits to provide personalized insights and recommendations.

Health Data:
- Average Sleep Duration: {{sleepDuration}} minutes
- Average Sleep Quality: {{sleepQuality}}%
- Average Resting Heart Rate: {{restingHeartRate}} bpm
- Average Stress Level: {{stressLevel}}/100
- Average Daily Steps: {{activitySteps}}

User Habits: {{userHabits}}

Based on this data, provide 3 personalized insights and 3 actionable recommendations for improving health and well-being.

Format the output as a JSON object with "insights" and "recommendations" fields, each containing an array of strings.
`,
});

const analyzeHealthDataFlow = ai.defineFlow(
  {
    name: 'analyzeHealthDataFlow',
    inputSchema: HealthDataInputSchema,
    outputSchema: HealthDataOutputSchema,
  },
  async input => {
    const {output} = await healthAnalysisPrompt(input);
    return output!;
  }
);
