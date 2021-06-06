import { IShift, IConfig } from 'Helpers/interface';
import Constants from 'Helpers/enums';
import { IObservable } from '../Observable/Observable';

interface IUI {
  handle: { moveElement(percentage: number, elementType?: string): void };
  bar: { changeBar(from: number, to?: number): void };
  label: { changeLabelValue(fromValue: string, toValue?: string): void };
  input: { changeValue(fromValue: string, toValue?: string): void };
  scale: {
    changeScale(percentage: Array<number>, min: number, max: number, step: number): void;
  };
  range: { changeValue(min: string, max: string): void };
}

type PartialUI = Partial<IUI>;

interface IView extends IObservable {
  config: IConfig;
  UI: PartialUI;

  setConfig(option: IConfig): void;
  calcPercentage(left: number): number;
  getShift(event: MouseEvent | TouchEvent, element: HTMLElement): IShift;
  getNewShift(event: MouseEvent | TouchEvent, shift: IShift): IShift;
  updateView(data: IConfig): void;
  checkRangeType(percentage: number, type: Constants): Constants;
}

export { IView, IUI, PartialUI };
