export interface IHighlight {
  id: number;
  quote: string;
  summary: string;
}

export interface IFeedback {
  id: number;
  text: string;
  highlights?: IHighlight[];
}

export interface IFeedbackPageData {
  getFeedbackPage: {
    values: IFeedback[];
    count: number;
  };
}
