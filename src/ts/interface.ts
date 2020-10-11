interface Config {
  min: number;
  max: number;
  from: number;
  to: number;
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

export { Config, Coords, Shift };
