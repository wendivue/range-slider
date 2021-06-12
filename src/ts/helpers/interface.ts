import Constants from './enums';

type TypeSlider = 'single' | 'double';
type ElementType = Constants.FROM | Constants.TO | Constants.SINGLE;

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

interface IConfigWithArrayStep extends IConfig {
  arrayStep: Array<number>;
}

interface IConfigWithElementType extends IConfig {
  elementType: ElementType;
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
type PartialConfigWithArrayStep = Partial<IConfigWithArrayStep>;
type PartialConfigWithElementType = Partial<IConfigWithElementType>;

type EventCallback = (data: PartialConfigWithArrayStep) => void;

export {
  IConfig,
  ICoords,
  IShift,
  IForMouse,
  PartialConfig,
  TypeSlider,
  IConfigWithArrayStep,
  EventCallback,
  IConfigWithElementType,
  PartialConfigWithElementType,
  ElementType,
};
