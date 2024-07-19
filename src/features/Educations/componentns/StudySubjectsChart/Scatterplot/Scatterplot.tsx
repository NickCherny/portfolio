"use client";

import { useRef, useLayoutEffect } from "react";
import * as d3 from "d3";
import * as Plot from "@observablehq/plot";

import { useBinnary } from "~/utils/hooks";

import { ScatterplotProps } from "./Scatterplot.types";

export const Scatterplot = ({
  data,
}: ScatterplotProps) => {
  const targetElementRef = useRef<HTMLDivElement>(null);

  console.log(data);

  useLayoutEffect(() => {
    const plot = Plot.plot({
      grid: true,
      width: document.body.clientWidth,
      x: {
        label: "Houres of Study",
        domain: [0, d3.max(data, (d) => d.x) ?? 0],
      },
      y: {
        label: "Score",
        domain: [0.1, d3.max(data, (d) => d.y) ?? 0],
      },
      marks: [
        Plot.dot(data, {
          x: 'x',
          y: 'y',
          r: 'z',
          fill: 'group',
          fillOpacity: 0.6,
          stroke: 'group',
        }),
        Plot.tip(data, Plot.pointer({
          x: "x",
          y: "y",
          title: (d) => [d.group, d.subject].join("\n\n"),
        }))
      ],
    });
    targetElementRef.current?.appendChild(plot);

    return () => plot.remove();
  }, [data]);

  return (
    <div style={{ position: "relative" }}>
      <div ref={targetElementRef} />
    </div>
  );
};
