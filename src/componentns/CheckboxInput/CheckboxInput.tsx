import { FC, SyntheticEvent } from "react";
import { CheckboxInputProps } from "./types";

export const CheckboxInput: FC<CheckboxInputProps> = ({
  name,
  value,
  label,
  onChange,
}) => {
  return (
    <div>
      <input
        id={name}
        type="checkbox"
        checked={value}
        onChange={(e: SyntheticEvent<HTMLInputElement>) => {
          onChange((e.nativeEvent.target as HTMLInputElement)?.checked);
        }}
        className="mr-1"
      />
      <label htmlFor={name} className="text-sm font-light">
        {label}
      </label>
    </div>
  );
};
