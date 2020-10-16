interface Config {
  min: number;
  max: number;
  from: number;
  to: number;
  step: number;
  type: string;
  input: boolean;
  range: boolean;
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

interface forMouseMove {
  shift: number;
  element: HTMLElement;
}

export { Config, Coords, Shift, forMouseMove };
