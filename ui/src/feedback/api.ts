import { gql, request } from 'graphql-request';

import { IFeedback } from '@/interface/feedback';

const feedbacksDocument = gql`
  query feedbacks($page: Int!, $per_page: Int!) {
    feedbacks(page: $page, per_page: $per_page) {
      values {
        id
        text
        highlights {
          id
          quote
          summary
        }
      }
      count
    }
  }
`;

type FeedbacksData = { feedbacks: { values: IFeedback[]; count: number } };
export const feedbacksQuery = (page: number, per_page: number): Promise<FeedbacksData> =>
  // Here should be a BASE_URL
  request('http://localhost:4000/graphql', feedbacksDocument, {
    page,
    per_page,
  });

const createFeedbackDocument = gql`
  mutation createFeedback($text: String!) {
    createFeedback(text: $text) {
      id
      text
      highlights {
        id
        quote
        summary
      }
    }
  }
`;

export const createFeedbackMutation = (text: string): Promise<{ createFeedback: IFeedback }> =>
  request('http://localhost:4000/graphql', createFeedbackDocument, { text });
