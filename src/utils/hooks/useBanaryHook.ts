// Code that should only run on the client side

import { useState, useCallback } from "react";

export const useBinnary = (initialValue: boolean = false) => {
  const [value, setValue] = useState(initialValue);

  const turnOn = useCallback(() => {
    setValue(true);
  }, []);
  const turnOff = useCallback(() => {
    setValue(false);
  }, []);
  const toggle = useCallback(() => {
    setValue((v) => !v);
  }, []);

  return {
    value,
    turnOff,
    turnOn,
    toggle,
  };
};
