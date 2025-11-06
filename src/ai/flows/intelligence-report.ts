'use server';
/**
 * @fileOverview A unified Genkit flow to generate a complete intelligence report,
 * including energy score, optimal day timeline, and personalized insights.
 * This helps in reducing the number of API calls and avoiding rate limits.
 *
 * - generateIntelligenceReport - A function that generates the full report.
 */

import { ai } from '@/ai/genkit';
import {
  IntelligenceReportInputSchema,
  type IntelligenceReportInput,
  IntelligenceReportOutputSchema,
  type IntelligenceReportOutput,
} from '@/ai/schemas';

export async function generateIntelligenceReport(
  input: IntelligenceReportInput
): Promise<IntelligenceReportOutput> {
  return intelligenceReportFlow(input);
}

const reportPrompt = ai.definePrompt({
  name: 'intelligenceReportPrompt',
  input: { schema: IntelligenceReportInputSchema },
  output: { schema: IntelligenceReportOutputSchema },
  prompt: `You are an AI health coach. Based on the provided health data and user habits, generate a comprehensive intelligence report.

The report must include three parts:
1.  **Energy Score**: Calculate an overall energy score (0-100) and provide a brief explanation.
2.  **Optimal Day Timeline**: Create a timeline with 3-4 personalized time-slotted recommendations.
3.  **Personalized Insights**: Provide 3 personalized insights and 3 actionable recommendations for improving health.

Health Data & Habits:
- Sleep Duration: {{sleepDuration}} minutes
- Sleep Quality: {{sleepQuality}}%
- Resting Heart Rate: {{restingHeartRate}} BPM
- Stress Level: {{stressLevel}} (0-100)
- Activity Steps: {{activitySteps}}
- Activity Calories: {{activityCalories}}
- Active Minutes: {{activeMinutes}}
- User Habits & Insights: {{userHabits}}
{{#each habitsAndInsights}}
- {{{this}}}
{{/each}}

Return the entire report as a single, valid JSON object that strictly adheres to the following structure:
{
  "energyScore": {
    "energyScore": <number>,
    "explanation": "<string>"
  },
  "timeline": {
    "timeline": [
      {
        "time": "<string>",
        "title": "<string>",
        "subtitle": "<string>",
        "confidence": "<'high'|'medium'|'low'>",
        "action": "<string>"
      }
    ]
  },
  "insights": {
    "insights": ["<string>", "..."],
    "recommendations": ["<string>", "..."]
  }
}
`,
});

const intelligenceReportFlow = ai.defineFlow(
  {
    name: 'intelligenceReportFlow',
    inputSchema: IntelligenceReportInputSchema,
    outputSchema: IntelligenceReportOutputSchema,
  },
  async (input) => {
    const { output } = await reportPrompt(input);
    if (!output) {
      throw new Error('Failed to generate intelligence report.');
    }
    return output;
  }
);
