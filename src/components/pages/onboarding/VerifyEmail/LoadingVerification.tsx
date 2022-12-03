import React from "react";
import Skeleton from "react-loading-skeleton";

interface Props {}
const LoadingVerifications: React.FC<Props> = () => {
  return (
    <>
      <Skeleton height={"180px"} width={"180px"} circle={true} />
      <div className="m-t-30px">
        <div className="m-b-5px">
          <Skeleton height={"15px"} width={"400px"} />
        </div>
        <div className="m-b-5px">
          <Skeleton height={"10px"} width={"300px"} />
        </div>
        <div className="m-b-5px">
          <Skeleton height={"10px"} width={"300px"} />
        </div>
      </div>
      <div className="m-t-30px">
        <Skeleton height={"60px"} width={"170px"} />
      </div>
    </>
  );
};

export default LoadingVerifications;
