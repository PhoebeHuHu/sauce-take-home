import { gql, request } from 'graphql-request';

import { IFeedback, IFeedbackPageData } from '@/interface/feedback';

const GET_FEEDBACK_PAGE = gql`
  query getFeedbackPage($page: Int!, $per_page: Int!) {
    getFeedbackPage(page: $page, per_page: $per_page) {
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

export const getFeedbackPageQuery = (
  page: number,
  per_page: number
): Promise<IFeedbackPageData> =>
  request('http://localhost:4000/graphql', GET_FEEDBACK_PAGE, {
    page,
    per_page,
  });

const CREATE_FEEDBACK = gql`
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

export const createFeedbackMutation = (
  text: string
): Promise<{ createFeedback: IFeedback }> =>
  request('http://localhost:4000/graphql', CREATE_FEEDBACK, { text });
