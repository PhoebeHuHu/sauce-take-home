export const PROMPT_CONSTANTS = {
  MODEL: 'gpt-4-turbo-preview',
  CONSOLE_SEPARATOR: '+++++++',
  ERRORS: {
    NO_MESSAGE: 'OpenAI did not return a message.',
    PARSE_FAILED: 'Failed to parse OpenAI response.',
  },
} as const;

export const PROMPT_INSTRUCTIONS = [
  'Analyze the feedback and return a list of highlights within the feedback if any exist.',
  'A highlight should be an issue or feature request from the given feedback.',
  'You are only allowed to speak in raw JSON. Do not wrap the response in markdown.',
  'The result should have the following shape:',
] as const;
