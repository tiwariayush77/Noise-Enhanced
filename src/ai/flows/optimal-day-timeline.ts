'use server';

/**
 * @fileOverview Flow for generating an optimal day timeline with personalized recommendations.
 *   It leverages health data and user habits to suggest time-slotted activities that optimize well-being and productivity.
 *
 * - generateOptimalDayTimeline - A function that generates the optimal day timeline.
 * - OptimalDayTimelineInput - The input type for the generateOptimalDayTimeline function.
 * - OptimalDayTimelineOutput - The return type for the generateOptimalDayTimeline function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimalDayTimelineInputSchema = z.object({
  sleepDuration: z.number().describe('Duration of sleep in minutes.'),
  sleepQuality: z.number().describe('Quality of sleep on a scale of 0-100.'),
  restingHeartRate: z.number().describe('Resting heart rate in beats per minute.'),
  stressLevel: z.number().describe('Stress level on a scale of 0-100.'),
  steps: z.number().describe('Number of steps taken.'),
  calories: z.number().describe('Number of calories burned.'),
  activeMinutes: z.number().describe('Number of active minutes.'),
  habitsAndInsights: z.array(z.string()).describe('List of habits and insights about the user.'),
});

export type OptimalDayTimelineInput = z.infer<typeof OptimalDayTimelineInputSchema>;

const TimeSlotSchema = z.object({
  time: z.string().describe('Time slot for the activity (e.g., 6-8 AM).'),
  title: z.string().describe('Title of the activity (e.g., Workout Window).'),
  subtitle: z.string().describe('Subtitle providing context for the activity (e.g., HRV indicates high recovery).'),
  confidence: z.enum(['high', 'medium', 'low']).describe('Confidence level of the recommendation.'),
  action: z.string().describe('Action the user can take (e.g., Start Workout).'),
});

const OptimalDayTimelineOutputSchema = z.object({
  timeline: z.array(TimeSlotSchema).describe('An array of time slots with personalized recommendations for the day.'),
});

export type OptimalDayTimelineOutput = z.infer<typeof OptimalDayTimelineOutputSchema>;

export async function generateOptimalDayTimeline(input: OptimalDayTimelineInput): Promise<OptimalDayTimelineOutput> {
  return optimalDayTimelineFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimalDayTimelinePrompt',
  input: {schema: OptimalDayTimelineInputSchema},
  output: {schema: OptimalDayTimelineOutputSchema},
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
  Return the result as JSON in the following schema: ${JSON.stringify(OptimalDayTimelineOutputSchema.shape)}`,
});

const optimalDayTimelineFlow = ai.defineFlow(
  {
    name: 'optimalDayTimelineFlow',
    inputSchema: OptimalDayTimelineInputSchema,
    outputSchema: OptimalDayTimelineOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

