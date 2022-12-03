import React from "react";
import Skeleton from "react-loading-skeleton";

import DashboardLayoutOneLeft from "./../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOneLeft";
import DashboardLayoutOneRight from "./../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOneRight";

interface Props {}
const LoadingCalls: React.FC<Props> = () => {
  return (
    <>
      <DashboardLayoutOneLeft cssClass="animate-fadeIn">
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
          <div className="flex-c text-right">
            <Skeleton height={"6px"} width={"90px"} />
            <Skeleton height={"6px"} width={"40px"} />
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
          <div className="flex-c text-right">
            <Skeleton height={"6px"} width={"90px"} />
            <Skeleton height={"6px"} width={"40px"} />
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
          <div className="flex-c text-right">
            <Skeleton height={"6px"} width={"90px"} />
            <Skeleton height={"6px"} width={"40px"} />
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
          <div className="flex-c text-right">
            <Skeleton height={"6px"} width={"90px"} />
            <Skeleton height={"6px"} width={"40px"} />
          </div>
        </div>
      </DashboardLayoutOneLeft>
      <DashboardLayoutOneRight cssClass="animate-fadeIn">
        <div className="text-center m-t-120px">
          <Skeleton height={"150px"} width={"150px"} circle={true} />
          <div className="m-t-20px">
            <Skeleton height={"10px"} width={"400px"} />
          </div>
          <div className="m-t-10px">
            <Skeleton height={"10px"} width={"300px"} />
          </div>
        </div>
      </DashboardLayoutOneRight>
    </>
  );
};

export default LoadingCalls;
