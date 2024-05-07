export const isRGB = (color: string) =>
  color.search(/^\(|\)|rgb|rgba/gi) !== -1;

export function parseColorToRGB(color: string): number[] {
  return color
    .replace(/\(|\)|rgb|rgba/gi, "")
    .split(",")
    .map((item) => item.trim())
    .map((item) => parseInt(item));
}

function componentToHex(c: number) {
  const hex = c.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

export function convertRGBToHEX(color: string): string {
  const [r, g, b] = parseColorToRGB(color);

  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

export function convertHEXToRGB(color: string): number[] {
  const value = color[0] === "#" ? color.substring(1) : color;

  if (value.length === 3) {
    return [
      parseInt(value.slice(0, 1), 16),
      parseInt(value.slice(1, 3), 16),
      parseInt(value.slice(3), 16),
    ];
  }

  return [
    parseInt(value.slice(0, 2), 16),
    parseInt(value.slice(2, 4), 16),
    parseInt(value.slice(4), 16),
  ];
}

export function makeColorOpacityOn(color: string, opacity: number): string {
  const rgb = convertHEXToRGB(color);

  return `rgba(${rgb.join(", ")}, ${opacity})`;
}

export function makeDarkerOn(color: string, percent: number): string {
  const [r, g, b] = color.match(/^#/)
    ? convertHEXToRGB(color)
    : parseColorToRGB(color);
  const value = (255 / 100) * percent;

  const nextR = Math.round(r - value);
  const nextG = Math.round(g - value);
  const nextB = Math.round(b - value);

  return `#${componentToHex(nextR > 0 ? nextR : 0)}${componentToHex(
    nextG > 0 ? nextG : 0
  )}${componentToHex(nextB > 0 ? nextB : 0)}`;
}

export function makeLighterOn(color: string, percent: number): string {
  const [r, g, b] = color.match(/^#/)
    ? convertHEXToRGB(color)
    : parseColorToRGB(color);
  const value = (255 / 100) * percent;

  const nextR = Math.round(r + value);
  const nextG = Math.round(g + value);
  const nextB = Math.round(b + value);

  return `#${componentToHex(nextR < 255 ? nextR : 255)}${componentToHex(
    nextG < 255 ? nextG : 255
  )}${componentToHex(nextB < 255 ? nextB : 255)}`;
}

export const getIsBright = (color: string): boolean => {
  const [r, b, g] = isRGB(color)
    ? parseColorToRGB(color)
    : convertHEXToRGB(color);
  return 200 <= (r * 299 + g * 587 + b * 114) / 1000;
};
