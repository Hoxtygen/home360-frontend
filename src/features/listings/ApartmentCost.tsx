import React from "react";

import { formatCurrency, addValues } from "lib/utils/utils";

type Cost = {
  cost: {
    annualRent: number;
    agreementFee?: number;
    agentFee?: number;
    cautionFee?: number;
  };
};

export default function ApartmentCost({ cost }: Cost) {
  return (
    <div className="">
      <h2 className="font-hanken-semibold text-20">Cost</h2>
      <div className="grid grid-cols-2">
        <div className="text-16">
          <div className="flex">
            <h3 className="w-2/4 text-secondary-light-gray">Annual Rent:</h3>
            <h4 className="w-2/4">{formatCurrency(cost?.annualRent)}</h4>
          </div>
          {cost?.agreementFee && cost?.agreementFee > 0 ? (
            <div className="flex ">
              <h3 className="w-2/4 text-secondary-light-gray">
                Agreement Fee:
              </h3>
              <h4 className="w-2/4">{formatCurrency(cost?.agreementFee)}</h4>
            </div>
          ) : null}
          {cost.agentFee && (
            <div className="flex ">
              <h3 className="w-2/4 text-secondary-light-gray">Agent Fee:</h3>
              <h4 className="w-2/4">{formatCurrency(cost?.agentFee)}</h4>
            </div>
          )}
          {cost?.cautionFee && cost?.cautionFee > 0 ? (
            <div className="flex ">
              <h3 className="w-2/4 text-secondary-light-gray">Caution Fee:</h3>
              <h4 className="w-2/4">{formatCurrency(cost?.cautionFee)}</h4>
            </div>
          ) : null}
          <div className="flex ">
            <h3 className="w-2/4 text-secondary-light-gray">Total rent:</h3>
            <h4 className="w-2/4 font-hanken-black">
              {formatCurrency(addValues(cost))}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
