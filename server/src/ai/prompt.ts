import { v4 } from 'uuid';
import { zodToJsonSchema } from 'zod-to-json-schema';

import { PROMPT_CONSTANTS, PROMPT_INSTRUCTIONS } from '@/constants/prompt';

import openAIClient from './client';
import { HighlightPromptResult, highlightPromptResultSchema } from './models';

/**
 * Prompt Constants and Templates
 *
 * NOTE: In production environments, these prompts would typically be stored in a
 * CMS (Content Management System) or database for easier management and updates.
 * For local development without cloud infrastructure, I just storing them
 * directly in the codebase as constants.
 *
 */
const createPrompt = (feedback: string): string => {
  return [
    ...PROMPT_INSTRUCTIONS,
    JSON.stringify(zodToJsonSchema(highlightPromptResultSchema)),
    'The feedback to analyze:',
    feedback,
  ].join('\n');
};

/**
 * This function takes in a feedback string and returns the highlights of the feedback.
 *
 * This will run the feedback through an AI prompt to extract the highlights.
 * A highlight contains:
 * - The quote from the source feedback.
 * - A condensed summary of the quote.
 *
 * TODO: interface!
 *
 * @param feedback The feedback to analyze
 */
const runFeedbackAnalysis = async (feedback: string): Promise<HighlightPromptResult> => {
  const promptId = v4();

  // Send OpenAI completion request and return the highlights
  const prompt = createPrompt(feedback);

  console.log();
  console.log(`+++++++ FEEDBACK ANALYSIS START ID (${promptId}) +++++++`);
  console.log(prompt);
  console.log(`+++++++ FEEDBACK ANALYSIS END ID (${promptId}) +++++++`);
  console.log();

  const response = await openAIClient.chat.completions.create({
    // better to keep the model info in .env, so we dont need to do a CI/CD when change model
    model: PROMPT_CONSTANTS.MODEL,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });
  if (!response.choices[0].message.content) {
    throw new Error(PROMPT_CONSTANTS.ERRORS.NO_MESSAGE);
  }

  const parsed = highlightPromptResultSchema.safeParse(
    JSON.parse(response.choices[0].message.content),
  );
  if (!parsed.success) {
    throw new Error(PROMPT_CONSTANTS.ERRORS.PARSE_FAILED);
  }

  console.log();
  console.log(`+++++++ ANALYSIS RESULT START ID (${promptId}) +++++++`);
  console.log(parsed.data);
  console.log(`+++++++ ANALYSIS RESULT END ID (${promptId}) +++++++`);
  console.log();

  return parsed.data;
};

export default {
  runFeedbackAnalysis,
};
