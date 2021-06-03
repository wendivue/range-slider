type TypeSlider = 'single' | 'double';

interface IConfig {
  min: number;
  max: number;
  single: number;
  from: number;
  to: number;
  step: number;
  percentFrom: number;
  percentTo: number;
  percentSingle: number;
  type: TypeSlider;
  isInput: boolean;
  isRange: boolean;
  isLabel: boolean;
  isVertical: boolean;
  isScale: boolean;
}

interface ICoords {
  top: number;
  left: number;
}

interface IShift {
  x: number;
  y: number;
}

interface IForMouse {
  shift: IShift;
  element: HTMLElement;
}

type PartialConfig = Partial<IConfig>;

export { IConfig, ICoords, IShift, IForMouse, PartialConfig, TypeSlider };
