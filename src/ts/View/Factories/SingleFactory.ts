import Template from 'UI/Template/Template';
import SingleHandle from 'UI/Handle/SingleHandle';
import SingleLabel from 'UI/Label/SingleLabel';
import Range from 'UI/Range/Range';
import SingleInput from 'UI/Input/SingleInput';
import Bar from 'UI/Bar/Bar';
import Scale from 'UI/Scale/Scale';

class SingleFactory {
  public createTemplate(
    anchor: HTMLElement,
    isVertical: boolean,
    type: string
  ): Template {
    return new Template(anchor, isVertical, type);
  }

  public createBar(
    anchor: HTMLElement,
    isVertical: boolean,
    type: string
  ): Bar {
    return new Bar(anchor, isVertical, type);
  }

  public createHandle(anchor: HTMLElement, isVertical: boolean): SingleHandle {
    return new SingleHandle(anchor, isVertical);
  }

  public createLabel(anchor: HTMLElement, isVertical: boolean): SingleLabel {
    return new SingleLabel(anchor, isVertical);
  }

  public createRange(anchor: HTMLElement, min: number, max: number): Range {
    return new Range(anchor, min, max);
  }

  public createInput(anchor: HTMLElement): SingleInput {
    return new SingleInput(anchor);
  }

  public createScale(
    anchor: HTMLElement,
    min: number,
    max: number,
    isVertical: boolean
  ): Scale {
    return new Scale(anchor, min, max, isVertical);
  }
}

export default SingleFactory;
