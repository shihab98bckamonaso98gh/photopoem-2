
'use server';

/**
 * @fileOverview Generates a poem inspired by an image.
 *
 * - generatePoemFromImage - A function that generates a poem from an image.
 * - GeneratePoemFromImageInput - The input type for the generatePoemFromImage function.
 * - GeneratePoemFromImageOutput - The return type for the generatePoemFromImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePoemFromImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .optional()
    .describe(
      "A photo to inspire the poem, as a data URI. Used for file uploads. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  photoUrl: z
    .string()
    .url()
    .optional()
    .describe(
      "A URL of a photo to inspire the poem. Used when user provides a URL."
    ),
  tone: z
    .string()
    .optional()
    .describe('The desired tone of the poem (e.g., romantic, melancholic, humorous).'),
  style: z
    .string()
    .optional()
    .describe('The desired style of the poem.'),
  language: z
    .string()
    .optional()
    .describe('The desired language of the poem (e.g., English, Spanish, French). Defaults to English if not specified.'),
  numberOfLines: z
    .number()
    .int()
    .positive()
    .optional()
    .describe('The desired number of lines for the poem. If not specified, the AI will decide.'),
}).superRefine((data, ctx) => {
  if (!data.photoDataUri && !data.photoUrl) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Either photoDataUri or photoUrl must be provided.",
    });
  }
});

export type GeneratePoemFromImageInput = z.infer<typeof GeneratePoemFromImageInputSchema>;

const GeneratePoemFromImageOutputSchema = z.object({
  poem: z.string().describe('The generated poem.'),
});
export type GeneratePoemFromImageOutput = z.infer<typeof GeneratePoemFromImageOutputSchema>;

export async function generatePoemFromImage(
  input: GeneratePoemFromImageInput
): Promise<GeneratePoemFromImageOutput> {
  return generatePoemFromImageFlow(input);
}

const generatePoemFromImagePrompt = ai.definePrompt({
  name: 'generatePoemFromImagePrompt',
  input: {schema: z.object({
    image: z.string().describe('A media object for the image.'),
    tone: z.string().optional(),
    style: z.string().optional(),
    language: z.string().optional(),
    numberOfLines: z.number().int().positive().optional(),
  })},
  output: {schema: GeneratePoemFromImageOutputSchema},
  prompt: `You are a poet laureate, skilled at writing poems inspired by images.

You will analyze the image and compose a poem that captures its essence and emotional tone.

Image: {{media url=image}}

{{#if tone}}
Tone: {{tone}}
{{/if}}

{{#if style}}
Style: {{style}}
{{/if}}

{{#if language}}
Please write the poem in {{language}}.
{{else}}
Please write the poem in English.
{{/if}}

{{#if numberOfLines}}
The poem should have exactly {{numberOfLines}} lines.
{{/if}}

Compose a poem inspired by the image. The poem should be creative, evocative, and capture the
feeling of the image.
`,
});

const generatePoemFromImageFlow = ai.defineFlow(
  {
    name: 'generatePoemFromImageFlow',
    inputSchema: GeneratePoemFromImageInputSchema,
    outputSchema: GeneratePoemFromImageOutputSchema,
  },
  async input => {
    let imagePart;
    if (input.photoUrl) {
      // If a URL is provided, fetch it. The AI model will handle fetching from the URL.
      imagePart = input.photoUrl;
    } else if (input.photoDataUri) {
      // If a data URI is provided, use it directly.
      imagePart = input.photoDataUri;
    } else {
      throw new Error("No image provided. Please provide either a data URI or a URL.");
    }
    
    const {output} = await generatePoemFromImagePrompt({
      image: imagePart,
      tone: input.tone,
      style: input.style,
      language: input.language,
      numberOfLines: input.numberOfLines,
    });
    return output!;
  }
);
