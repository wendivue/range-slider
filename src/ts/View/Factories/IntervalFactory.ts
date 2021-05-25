import Template from 'UI/Template/Template';
import IntervalHandle from 'UI/Handle/IntervalHandle';
import IntervalLabel from 'UI/Label/IntervalLabel';
import Range from 'UI/Range/Range';
import IntervalInput from 'UI/Input/IntervalInput';
import Bar from 'UI/Bar/Bar';
import Scale from 'UI/Scale/Scale';
import { typeData } from 'Helpers/interface';

class IntervalFactory {
  public createTemplate(
    anchor: HTMLElement,
    isVertical: boolean,
    type: typeData
  ): Template {
    return new Template(anchor, isVertical, type);
  }

  public createBar(
    anchor: HTMLElement,
    isVertical: boolean,
    type: typeData
  ): Bar {
    return new Bar(anchor, isVertical, type);
  }

  public createHandle(
    anchor: HTMLElement,
    isVertical: boolean
  ): IntervalHandle {
    return new IntervalHandle(anchor, isVertical);
  }

  public createLabel(anchor: HTMLElement, isVertical: boolean): IntervalLabel {
    return new IntervalLabel(anchor, isVertical);
  }

  public createRange(anchor: HTMLElement, min: number, max: number): Range {
    return new Range(anchor, min, max);
  }

  public createInput(anchor: HTMLElement): IntervalInput {
    return new IntervalInput(anchor);
  }

  public createScale(
    anchor: HTMLElement,
    isVertical: boolean,
    type: typeData
  ): Scale {
    return new Scale(anchor, isVertical, type);
  }
}

export default IntervalFactory;
