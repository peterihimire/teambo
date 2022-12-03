import React from "react";
import Skeleton from "react-loading-skeleton";

interface Props {}
const LoadingVideoDescription: React.FC<Props> = () => {
  return (
    <>
    <div className="video-description__loading">

      <Skeleton height={"400px"} />
      <div className="video-description__loading-body">
    <div>
      <Skeleton height={"20px"}  width={"100px"}/>
      <Skeleton height={"100px"}  width={"400px"}/>
    </div>
    <div>
      <Skeleton height={"20px"}  width={"100px"}/>
      <Skeleton height={"20px"}  width={"400px"}/>
  </div>
    <div>
      <Skeleton height={"20px"}  width={"100px"}/>
      <Skeleton height={"100px"}  width={"400px"}/>
    </div>
  
      </div>
    </div>
      
    </>
  );
};

export default LoadingVideoDescription;
