"use client";

import { FC } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Bar } from "react-chartjs-2";

import { CheckboxInput } from "~/componentns/CheckboxInput";

import { TechnologyProps } from "./types";
import { useTechnologyLogic } from "./logic";

Chart.register(CategoryScale);

export const TechnologyChart: FC<TechnologyProps> = (props) => {
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
    <section className="p-8 w-full">
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
    </section>
  );
};
