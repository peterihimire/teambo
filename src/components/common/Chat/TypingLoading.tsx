import React from "react";

interface TypingLoadingProps {}
const TypingLoading: React.FC<TypingLoadingProps> = () => {
  return <div className="typing-loading">
      <span className="typing-loading__icon"></span>
      <span className="typing-loading__icon"></span>
      <span className="typing-loading__icon"></span>
  </div>;
};

export default TypingLoading;
