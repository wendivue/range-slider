import Template from 'UI/Template/Template';
import SingleHandle from 'UI/Handle/SingleHandle';
import SingleLabel from 'UI/Label/SingleLabel';
import Range from 'UI/Range/Range';
import SingleInput from 'UI/Input/SingleInput';
import Bar from 'UI/Bar/Bar';
import Scale from 'UI/Scale/Scale';

import { TypeSlider } from 'Helpers/interface';
import { IBar } from 'UI/Bar/IBar';
import { ISingleHandle } from 'UI/Handle/ISingleHandle';
import { ISingleInput } from 'UI/Input/ISingleInput';
import { ISingleLabel } from 'UI/Label/ISingleLabel';
import { IScale } from 'UI/Scale/IScale';
import { IRange } from 'UI/Range/IRange';
import { IView } from '../IView';

export interface ISingleFactory {
  createTemplate(anchor: HTMLElement, isVertical: boolean, type: TypeSlider, view: IView): Template;
  createBar(anchor: HTMLElement, isVertical: boolean, type: TypeSlider): IBar;
  createHandle(anchor: HTMLElement, isVertical: boolean, view: IView): ISingleHandle;
  createLabel(anchor: HTMLElement, isVertical: boolean): ISingleLabel;
  createRange(anchor: HTMLElement, min: number, max: number, view: IView): IRange;
  createInput(anchor: HTMLElement, view: IView): ISingleInput;
  createScale(anchor: HTMLElement, isVertical: boolean, type: TypeSlider, view: IView): IScale;
}

class SingleFactory implements ISingleFactory {
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

  public createHandle(anchor: HTMLElement, isVertical: boolean, view: IView): ISingleHandle {
    return new SingleHandle(anchor, isVertical, view);
  }

  public createLabel(anchor: HTMLElement, isVertical: boolean): ISingleLabel {
    return new SingleLabel(anchor, isVertical);
  }

  public createRange(anchor: HTMLElement, min: number, max: number, view: IView): IRange {
    return new Range(anchor, min, max, view);
  }

  public createInput(anchor: HTMLElement, view: IView): ISingleInput {
    return new SingleInput(anchor, view);
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

export default SingleFactory;
