import React from "react";

interface Props {}
const MeetingCardsLayout: React.FC<Props> = ({ children }) => {
  return <section className="meeting__cards">{children}</section>;
};

export default MeetingCardsLayout;
