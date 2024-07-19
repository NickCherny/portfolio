"use client";

import { FC, useMemo } from "react";
import { useBinnary } from "~/utils/hooks";
import { EducationsProps } from "./types";
import type { RowData } from "./componentns/StudySubjectsChart/Scatterplot";
import { Scatterplot } from "./componentns/StudySubjectsChart/Scatterplot";

export const Eductaions: FC<EducationsProps> = ({ items }) => {
  const { value: isSubjectsChartVisible, turnOn: showSubjectsChart } =
    useBinnary(false);

  const chartData = useMemo(() => {
    return items.data.reduce((acc, { attributes: { name, subject } }) => {
      return [
        ...acc,
        ...subject.map((s) => ({
          y: s.score,
          x: s.houres,
          z: s.score,
          group: name,
          subject: s.label,
        })),
      ];
    }, [] as RowData[]);
  }, [items]);

  return (
    <section className="p-8 w-full flex-col justify-start">
      <h1 className="text-2xl font-medium mb-6">Educations</h1>
      {items.data.map((education) => {
        return (
          <div key={`education--${education.id}`} className="mb-3">
            <h2 className="text-lg font-medium">
              {education.attributes.name}
              <p className="text-xs font-light">
                {`(${education.attributes.start_date} – ${education.attributes.end_date})`}
              </p>
            </h2>
            <h3 className="text-base font-light">
              {education.attributes.title}
            </h3>
          </div>
        );
      })}
      {!isSubjectsChartVisible && (
        <button
          className="text-sm font-light text-slate-500 hover:text-slate-950"
          type="button"
          onClick={showSubjectsChart}
        >
          Inspect study subjects
        </button>
      )}
      {isSubjectsChartVisible && (
        <Scatterplot width={800} height={600} data={chartData} />
      )}
    </section>
  );
};
