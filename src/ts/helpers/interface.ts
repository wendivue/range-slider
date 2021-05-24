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
  type: string;
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

interface methodsViewFactory {
  changeBar?(from: number, to?: number): void;
  moveElement?(percentage: number, elementType?: string): void;
  changeLabelValue?(fromValue: string, toValue?: string): void;
  changeValue?(fromValue: string, toValue?: string): void;
  changeScale?(percentage: Array<number>): void;
}

type PartialConfig = Partial<Config>;

export { Config, Coords, Shift, forMouse, methodsViewFactory, PartialConfig };
