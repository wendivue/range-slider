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

export interface IIntervalFactory {
  createTemplate(
    anchor: HTMLElement,
    isVertical: boolean,
    type: TypeSlider
  ): Template;
  createBar(anchor: HTMLElement, isVertical: boolean, type: TypeSlider): IBar;
  createHandle(anchor: HTMLElement, isVertical: boolean): IIntervalHandle;
  createLabel(anchor: HTMLElement, isVertical: boolean): IIntervalLabel;
  createRange(anchor: HTMLElement, min: number, max: number): Range;
  createInput(anchor: HTMLElement): IIntervalInput;
  createScale(
    anchor: HTMLElement,
    isVertical: boolean,
    type: TypeSlider
  ): IScale;
}

class IntervalFactory implements IIntervalFactory {
  public createTemplate(
    anchor: HTMLElement,
    isVertical: boolean,
    type: TypeSlider
  ): Template {
    return new Template(anchor, isVertical, type);
  }

  public createBar(
    anchor: HTMLElement,
    isVertical: boolean,
    type: TypeSlider
  ): IBar {
    return new Bar(anchor, isVertical, type);
  }

  public createHandle(
    anchor: HTMLElement,
    isVertical: boolean
  ): IIntervalHandle {
    return new IntervalHandle(anchor, isVertical);
  }

  public createLabel(anchor: HTMLElement, isVertical: boolean): IIntervalLabel {
    return new IntervalLabel(anchor, isVertical);
  }

  public createRange(anchor: HTMLElement, min: number, max: number): Range {
    return new Range(anchor, min, max);
  }

  public createInput(anchor: HTMLElement): IIntervalInput {
    return new IntervalInput(anchor);
  }

  public createScale(
    anchor: HTMLElement,
    isVertical: boolean,
    type: TypeSlider
  ): IScale {
    return new Scale(anchor, isVertical, type);
  }
}

export default IntervalFactory;
