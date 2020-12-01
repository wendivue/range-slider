interface Config {
  min: number;
  max: number;
  single: number;
  from: number;
  to: number;
  step: number;
  persentFrom: number;
  persentTo: number;
  persentSingle: number;
  type: string;
  input: boolean;
  range: boolean;
  label: boolean;
  vertical: boolean;
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

export { Config, Coords, Shift, forMouse };
