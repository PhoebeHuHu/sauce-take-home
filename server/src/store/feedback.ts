import { z } from 'zod';

import db from '@/store/db';
import { Feedback, Highlight } from '@/types/model';
import { feedbackSchema, highlightSchema } from '@/valicators/zodSchema';

type CreateHighlightArgs = {
  feedbackId: number | bigint;
  highlightSummary: string;
  highlightQuote: string;
};

/**
 * Gets a feedback entry by its id
 * @param id The id of the feedback
 */
const getFeedback = async (id: number): Promise<Feedback | undefined> => {
  const result = db.prepare(`SELECT id, text FROM Feedback WHERE id = ?`).get(id) as
    | Feedback
    | undefined;

  return result;
};

/**
 * Gets a page of feedback entries, filter the wrong structure data
 * @param page The page number
 * @param perPage The number of entries per page
 */

const getFeedbackPage = async (page: number, perPage: number): Promise<Feedback[]> => {
  const result = db
    .prepare(
      `SELECT *
                     FROM Feedback
                     ORDER BY id DESC
                     LIMIT ? OFFSET ?`,
    )
    .all(perPage, (page - 1) * perPage);
  return z.array(feedbackSchema).parse(result);
};

/**
 * Gets the highlights of a feedback entry
 * @param feedbackId The id of the feedback
 */
const getFeedbackHighlights = async (feedbackId: number): Promise<Highlight[]> => {
  const results = db
    .prepare(
      `SELECT *
                     FROM Highlight
                     WHERE feedbackId = ?`,
    )
    .all(feedbackId);
  return z.array(highlightSchema).parse(results);
};

/**
 * Counts the number of feedback entries
 * @returns The number of feedback entries
 */

const countFeedback = (): number => {
  const stmt = db.prepare(`SELECT COUNT(*) as count
                          FROM Feedback`);

  const result = stmt.get() as { count: number };
  return result.count;
};

/**
 * Creates a new feedback entry
 * @param text The text of the feedback
 */
const createFeedback = async (text: string): Promise<Feedback> => {
  const result = db
    .prepare(
      `INSERT INTO Feedback (text)
                             VALUES (?)`,
    )
    .run(text);
  return { id: Number(result.lastInsertRowid), text };
};

/**
 * Creates a new highlight entry
 * @param args The arguments to create a highlight
 */
const createHighlight = async (args: CreateHighlightArgs): Promise<Highlight> => {
  const result = db
    .prepare(
      `INSERT INTO Highlight (quote, summary, feedbackId)
                             VALUES (?, ?, ?)`,
    )
    .run(args.highlightQuote, args.highlightSummary, args.feedbackId);

  const highlight: Highlight = {
    id: Number(result.lastInsertRowid),
    feedbackId: Number(args.feedbackId),
    summary: args.highlightSummary,
    quote: args.highlightQuote,
  };
  return highlight;
};

export default {
  getFeedback,
  getFeedbackPage,
  createFeedback,
  getFeedbackHighlights,
  countFeedback,
  createHighlight,
};
