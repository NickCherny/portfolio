"use client";

import { FC } from "react";
import cn from "classnames";

import { CheckboxInput } from "~/componentns/CheckboxInput";
import { useBinnary } from "~/utils/hooks/useBanaryHook";

import { TechnologyChartProps } from "./types";
import { useTechnologyLogic } from "./logic";

export const TechnologyChart: FC<TechnologyChartProps> = (props) => {
  const { value: isChartVisible, turnOn: showChart } = useBinnary(false);
  const {
    targetElementRef,
    isFrontendVisible,
    toggleFrontendVisiability,
    isBackendVisible,
    toggleBackendVisiability,
    isMobileVisible,
    toggleMobileVisibility,
  } = useTechnologyLogic(props);

  return (
    <>
      {!isChartVisible ? (
        <button
          className="text-sm font-light text-slate-500 hover:text-slate-950"
          type="button"
          onClick={showChart}
        >
          Inspect technology
        </button>
      ) : (
        <>
          <div className="flex flex-row justify-between w-1/4 mb-3">
            <CheckboxInput
              name="fr"
              label="Frontend"
              value={isFrontendVisible}
              onChange={toggleFrontendVisiability}
            />
            <CheckboxInput
              name="be"
              label="Backend"
              value={isBackendVisible}
              onChange={toggleBackendVisiability}
            />
            <CheckboxInput
              name="mobile"
              label="Mobile stack"
              value={isMobileVisible}
              onChange={toggleMobileVisibility}
            />
          </div>
        </>
      )}
      <div className={cn({
        hidden: !isChartVisible,
        "h-0": !isChartVisible,
        "h-fit": isChartVisible,
      })} ref={targetElementRef} />
    </>
  );
};
