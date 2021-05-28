type typeData = 'single' | 'double';

interface Config {
  min: number;
  max: number;
  single: number;
  from: number;
  to: number;
  step: number;
  percentFrom: number;
  percentTo: number;
  percentSingle: number;
  type: typeData;
  isInput: boolean;
  isRange: boolean;
  isLabel: boolean;
  isVertical: boolean;
  isScale: boolean;
}

interface Coords {
  top: number;
  left: number;
}

interface Shift {
  x: number;
  y: number;
}

interface forMouse {
  shift: Shift;
  element: HTMLElement;
}

type PartialConfig = Partial<Config>;

export { Config, Coords, Shift, forMouse, PartialConfig, typeData };
