"use client";

import { useMemo } from "react";
import * as d3 from "d3";

import { AxisLeft } from "./components/AxisLeft";
import { AxisBottom } from "./components/AxisBottom";

type ScatterplotProps = {
  width: number;
  height: number;
  data: { x: number; y: number; group: string }[];
};

const MARGIN = { top: 60, right: 60, bottom: 60, left: 60 };

export const Scatterplot = ({ width, height, data }: ScatterplotProps) => {
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const scaleX = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.x) as number])
      .range([0, width]);
  }, [data, width]);
  
  const scaleY = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.y) as number])
      .range([0, height]);
  }, [data, height]);

  const allGroups = data.map((d) => String(d.group));
  const colorScale = d3
    .scaleOrdinal<string>()
    .domain(allGroups)
    .range(["#6689c6", "#9a6fb0", "#a53253"]);

  const allShapes = data.map((d, i) => {
    return (
      <circle
        key={i}
        r={8}
        cx={scaleX(d.x)}
        cy={scaleY(d.y)}
        stroke={colorScale(d.group)}
        fill={colorScale(d.group)}
        fillOpacity={0.7}
      />
    );
  });


  return (
    <div style={{ position: "relative" }}>
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          {/* Y axis */}
          <AxisLeft yScale={scaleY} pixelsPerTick={40} width={boundsWidth} />

          {/* X axis, use an additional translation to appear at the bottom */}
          <g transform={`translate(0, ${boundsHeight})`}>
            
          </g>

          {/* Circles */}
          {allShapes}
        </g>
      </svg>

      {/* Tooltip */}
      <div
        style={{
          width: boundsWidth,
          height: boundsHeight,
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          marginLeft: MARGIN.left,
          marginTop: MARGIN.top,
        }}
      >
        {/* <Tooltip interactionData={hovered} /> */}
      </div>
    </div>
  );
};
