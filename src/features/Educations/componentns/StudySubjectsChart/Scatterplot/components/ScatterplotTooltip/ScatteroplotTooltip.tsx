import { forwardRef } from "react";
import { ScatterplotTooltipProps } from "./ScatteroplotTooltip.types";

export const ScatterplotTooltip = forwardRef<
  HTMLDivElement,
  ScatterplotTooltipProps
>(function rendererScatterplotTooltip(
  { title, message, isTooltipVisible, position },
  ref
) {
  return (
    <div
      ref={ref}
      className="py-0.5 px-1 absolute bg-slate-100/75 rounded-md"
      style={position}
      hidden={!isTooltipVisible}
    >
      <h6 className="text-xs text-slate-500">{title}</h6>
      <p className="text-xs">{message}</p>
    </div>
  );
});
