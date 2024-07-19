import { FC } from "react";
import Image from "next/image";

import { getImageUrl } from "~/utils/ui/image.utils";

import {
  TechnologyChart,
  TechnologyChartProps,
} from "./components/TechnologyChart";
import { TechnologyCardProps } from "./types";

const TechnologyCard: FC<TechnologyCardProps> = ({ data }) => {
  const logoUrl = data?.attributes?.logo?.image?.data?.attributes?.url;
  const imageUrl = logoUrl ? getImageUrl(logoUrl) : undefined;

  return (
    <aside className="bg-white px-6 py-3 rounded-md">
      {imageUrl && (
        <Image
          alt=""
          src={imageUrl}
          width={32}
          height={32}
          className="m-auto mb-3"
        />
      )}
      <div>
        <h2 className="text-sm mb-1 text-slate-700">{data.attributes.copy}</h2>
        <p className="text-slate-500 text-xs font-light">{data.attributes.info}</p>
      </div>
    </aside>
  );
};

export const Technology: FC<TechnologyChartProps> = (props) => {
  return (
    <section className="p-8 w-full">
      <div className="mb-5 flex flex-wrap">
        {props.items.data.map((itemTechnology) => {
          return (
            <div key={itemTechnology.id} className="p-1 max-w-48">
              <TechnologyCard data={itemTechnology} />
            </div>
          );
        })}
      </div>
      <TechnologyChart items={props.items} pastProjects={props.pastProjects} />
    </section>
  );
};
