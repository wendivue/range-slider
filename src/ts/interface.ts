interface Config {
  min: number;
  max: number;
  type: string;
  input: boolean;
  range: boolean;
}

interface Coords {
  top: number;
  left: number;
}

export { Config, Coords };
