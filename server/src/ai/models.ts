/**
 * Model representing the schema for highlight prompt results.
 * This schema defines the expected structure of a highlight response,
 * ensuring type safety and validation using Zod.
 */

import { z } from 'zod';

export const highlightPromptResultSchema = z.object({
  highlights: z.array(
    z.object({
      summary: z.string(),
      quote: z.string(),
    }),
  ),
});

export type HighlightPromptResult = z.infer<typeof highlightPromptResultSchema>;
