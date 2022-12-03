import React from "react";
import { useParams } from "react-router-dom";

interface CallDetailProps {}
const CallDetail: React.FC<CallDetailProps> = () => {
  const { id } = useParams<{ id: any }>();
  return (
    <>
      <h3>Call id: {id} </h3>
    </>
  );
};

export default CallDetail;
