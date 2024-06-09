"use client";

import { FC, useMemo } from "react";
import { Bubble } from "react-chartjs-2";
import { convertHEXToRGB } from "~/utils/ui/color.utils";
import { InstitutionPalette, StudySubjectsChartProps } from "./types";

import { Scatterplot } from "./Scatterplot";
import { group } from "console";

const INSTITUTIONS_PALETTE: Record<string, InstitutionPalette> = {
  "Institute of Modern Knowledge": {
    backgroundColor: "#0040AD",
  },
  "Belarusian State University of Informatics and Radio-electronics": {
    backgroundColor: "#1B2654",
  },
};

export const StudySubjectsChart: FC<StudySubjectsChartProps> = ({
  items: { data },
}) => {
  const chartData = useMemo(() => {
    return data.reduce((acc, { attributes: { name, subject } }) => {
      return [
        ...acc,
        ...subject.map((s) => ({
          group: name,
          y: s.score,
          x: s.houres,
        })),
      ];
    }, [] as { x: number; y: number; group: string }[]);
  }, [data]);

  console.log(chartData);

  return <Scatterplot data={chartData} width={1000} height={400} />;
};
