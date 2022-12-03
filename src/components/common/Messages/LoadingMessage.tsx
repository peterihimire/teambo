import React from "react";
import Skeleton from "react-loading-skeleton";

interface Props {}
const LoadingMessages: React.FC<Props> = () => {
  return (
    <>
      <Skeleton height={"10px"} width={"60%"} />
      <div className="flex-r-jcbetween-aicenter">
        <Skeleton height={"10px"} width={"340px"} />
        <Skeleton height={"10px"} width={"10px"} circle={true} />
      </div>

      <div className="flex-r-jcbetween-aicenter m-t-40px">
        <div className="flex-r-aicenter">
          <Skeleton height={"40px"} width={"40px"} />
          <div className="m-l-10px">
            <Skeleton height={"6px"} width={"120px"} />
            <div className="m-b-2px"></div>
            <Skeleton height={"6px"} width={"35px"} />
          </div>
        </div>
        <div className="flex-r-aicenter flex-gap-5px">
          <Skeleton height={"30px"} width={"30px"} />
          <Skeleton height={"30px"} width={"30px"} />
          <Skeleton height={"30px"} width={"30px"} />
        </div>
      </div>

      <div className="flex-r-jcbetween-aicenter m-t-40px">
        <div className="flex-r-aicenter">
          <Skeleton height={"40px"} width={"40px"} />
          <div className="m-l-10px">
            <Skeleton height={"6px"} width={"120px"} />
            <div className="m-b-2px"></div>
            <Skeleton height={"6px"} width={"35px"} />
          </div>
        </div>
        <div className="flex-r-aicenter flex-gap-5px">
          <Skeleton height={"30px"} width={"30px"} />
          <Skeleton height={"30px"} width={"30px"} />
          <Skeleton height={"30px"} width={"30px"} />
        </div>
      </div>

      <div className="flex-r-jcbetween-aicenter m-t-40px">
        <div className="flex-r-aicenter">
          <Skeleton height={"40px"} width={"40px"} />
          <div className="m-l-10px">
            <Skeleton height={"6px"} width={"120px"} />
            <div className="m-b-2px"></div>
            <Skeleton height={"6px"} width={"35px"} />
          </div>
        </div>
        <div className="flex-r-aicenter flex-gap-5px">
          <Skeleton height={"30px"} width={"30px"} />
          <Skeleton height={"30px"} width={"30px"} />
          <Skeleton height={"30px"} width={"30px"} />
        </div>
      </div>
    </>
  );
};

export default LoadingMessages;
