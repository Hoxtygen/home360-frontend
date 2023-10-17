import React from "react";
import Skeleton from "react-loading-skeleton";

export default function SkeletonCard() {
  return (
    <div>
      <ul>
        {Array(10)
          .fill(0)
          .map((item, index) => (
            <li key={index}>
              <Skeleton height={180} />
              <h4 className="card-title">
                <Skeleton circle={true} height={50} width={50} /> &nbsp;
                <Skeleton height={36} width={`80%`} />
              </h4>
              <p className="card-channel">
                <Skeleton width={`60%`} />
              </p>
              <div className="card-metrics">
                <Skeleton width={`90%`} />
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
