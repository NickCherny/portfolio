"use client";

import Image from "next/image";
import { FC, useMemo } from "react";
import Markdown from "react-markdown";
import cn from "classnames";
import dayjs from "dayjs";

import { useBinnary } from "~/utils/hooks";
import { getImageUrl } from "~/utils/ui/image.utils";
import { ProjectDetailsProps, ListOfTechnologyProps } from "./types";

const DATE_FORMAT = "YYYY MMM";

const ListOfTechnology: FC<ListOfTechnologyProps> = ({ items }) => {
  return (
    <div className="flex flex-row">
      {items.map(({ logo }) => {
        if (!logo) return null;

        const key = `${logo.id}--${logo?.image.data?.id}`;

        return (
          <div key={key}>
            <Image
              alt={logo?.alt}
              src={getImageUrl(logo.image.data.attributes.url)}
              width={28}
              height={28}
              className="mx-2"
            />
          </div>
        );
      })}
    </div>
  );
};

export const ProjectDetails: FC<ProjectDetailsProps> = ({ data }) => {
  const { value: isDetailsVisible, turnOn: expandDetails } = useBinnary(false);
  const titleCopy = useMemo(
    () =>
      `${dayjs(data.start_date).format(DATE_FORMAT)} – ${
        dayjs(data.end_date).isValid()
          ? dayjs(data.end_date).format(DATE_FORMAT)
          : "Present"
      }`,
    [data?.start_date, data.end_date]
  );

  return (
    <section className="relative mb-4">
      <div>
        <h3 className="text-lg font-medium text-current">{titleCopy}</h3>
        <p className="text-lg font-light">{data.title}</p>
        {!isDetailsVisible && (
          <button
            className="text-sm font-light text-slate-500 hover:text-slate-950"
            type="button"
            onClick={expandDetails}
          >
            Go deeper
          </button>
        )}
      </div>
      <div
        className={cn("overflow-hidden", {
          "h-0": !isDetailsVisible,
          "h-auto": isDetailsVisible,
        })}
      >
        <Markdown className="text-sm font-light tracking-wider">
          {data.content}
        </Markdown>
        <h3 className="text-sm font-medium pt-3 mb-3">Technologies</h3>
        <div className="mb-8">
          <ListOfTechnology items={data.technology} />
        </div>
      </div>
    </section>
  );
};
