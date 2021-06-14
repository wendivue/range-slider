import { IShift, IConfig } from 'Helpers/interface';
import Constants from 'Helpers/enums';
import { IObservable } from '../Observable/Observable';
import { IBar } from './UI/Bar/IBar';
import { IIntervalHandle } from './UI/Handle/IIntervalHandle';
import { ISingleHandle } from './UI/Handle/ISingleHandle';
import { ISingleLabel } from './UI/Label/ISingleLabel';
import { ISingleInput } from './UI/Input/ISingleInput';
import { IIntervalInput } from './UI/Input/IIntervalInput';
import { IScale } from './UI/Scale/IScale';
import { IRange } from './UI/Range/IRange';
import { IIntervalLabel } from './UI/Label/IIntervalLabel';

interface IUI {
  handle: ISingleHandle | IIntervalHandle;
  bar: IBar;
  label: ISingleLabel | IIntervalLabel;
  input: ISingleInput | IIntervalInput;
  scale: IScale;
  range: IRange;
}

type PartialUI = Partial<IUI>;

interface IView extends IObservable {
  config: IConfig;
  UI: PartialUI;

  setConfig(option: IConfig): void;
  calcPercentage(left: number): number;
  getShift(event: MouseEvent | PointerEvent, element: HTMLElement): IShift;
  getNewShift(event: MouseEvent | PointerEvent, shift: IShift): IShift;
  updateView(data: IConfig): void;
  validateRangeType(percentage: number, type: Constants): Constants;
}

export { IView, IUI, PartialUI };
