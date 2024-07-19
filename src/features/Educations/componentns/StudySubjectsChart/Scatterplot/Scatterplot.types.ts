export type RowData = {
  x: number;
  y: number;
  z: number;
  group: string;
  subject: string;
};

export type ScatterplotProps = {
  width: number;
  height: number;
  data: RowData[];
};

export type TooltipCopy = {
  title: string;
  message: string;
};
