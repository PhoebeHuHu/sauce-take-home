export type Feedback = {
  id: number;
  text: string;
};

export type Highlight = {
  id: number;
  feedbackId: number;
  summary: string;
  quote: string;
};
