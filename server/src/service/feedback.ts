import prompt from '@/ai/prompt';
import feedbackStore from '@/store/feedback';
import { Feedback } from '@/types/model';

/**
 * Creates a feedback entry and runs analysis on it.
 * @param text The feedback to create
 */
const createFeedback = async (text: string): Promise<Feedback> => {
  const feedback = await feedbackStore.createFeedback(text);
  try {
    const analysisResult = await prompt.runFeedbackAnalysis(feedback.text);

    for (const highlight of analysisResult.highlights) {
      await feedbackStore.createHighlight({
        feedbackId: feedback.id,
        highlightQuote: highlight.quote,
        highlightSummary: highlight.summary,
      });
    }
    return feedback;
  } catch (error) {
    console.error('Error analyzing feedback:', error);
    return feedback;
  }
};

/**
 * Gets a page of feedback entries
 * @param page The page number
 * @param perPage The number of entries per page
 */
const getFeedbackPage = async (
  page: number,
  perPage: number,
): Promise<{ values: Feedback[]; count: number }> => {
  const values: Feedback[] = await feedbackStore.getFeedbackPage(page, perPage);
  const count = feedbackStore.countFeedback();
  return { values, count };
};

export default {
  createFeedback,
  getFeedbackPage,
};
