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
  hasInputs: boolean;
  hasRange: boolean;
  hasLabels: boolean;
  isVertical: boolean;
  hasScale: boolean;
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

interface ISliderAPI {
  update(data: IConfig): void;
  subscribe(fn: EventCallback): void;
  unsubscribe(fn: EventCallback): void;
  getConfig(): IConfig;
  destroy(): void;
  reset(): void;
}

export {
  IConfig,
  ICoords,
  IShift,
  IForMouse,
  ISliderAPI,
  TypeSlider,
  IConfigWithArrayStep,
  EventCallback,
  IConfigWithElementType,
  PartialConfig,
  PartialConfigWithArrayStep,
  PartialConfigWithElementType,
  ElementType,
};
