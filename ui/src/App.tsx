import React from 'react';

import FeedbackList from '@/feedback/FeedbackList';

const App: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 px-48 pt-12">
      <FeedbackList />
    </div>
  );
};

export default App;
