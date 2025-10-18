'use server';
/**
 * @fileOverview This file defines a Genkit flow for suggesting actionable follow-up steps and drafting email content after a sales call.
 *
 * The flow takes in information about the call, including the transcript, participants, and any identified key points, and outputs suggested next steps and a draft email.
 *
 * @fileOverview
 *
 * - suggestActionableFollowUp - A function that suggests actionable follow-up steps and drafts email content.
 * - SuggestActionableFollowUpInput - The input type for the suggestActionableFollowUp function.
 * - SuggestActionableFollowUpOutput - The return type for the suggestActionableFollowUp function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestActionableFollowUpInputSchema = z.object({
  transcript: z.string().describe('The transcript of the sales call.'),
  participants: z.string().describe('The participants of the sales call.'),
  keyPoints: z.string().describe('Key points and topics discussed during the call.'),
  company: z.string().describe('The company involved in the call.'),
});

export type SuggestActionableFollowUpInput = z.infer<typeof SuggestActionableFollowUpInputSchema>;

const SuggestActionableFollowUpOutputSchema = z.object({
  suggestedActions: z.array(z.string()).describe('A list of suggested follow-up actions.'),
  emailDraft: z.string().describe('A draft email to send to the prospect.'),
});

export type SuggestActionableFollowUpOutput = z.infer<typeof SuggestActionableFollowUpOutputSchema>;

export async function suggestActionableFollowUp(input: SuggestActionableFollowUpInput): Promise<SuggestActionableFollowUpOutput> {
  return suggestActionableFollowUpFlow(input);
}

const suggestActionableFollowUpPrompt = ai.definePrompt({
  name: 'suggestActionableFollowUpPrompt',
  input: {
    schema: SuggestActionableFollowUpInputSchema,
  },
  output: {
    schema: SuggestActionableFollowUpOutputSchema,
  },
  prompt: `You are an AI assistant designed to help sales representatives with follow-up after a sales call.  Given the following information about the call, suggest actionable follow-up steps and draft an email to send to the prospect.

  Company: {{{company}}}
  Participants: {{{participants}}}
  Key Points: {{{keyPoints}}}
  Transcript: {{{transcript}}}

  Follow-up Actions:
  - [List of suggested follow-up actions]

  Email Draft:
  [Draft email content]`, // Removed Handlebars logic
});

const suggestActionableFollowUpFlow = ai.defineFlow(
  {
    name: 'suggestActionableFollowUpFlow',
    inputSchema: SuggestActionableFollowUpInputSchema,
    outputSchema: SuggestActionableFollowUpOutputSchema,
  },
  async input => {
    const {output} = await suggestActionableFollowUpPrompt(input);
    return output!;
  }
);
