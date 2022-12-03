import React from 'react';
import Skeleton from "react-loading-skeleton";

interface Props {}
const LoadingSchedule: React.FC<Props> = () => {
    return (
        <div className="scheduled-event">
            <div className="scheduled-event__item">
                <Skeleton height={"30px"} width={"700px"} />
            </div>
            <div className="scheduled-event__item">
                <Skeleton height={"30px"} width={"700px"} />
            </div>
            <div className="scheduled-event__item">
                <Skeleton height={"30px"} width={"700px"} />
            </div>
            <div className="scheduled-event__item">
                <Skeleton height={"30px"} width={"700px"} />
            </div>
        </div>
    )
}

export default LoadingSchedule
