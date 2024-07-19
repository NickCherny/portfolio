export type RowData = {
  x: number;
  y: number;
  z: number;
  group: string;
  subject: string;
};

export type ScatterplotProps = {
  data: RowData[];
};

export type TooltipCopy = {
  title: string;
  message: string;
};
