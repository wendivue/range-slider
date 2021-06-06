import Template from 'UI/Template/Template';
import IntervalHandle from 'UI/Handle/IntervalHandle';
import IntervalLabel from 'UI/Label/IntervalLabel';
import Range from 'UI/Range/Range';
import IntervalInput from 'UI/Input/IntervalInput';
import Bar from 'UI/Bar/Bar';
import Scale from 'UI/Scale/Scale';

import { TypeSlider } from 'Helpers/interface';
import { IBar } from 'UI/Bar/IBar';
import { IIntervalHandle } from 'UI/Handle/IIntervalHandle';
import { IIntervalInput } from 'UI/Input/IIntervalInput';
import { IIntervalLabel } from 'UI/Label/IIntervalLabel';
import { IScale } from 'UI/Scale/IScale';
import { IRange } from 'UI/Range/IRange';
import { IView } from '../IView';

export interface IIntervalFactory {
  createTemplate(anchor: HTMLElement, isVertical: boolean, type: TypeSlider, view: IView): Template;
  createBar(anchor: HTMLElement, isVertical: boolean, type: TypeSlider): IBar;
  createHandle(anchor: HTMLElement, isVertical: boolean, view: IView): IIntervalHandle;
  createLabel(anchor: HTMLElement, isVertical: boolean): IIntervalLabel;
  createRange(anchor: HTMLElement, min: number, max: number, view: IView): IRange;
  createInput(anchor: HTMLElement, view: IView): IIntervalInput;
  createScale(anchor: HTMLElement, isVertical: boolean, type: TypeSlider, view: IView): IScale;
}

class IntervalFactory implements IIntervalFactory {
  public createTemplate(
    anchor: HTMLElement,
    isVertical: boolean,
    type: TypeSlider,
    view: IView
  ): Template {
    return new Template(anchor, isVertical, type, view);
  }

  public createBar(anchor: HTMLElement, isVertical: boolean, type: TypeSlider): IBar {
    return new Bar(anchor, isVertical, type);
  }

  public createHandle(anchor: HTMLElement, isVertical: boolean, view: IView): IIntervalHandle {
    return new IntervalHandle(anchor, isVertical, view);
  }

  public createLabel(anchor: HTMLElement, isVertical: boolean): IIntervalLabel {
    return new IntervalLabel(anchor, isVertical);
  }

  public createRange(anchor: HTMLElement, min: number, max: number, view: IView): IRange {
    return new Range(anchor, min, max, view);
  }

  public createInput(anchor: HTMLElement, view: IView): IIntervalInput {
    return new IntervalInput(anchor, view);
  }

  public createScale(
    anchor: HTMLElement,
    isVertical: boolean,
    type: TypeSlider,
    view: IView
  ): IScale {
    return new Scale(anchor, isVertical, type, view);
  }
}

export default IntervalFactory;
