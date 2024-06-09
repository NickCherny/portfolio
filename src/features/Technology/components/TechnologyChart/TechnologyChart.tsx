"use client";

import { FC } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Bar } from "react-chartjs-2";

import { CheckboxInput } from "~/componentns/CheckboxInput";
import { useBinnary } from "~/utils/hooks/useBanaryHook";

import { TechnologyChartProps } from "./types";
import { useTechnologyLogic } from "./logic";

Chart.register(CategoryScale);

export const TechnologyChart: FC<TechnologyChartProps> = (props) => {
  const { value: isChartVisible, turnOn: showChart } = useBinnary(false);
  const {
    chartData,
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
          <Bar
            data={chartData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "I have worked with different technologies in web development.",
                },
                legend: {
                  display: false,
                },
              },
              indexAxis: "x",
            }}
          />
        </>
      )}
    </>
  );
};
