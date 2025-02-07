/**
 * OpenAI Client Configuration Module
 *
 * This module initializes and exports a configured OpenAI client instance for use
 * throughout the application. It uses environment variables for secure configuration
 * and follows the singleton pattern to maintain a single client instance.
 *
 * @module openai-client
 * @requires openai
 */

import { OpenAI } from 'openai';

/**
 * Environment variable validation
 * Ensure the API key is available before client initialization
 */
if (!process.env.OPENAI_SECRET) {
  throw new Error('OPENAI_SECRET environment variable is not set');
}

/**
 * OpenAI client instance configuration
 * Creates a new OpenAI client with the provided API key from environment variables
 *
 * Configuration options:
 * - apiKey: Authentication key for OpenAI API access
 * - (optional) organization: For enterprise customers with multiple organizations
 * - (optional) timeout: Request timeout in milliseconds
 *
 * @const {OpenAI} openAIClient
 */
const openAIClient = new OpenAI({
  apiKey: process.env.OPENAI_SECRET,
});

export default openAIClient;
