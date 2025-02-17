import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { ERROR_MESSAGES } from '@/constants/errorMessage';
import { createFeedbackMutation } from '@/feedback/api';

interface IFeedbackFromProps {
  onClose: () => void;
  onSuccess: () => void;
}

interface IFeedbackFormData {
  feedbacks: {
    text: string;
  }[];
}

interface IFeedbackField {
  id: string;
  text: string;
}

const AddFeedbackForm: React.FC<IFeedbackFromProps> = ({ onClose, onSuccess }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<IFeedbackFormData>({
    defaultValues: { feedbacks: [{ text: '' }] },
  });

  const {
    fields,
    append,
    remove,
  }: {
    fields: IFeedbackField[];
    append: (value: { text: string }) => void;
    remove: (index: number) => void;
  } = useFieldArray({
    control: form.control,
    name: 'feedbacks',
  });

  const onSubmit = async (data: IFeedbackFormData): Promise<void> => {
    try {
      const validFeedbacks: { text: string }[] = data.feedbacks.filter((f: { text: string }) =>
        f.text.trim()
      );
      if (validFeedbacks.length === 0) {
        setErrorMessage(ERROR_MESSAGES.EMPTY_FEEDBACK);
        return;
      }
      setErrorMessage(null);
      await Promise.all(
        validFeedbacks.map((f: { text: string }) => createFeedbackMutation(f.text))
      );
      form.reset();
      onClose();
      onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="flex justify-between mb-6">
          <h2 className="font-bold text-xl text-gray-800">Add Feedbacks</h2>
          <button className=" text-gray-500" onClick={onClose}>
            Close
          </button>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="overflow-y-auto space-y-4 max-h-[60vh]">
            {fields.map((field: IFeedbackField, index: number) => (
              <div key={field.id}>
                <div className="flex justify-between">
                  <label className="text-gray-500">Feedback {index + 1}</label>
                  {fields.length > 1 && (
                    <button className="btn-outline-sm" onClick={() => remove(index)} type="button">
                      Remove
                    </button>
                  )}
                </div>

                <textarea
                  {...form.register(`feedbacks.${index}.text`)}
                  placeholder="Enter your feedback"
                  className="w-full textarea-base"
                  rows={3}
                />
              </div>
            ))}
          </div>
          <button type="button" className="btn-dashed" onClick={() => append({ text: '' })}>
            + Add More Feedback
          </button>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <button
            type="submit"
            className="btn-primary w-full mt-6"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFeedbackForm;
