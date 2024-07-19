import {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import * as d3 from "d3";
import * as Plot from "@observablehq/plot";

import { useBinnary } from "~/utils/hooks";

import { TechnologyChartProps } from "./types";
import {
  palette,
  LANGUAGE_CODES,
  CORE_STACK,
  FRONTEND_TECHNOLOGIES,
  BACKEND_TECHNOLOGIES,
  MOBILE_TECHNOLOGY,
} from "./technology.constants";

const ratio = 3;

export const useTechnologyLogic = ({ items }: TechnologyChartProps) => {
  const targetElementRef = useRef<HTMLDivElement>(null);

  const { value: isFrontendVisible, toggle: toggleFrontendVisiability } =
    useBinnary(true);
  const { value: isBackendVisible, toggle: toggleBackendVisiability } =
    useBinnary(false);

  const { value: isMobileVisible, toggle: toggleMobileVisibility } =
    useBinnary(false);

  const [whiteList, setWhiteList] = useState(LANGUAGE_CODES.concat(CORE_STACK));
  const filteredTechnology = useMemo(
    () =>
      items?.data?.filter((d) =>
        whiteList.includes(d.attributes.code!.name!)
      ) ?? [],
    [whiteList, items?.data]
  );

  const filterWhiteList = useCallback((state: boolean, items: string[]) => {
    if (state) {
      setWhiteList((whiteList) => {
        return whiteList.concat(items);
      });
    } else {
      setWhiteList((whiteList) => {
        return whiteList.filter((item) => !items.includes(item));
      });
    }
  }, []);

  useEffect(() => {
    filterWhiteList(isFrontendVisible, FRONTEND_TECHNOLOGIES);
    filterWhiteList(isBackendVisible, BACKEND_TECHNOLOGIES);
    filterWhiteList(isMobileVisible, MOBILE_TECHNOLOGY);
  }, [isFrontendVisible, isBackendVisible, isMobileVisible, filterWhiteList]);

  useLayoutEffect(() => {
    const clientWidth = document.body.clientWidth;

    const plot = Plot.plot({
      width: clientWidth,
      height: clientWidth / ratio,
      y: {
        label: "Level",
        domain: [
          0,
          d3.max(filteredTechnology, (d) => d.attributes.level) as number,
        ],
        grid: true,
      },
      marks: [
        Plot.barY(filteredTechnology, {
          x: (d) => d.attributes.copy,
          y: (d) => d.attributes.level,
          fill: (d) => palette[d.attributes.code?.name] ?? "currentColor",
          fillOpacity: 0.3,
          stroke: (d) => palette[d.attributes.code?.name] ?? "currentColor",
          strokeWidth: 1,
          sort: { x: "x" },
        }),
      ],
    });

    targetElementRef.current?.appendChild(plot);

    return () => plot.remove();
  }, [filteredTechnology]);

  return {
    whiteList,
    targetElementRef,
    isFrontendVisible,
    toggleFrontendVisiability,
    isBackendVisible,
    toggleBackendVisiability,
    isMobileVisible,
    toggleMobileVisibility,
  };
};
