import { z } from 'zod';

export const highlightSchema = z.object({
  id: z.number(),
  quote: z.string(),
  summary: z.string(),
  feedbackId: z.number(),
});

export const feedbackSchema = z.object({
  id: z.number(),
  text: z.string(),
});
