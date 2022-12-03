import React from "react";
import Skeleton from "react-loading-skeleton";

interface Props {}
const LoadingRecordings: React.FC<Props> = () => {
    const list = [1,2,4,3,4,6]
  return (
    <>
    
        {
            list.map(list => (
                <div key={list} >

                    <Skeleton height={"200px"} />
                </div>
            ))
            }
      
    </>
  );
};

export default LoadingRecordings;
