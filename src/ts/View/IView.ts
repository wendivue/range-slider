import { forMouse, Shift, Config } from 'Helpers/interface';
import Constants from 'Helpers/enums';

type TypeEventMouse = (event: MouseEvent) => void;
type TypeEventMouseHandle = (forMouseMove: forMouse, event: MouseEvent) => void;
type TypeEventChange = (event: Event) => void;

interface IView {
  config: Config;

  bindHandleEvents(elementType: Constants, func: TypeEventMouseHandle): void;
  bindWrapperEvents(elementType: Constants, func: TypeEventMouse): void;
  bindScaleEvents(func: TypeEventMouse): void;
  bindInputEvents(elementType: Constants, func: TypeEventChange): void;
  bindRangeEvents(elementType: Constants, func: TypeEventChange): void;
  checkElementType(element: HTMLElement): Constants;
  moveElement(percentage: number, elementType?: string): void;
  changeBar(from: number, to?: number): void;
  changeLabelValue(fromValue: string, toValue?: string): void;
  changeValue(fromValue: string, toValue?: string): void;
  changeScale(
    arrayPercentage: Array<number>,
    min: number,
    max: number,
    step: number
  ): void;
  calcPercentage(left: number): number;
  getShift(event: MouseEvent, element: HTMLElement): Shift;
  getNewShift(event: MouseEvent, shift: Shift): Shift;
  getElement(elementType: Constants): HTMLInputElement;
}

export { IView, TypeEventMouse, TypeEventMouseHandle, TypeEventChange };
