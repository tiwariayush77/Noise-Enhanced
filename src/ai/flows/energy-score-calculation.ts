'use server';

/**
 * @fileOverview A flow for calculating the user's energy score based on their health metrics.
 *
 * - calculateEnergyScore - A function that calculates the energy score.
 * - EnergyScoreInput - The input type for the calculateEnergyScore function.
 * - EnergyScoreOutput - The return type for the calculateEnergyScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnergyScoreInputSchema = z.object({
  sleepDuration: z.number().describe('Sleep duration in minutes.'),
  sleepQuality: z.number().describe('Sleep quality percentage.'),
  restingHeartRate: z.number().describe('Resting heart rate in BPM.'),
  stressLevel: z.number().describe('Stress level (0-100, lower is better).'),
  activitySteps: z.number().describe('Number of steps taken.'),
  activityCalories: z.number().describe('Number of calories burned.'),
  userHabits: z.string().optional().describe('Description of user habits and routines.'),
});
export type EnergyScoreInput = z.infer<typeof EnergyScoreInputSchema>;

const EnergyScoreOutputSchema = z.object({
  energyScore: z.number().describe('Overall energy score (0-100).'),
  explanation: z.string().describe('Explanation of how the energy score was calculated.'),
});
export type EnergyScoreOutput = z.infer<typeof EnergyScoreOutputSchema>;

export async function calculateEnergyScore(input: EnergyScoreInput): Promise<EnergyScoreOutput> {
  return energyScoreFlow(input);
}

const energyScorePrompt = ai.definePrompt({
  name: 'energyScorePrompt',
  input: {schema: EnergyScoreInputSchema},
  output: {schema: EnergyScoreOutputSchema},
  prompt: `You are an AI health coach. Calculate an overall energy score (0-100) for the user based on the following data. Then explain how the score was calculated, highlighting which factors contributed positively and negatively. Be concise.\n\nSleep Duration: {{sleepDuration}} minutes\nSleep Quality: {{sleepQuality}}%\nResting Heart Rate: {{restingHeartRate}} BPM\nStress Level: {{stressLevel}} (0-100)\nActivity Steps: {{activitySteps}}\nActivity Calories: {{activityCalories}}\n\nUser Habits: {{userHabits}}\n\nEnergy Score:`,
});

const energyScoreFlow = ai.defineFlow(
  {
    name: 'energyScoreFlow',
    inputSchema: EnergyScoreInputSchema,
    outputSchema: EnergyScoreOutputSchema,
  },
  async input => {
    const {output} = await energyScorePrompt(input);
    return output!;
  }
);
