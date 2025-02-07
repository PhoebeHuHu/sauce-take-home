import { useCallback, useEffect, useState } from 'react';

import { feedbacksQuery } from '@/feedback/api.ts';
import type { IFeedback } from '@/interface/feedback.js';

import AddFeedbackForm from './components/AddFeedbackForm.tsx';
import FeedbackCard from './components/FeedbackCard.tsx';

export default function FeedbackList(): JSX.Element {
  const [page, setPage] = useState<number>(1);
  const [feedbacks, setFeedbacks] = useState<IFeedback[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isFeedbackFormOpen, setIsFeedbackFormOpen] = useState<boolean>(false);
  const PER_PAGE = 5;

  const fetchFeedbacks = useCallback(() => {
    setLoading(true);
    feedbacksQuery(page, PER_PAGE)
      .then((result: { feedbacks: { values: IFeedback[]; count: number } }) => {
        setFeedbacks(result.feedbacks.values);
        setTotalCount(result.feedbacks.count);
      })
      .catch((error: Error) => {
        console.error('Error:', error);
      })
      .finally(() => setLoading(false));
  }, [page]);

  useEffect(() => {
    fetchFeedbacks();
  }, [page, fetchFeedbacks]);

  const totalPages = Math.ceil(totalCount / PER_PAGE);

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Feedback</h1>
        <p>Total Feedbacks: {totalCount}</p>
        <button onClick={() => setIsFeedbackFormOpen(true)} className="btn-primary">
          Add Feedback
        </button>
      </div>
      {isFeedbackFormOpen && (
        <AddFeedbackForm
          onClose={() => setIsFeedbackFormOpen(false)}
          onSuccess={() => fetchFeedbacks()}
        />
      )}
      {loading ? (
        <p>Loading...</p>
      ) : feedbacks.length === 0 ? (
        <p>Please add feedback</p>
      ) : (
        feedbacks.map((feedback: IFeedback) => (
          <FeedbackCard key={feedback.id} feedback={feedback} />
        ))
      )}

      {totalPages > 1 && (
        <div className="flex justify-between">
          <p>
            Page: {page}/{totalPages}
          </p>
          <div className="space-x-4">
            <button
              className="btn-outline"
              onClick={() => setPage((p: number) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </button>

            <button
              className="btn-outline"
              onClick={() => setPage((p: number) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
