"use client";

import { FC } from "react";
import { useBinnary } from "~/utils/hooks";
import { EducationsProps } from "./types";
import { StudySubjectsChart } from "./componentns/StudySubjectsChart";

export const Eductaions: FC<EducationsProps> = ({ items }) => {
  const { value: isSubjectsChartVisible, turnOn: showSubjectsChart } =
    useBinnary(false);

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
      {isSubjectsChartVisible && <StudySubjectsChart items={items} />}
    </section>
  );
};
