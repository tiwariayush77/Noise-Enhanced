'use server';

/**
 * @fileOverview Flow for generating an optimal day timeline with personalized recommendations.
 *   It leverages health data and user habits to suggest time-slotted activities that optimize well-being and productivity.
 *
 * - generateOptimalDayTimeline - A function that generates the optimal day timeline.
 */

import { ai } from '@/ai/genkit';
import {
  OptimalDayTimelineInputSchema,
  type OptimalDayTimelineInput,
  OptimalDayTimelineOutputSchema,
  type OptimalDayTimelineOutput,
} from '@/ai/schemas';

export async function generateOptimalDayTimeline(
  input: OptimalDayTimelineInput
): Promise<OptimalDayTimelineOutput> {
  return optimalDayTimelineFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimalDayTimelinePrompt',
  input: { schema: OptimalDayTimelineInputSchema },
  output: { schema: OptimalDayTimelineOutputSchema },
  prompt: `You are an AI assistant that generates an optimal day timeline for a user based on their health metrics and habits.

  Analyze the following health data and habits to create a personalized timeline with recommendations for the user's day.

  Health Data:
  - Sleep Duration: {{{sleepDuration}}} minutes
  - Sleep Quality: {{{sleepQuality}}}%
  - Resting Heart Rate: {{{restingHeartRate}}} bpm
  - Stress Level: {{{stressLevel}}}%
  - Steps: {{{steps}}}
  - Calories Burned: {{{calories}}}
  - Active Minutes: {{{activeMinutes}}}

  Habits and Insights:
  {{#each habitsAndInsights}}
  - {{{this}}}
  {{/each}}

  Based on this information, create a timeline with 3-4 time slots, each with a time, title, subtitle, confidence level (high, medium, low), and an action for the user to take. Ensure the timeline provides actionable and relevant recommendations to optimize the user's day.
  Return the result as JSON in the following schema: ${JSON.stringify(
    OptimalDayTimelineOutputSchema.shape
  )}`,
});

const optimalDayTimelineFlow = ai.defineFlow(
  {
    name: 'optimalDayTimelineFlow',
    inputSchema: OptimalDayTimelineInputSchema,
    outputSchema: OptimalDayTimelineOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
