'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing historical health data,
 * identifying patterns, and providing personalized insights and recommendations.
 *
 * - analyzeHealthData - A function that triggers the health data analysis flow.
 */

import { ai } from '@/ai/genkit';
import {
  HealthDataInputSchema,
  type HealthDataInput,
  HealthDataOutputSchema,
  type HealthDataOutput,
} from '@/ai/schemas';

export async function analyzeHealthData(
  input: HealthDataInput
): Promise<HealthDataOutput> {
  return analyzeHealthDataFlow(input);
}

const healthAnalysisPrompt = ai.definePrompt({
  name: 'healthAnalysisPrompt',
  input: { schema: HealthDataInputSchema },
  output: { schema: HealthDataOutputSchema },
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
  async (input) => {
    const { output } = await healthAnalysisPrompt(input);
    return output!;
  }
);
