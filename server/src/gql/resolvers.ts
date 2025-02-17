import feeedbackService from '@/service/feedback';
import feedbackStore from '@/store/feedback';
import { Feedback } from '@/types/model';

/**
 * GraphQL Resolvers for managing feedback.
 * This resolver handles queries and mutations related to feedback,
 * including retrieving feedback by ID, paginated feedback retrieval,
 * creating new feedback, and fetching highlights associated with feedback.
 */
const resolvers = {
  Query: {
    /**
     * Retrieves a single feedback entry by ID.
     */
    getFeedbackById: (parent: unknown, args: { id: number }) => {
      return feedbackStore.getFeedback(args.id);
    },

    /**
     * Retrieves a paginated list of feedback entries.
     */
    getFeedbackPage: (
      parent: unknown,
      args: { page: number; per_page: number }
    ) => {
      return feeedbackService.getFeedbackPage(args.page, args.per_page);
    },
  },
  Mutation: {
    /**
     * Creates a new feedback entry.
     */
    createFeedback: (parent: unknown, args: { text: string }) => {
      return feeedbackService.createFeedback(args.text);
    },
  },
  Feedback: {
    /**
     * Retrieves highlights associated with a specific feedback entry.
     */
    highlights: (parent: Feedback) => {
      return feedbackStore.getFeedbackHighlights(parent.id);
    },
  },
};

export default resolvers;
