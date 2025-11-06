'use server';

/**
 * @fileOverview A flow for calculating the user's energy score based on their health metrics.
 *
 * - calculateEnergyScore - A function that calculates the energy score.
 */

import { ai } from '@/ai/genkit';
import {
  EnergyScoreInputSchema,
  type EnergyScoreInput,
  EnergyScoreOutputSchema,
  type EnergyScoreOutput,
} from '@/ai/schemas';

export async function calculateEnergyScore(
  input: EnergyScoreInput
): Promise<EnergyScoreOutput> {
  return energyScoreFlow(input);
}

const energyScorePrompt = ai.definePrompt({
  name: 'energyScorePrompt',
  input: { schema: EnergyScoreInputSchema },
  output: { schema: EnergyScoreOutputSchema },
  prompt: `You are an AI health coach. Calculate an overall energy score (0-100) for the user based on the following data. Then explain how the score was calculated, highlighting which factors contributed positively and negatively. Be concise.

Sleep Duration: {{sleepDuration}} minutes
Sleep Quality: {{sleepQuality}}%
Resting Heart Rate: {{restingHeartRate}} BPM
Stress Level: {{stressLevel}} (0-100)
Activity Steps: {{activitySteps}}
Activity Calories: {{activityCalories}}

User Habits: {{userHabits}}

Return the result as a JSON object that strictly adheres to the following schema:
{
  "energyScore": <number>,
  "explanation": "<string>"
}
The explanation should be a single, concise sentence. For example: "Your energy is high due to good sleep and low stress. Perfect day for challenges! 💪"`,
});

const energyScoreFlow = ai.defineFlow(
  {
    name: 'energyScoreFlow',
    inputSchema: EnergyScoreInputSchema,
    outputSchema: EnergyScoreOutputSchema,
  },
  async (input) => {
    const { output } = await energyScorePrompt(input);
    return output!;
  }
);
