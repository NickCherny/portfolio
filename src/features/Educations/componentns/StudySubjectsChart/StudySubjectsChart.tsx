"use client";

import { FC, useMemo } from "react";
import { Bubble } from "react-chartjs-2";
import { convertHEXToRGB } from "~/utils/ui/color.utils";
import { InstitutionPalette, StudySubjectsChartProps } from "./types";

const INSTITUTIONS_PALETTE: Record<string, InstitutionPalette> = {
  "Institute of Modern Knowledge": {
    backgroundColor: "#0040AD",
  },
  "Belarusian State University of Informatics and Radio-electronics": {
    backgroundColor: "#1B2654",
  },
};

export const StudySubjectsChart: FC<StudySubjectsChartProps> = ({ items }) => {
  const chartData = useMemo(() => {
    const labels = items.data.reduce((acc, education) => {
      return [
        ...acc,
        ...education.attributes.subject.map((subject) => subject.label),
      ];
    }, [] as string[]);

    const datasets = {
      label: "",
      data: items.data.reduce((acc, education) => {
        return [
          ...acc,
          ...education.attributes.subject.map((subject) => {
            return {
              x: subject.houres,
              y: subject.score,
              r: subject.score,
            };
          }),
        ];
      }, [] as Record<string, number>[]),
      backgroundColor: items.data.reduce((acc, education) => {
        const backgroundColor =
          INSTITUTIONS_PALETTE?.[education.attributes.name]?.backgroundColor ??
          "#000000";

        return [
          ...acc,
          ...education.attributes.subject.map((subject) => {
            return `rgba(${convertHEXToRGB(backgroundColor).join(",")}, ${
              subject.score / 10
            })`;
          }),
        ];
      }, [] as string[]),
    };

    return {
      labels,
      datasets: [datasets],
    };
  }, [items]);

  return (
    <Bubble
      data={chartData}
      options={{
        indexAxis: "y",
        layout: {
          padding: 20,
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Houres",
            },
          },
          y: {
            title: {
              display: true,
              text: "Score",
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Study subjects",
          },
        },
      }}
    />
  );
};
