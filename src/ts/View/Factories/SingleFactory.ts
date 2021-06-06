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

export interface ISingleFactory {
  createTemplate(anchor: HTMLElement, isVertical: boolean, type: TypeSlider): Template;
  createBar(anchor: HTMLElement, isVertical: boolean, type: TypeSlider): IBar;
  createHandle(anchor: HTMLElement, isVertical: boolean): ISingleHandle;
  createLabel(anchor: HTMLElement, isVertical: boolean): ISingleLabel;
  createRange(anchor: HTMLElement, min: number, max: number): IRange;
  createInput(anchor: HTMLElement): ISingleInput;
  createScale(anchor: HTMLElement, isVertical: boolean, type: TypeSlider): IScale;
}

class SingleFactory implements ISingleFactory {
  public createTemplate(anchor: HTMLElement, isVertical: boolean, type: TypeSlider): Template {
    return new Template(anchor, isVertical, type);
  }

  public createBar(anchor: HTMLElement, isVertical: boolean, type: TypeSlider): IBar {
    return new Bar(anchor, isVertical, type);
  }

  public createHandle(anchor: HTMLElement, isVertical: boolean): ISingleHandle {
    return new SingleHandle(anchor, isVertical);
  }

  public createLabel(anchor: HTMLElement, isVertical: boolean): ISingleLabel {
    return new SingleLabel(anchor, isVertical);
  }

  public createRange(anchor: HTMLElement, min: number, max: number): IRange {
    return new Range(anchor, min, max);
  }

  public createInput(anchor: HTMLElement): ISingleInput {
    return new SingleInput(anchor);
  }

  public createScale(anchor: HTMLElement, isVertical: boolean, type: TypeSlider): IScale {
    return new Scale(anchor, isVertical, type);
  }
}

export default SingleFactory;
