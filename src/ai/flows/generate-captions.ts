// Use server directive needed so this can be imported in React
'use server';

/**
 * @fileOverview Generates social media caption variations based on user inputs.
 *
 * - generateCaptions - A function that generates caption variations.
 * - GenerateCaptionsInput - The input type for the generateCaptions function.
 * - GenerateCaptionsOutput - The return type for the generateCaptions function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateCaptionsInputSchema = z.object({
  theme: z.string().describe('The theme of the social media post.'),
  targetAudience: z.string().describe('The target audience for the post.'),
  tone: z.string().describe('The desired tone of the caption (e.g., funny, professional, persuasive).'),
  platform: z.enum(['Instagram', 'X', 'LinkedIn', 'Facebook']).describe('The social media platform for the caption.'),
});
export type GenerateCaptionsInput = z.infer<typeof GenerateCaptionsInputSchema>;

const GenerateCaptionsOutputSchema = z.object({
  captions: z.array(
    z.string().describe('Generated caption variation.')
  ).describe('An array of 3-5 generated caption variations.'),
});
export type GenerateCaptionsOutput = z.infer<typeof GenerateCaptionsOutputSchema>;

export async function generateCaptions(input: GenerateCaptionsInput): Promise<GenerateCaptionsOutput> {
  return generateCaptionsFlow(input);
}

const generateCaptionsPrompt = ai.definePrompt({
  name: 'generateCaptionsPrompt',
  input: {
    schema: z.object({
      theme: z.string().describe('The theme of the social media post.'),
      targetAudience: z.string().describe('The target audience for the post.'),
      tone: z.string().describe('The desired tone of the caption (e.g., funny, professional, persuasive).'),
      platform: z.enum(['Instagram', 'X', 'LinkedIn', 'Facebook']).describe('The social media platform for the caption.'),
    }),
  },
  output: {
    schema: z.object({
      captions: z.array(
        z.string().describe('Generated caption variation.')
      ).describe('An array of 3-5 generated caption variations.'),
    }),
  },
  prompt: `You are a social media expert. Generate 3-5 caption variations for a social media post based on the following information:

Theme: {{{theme}}}
Target Audience: {{{targetAudience}}}
Tone: {{{tone}}}
Platform: {{{platform}}}

Captions:`, // Removed the word "output"
});

const generateCaptionsFlow = ai.defineFlow<
  typeof GenerateCaptionsInputSchema,
  typeof GenerateCaptionsOutputSchema
>({
  name: 'generateCaptionsFlow',
  inputSchema: GenerateCaptionsInputSchema,
  outputSchema: GenerateCaptionsOutputSchema,
}, async input => {
  const {output} = await generateCaptionsPrompt(input);
  return output!;
});

