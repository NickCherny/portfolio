"use client";

import { useRef, useLayoutEffect, useMemo, useState, useEffect } from "react";
import * as d3 from "d3";
import { makeColorOpacityOn } from "~/utils/ui/color.utils";
import { useBinnary } from "~/utils/hooks";

import { ScatterplotTooltip } from "./components/ScatterplotTooltip";
import { ScatterplotProps, TooltipCopy, RowData } from "./Scatterplot.types";

export const Scatterplot = ({
  width: viewBoxWidth,
  height: viewBoxHeight,
  data,
}: ScatterplotProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const {
    value: isTooltipVisible,
    turnOff: hideTooltip,
    turnOn: showTooltip,
  } = useBinnary(false);
  const [toltipe, setToltipe] = useState({
    left: 0,
    top: 0,
  });
  const [tooltipCopy, setTooltipCopy] = useState<TooltipCopy>({
    title: "",
    message: "",
  });

  const margin = useMemo(() => {
    const maxZ = d3.max(data.map(({ z }) => z)) as number;
    const step = 2 * maxZ;

    return { top: step, right: step + 10, bottom: step + 30, left: step };
  }, [data]);

  const [width, height] = useMemo(
    () => [
      viewBoxWidth - margin.left - margin.right,
      viewBoxHeight - margin.top - margin.bottom,
    ],
    [viewBoxWidth, viewBoxHeight, margin]
  );

  useLayoutEffect(() => {
    const svg = d3.select(svgRef.current);

    svg.attr("width", width).attr("height", height);

    // Add X axis
    const x = d3
      .scalePow()
      .domain([0, (d3.max(data.map(({ x }) => x)) as number) + margin.left])
      .range([0, width - margin.right - margin.left]);

    svg
      .append("g")
      .attr(
        "transform",
        `translate(${margin.right}, ${height - margin.bottom + margin.top})`
      )
      .attr("data-testid", "x-axis")
      .attr("class", "text-xs")
      .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data.map(({ y }) => y)) as number])
      .range([height - margin.bottom, 0]);

    console.log(y);

    svg
      .append("g")
      .attr("transform", `translate(${margin.right}, ${margin.top})`)
      .attr("data-testid", "y-axis")
      .attr("class", "text-xs")
      .call(d3.axisLeft(y));

    // Color scale: give me a specie name, I return a color
    const color = d3
      .scaleOrdinal()
      .domain([
        "Institute of Modern Knowledge",
        "Belarusian State University of Informatics and Radio-electronics",
      ])
      .range(["#440154ff", "#21908dff"]);

    // Add dots
    svg
      .append("g")
      .attr("transform", `translate(${margin.right}, ${margin.bottom})`)
      .selectAll("dot")
      .data(data)
      .join("circle")
      .on("mouseover", (event, d) => {
        setTooltipCopy({
          title: d.group,
          message: d.subject,
        });

        showTooltip();
      })
      .on("mouseleave", (e) => {
        hideTooltip();
      })
      .attr("cx", (d) => x(d.x))
      .attr("cy", (d) => y(d.y))
      .transition()
      .ease(d3.easeCubic)
      .attr("r", (d) => d.z * 2)
      .attr("stroke", (d) => makeColorOpacityOn(color(d.group) as string, 0.5))
      .attr("stroke-width", 0.5)
      .style("fill", (d: RowData) =>
        makeColorOpacityOn(color(d.group) as string, 1 / d.z)
      );
  }, [data, width, height, margin, showTooltip, hideTooltip]);

  useEffect(() => {
    function updateToltipePosition(event: MouseEvent) {
      setToltipe((prev) => {
        const canvas = svgRef.current?.getBoundingClientRect()!;

        return {
          ...prev,
          left: event.clientX - canvas.x + 16,
          top: event.clientY - canvas.y + 16,
        };
      });
    }

    window.addEventListener("mousemove", updateToltipePosition);

    return () => {
      window.removeEventListener("mousemove", updateToltipePosition);
    };
  }, []);

  return (
    <div style={{ position: "relative", backgroundColor: "white" }}>
      <svg ref={svgRef} />
      <ScatterplotTooltip
        ref={tooltipRef}
        isTooltipVisible={isTooltipVisible}
        title={tooltipCopy.title}
        message={tooltipCopy.message}
        position={toltipe}
      />
    </div>
  );
};
