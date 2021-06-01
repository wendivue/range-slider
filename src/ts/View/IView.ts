import { Shift, Config } from 'Helpers/interface';
import Constants from 'Helpers/enums';
import { IObservable } from '../Observable/Observable';

interface IUI {
  handle: { moveElement(percentage: number, elementType?: string): void };
  bar: { changeBar(from: number, to?: number): void };
  label: { changeLabelValue(fromValue: string, toValue?: string): void };
  input: { changeValue(fromValue: string, toValue?: string): void };
  scale: {
    changeScale(
      percentage: Array<number>,
      min: number,
      max: number,
      step: number
    ): void;
  };
  range: { changeValue(min: string, max: string): void };
}

type PartialUI = Partial<IUI>;

interface IView extends IObservable {
  config: Config;
  UI: PartialUI;

  setConfig(option: Config): void;
  checkElementType(element: HTMLElement): Constants;
  calcPercentage(left: number): number;
  getShift(event: MouseEvent, element: HTMLElement): Shift;
  getNewShift(event: MouseEvent, shift: Shift): Shift;
  getElement(elementType: Constants): HTMLInputElement;
}

export { IView, IUI, PartialUI };
