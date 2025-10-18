'use server';
/**
 * @fileOverview Generates AI-driven coaching recommendations for sales representatives based on call analysis.
 *
 * - generateAICoachingRecommendations - A function that generates coaching recommendations.
 * - GenerateAICoachingRecommendationsInput - The input type for the generateAICoachingRecommendations function.
 * - GenerateAICoachingRecommendationsOutput - The return type for the generateAICoachingRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAICoachingRecommendationsInputSchema = z.object({
  callTranscript: z
    .string()
    .describe('The transcript of the sales call to analyze.'),
  repName: z.string().describe('The name of the sales representative.'),
});
export type GenerateAICoachingRecommendationsInput =
  z.infer<typeof GenerateAICoachingRecommendationsInputSchema>;

const GenerateAICoachingRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('A list of coaching recommendations for the sales representative.'),
});
export type GenerateAICoachingRecommendationsOutput =
  z.infer<typeof GenerateAICoachingRecommendationsOutputSchema>;

export async function generateAICoachingRecommendations(
  input: GenerateAICoachingRecommendationsInput
): Promise<GenerateAICoachingRecommendationsOutput> {
  return generateAICoachingRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAICoachingRecommendationsPrompt',
  input: {schema: GenerateAICoachingRecommendationsInputSchema},
  output: {schema: GenerateAICoachingRecommendationsOutputSchema},
  prompt: `You are an AI-powered sales coaching assistant. Analyze the following call transcript of sales rep {{repName}} and provide specific, actionable coaching recommendations to improve their sales performance. Focus on areas such as communication skills, objection handling, and closing techniques.

Call Transcript:
{{callTranscript}}

Provide the recommendations as a list of strings.
`,
});

const generateAICoachingRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateAICoachingRecommendationsFlow',
    inputSchema: GenerateAICoachingRecommendationsInputSchema,
    outputSchema: GenerateAICoachingRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
