import Template from 'UI/Template/Template';
import SingleHandle from 'UI/Handle/SingleHandle';
import SingleLabel from 'UI/Label/SingleLabel';
import Range from 'UI/Range/Range';
import SingleInput from 'UI/Input/SingleInput';
import Bar from 'UI/Bar/Bar';

class SingleFactory {
  public createTemplate(anchor: HTMLElement, isVertical: boolean): Template {
    return new Template(anchor, isVertical);
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

  public createLabel(anchor: HTMLElement): SingleLabel {
    return new SingleLabel(anchor);
  }

  public createRange(anchor: HTMLElement, min: number, max: number): Range {
    return new Range(anchor, min, max);
  }

  public createInput(anchor: HTMLElement): SingleInput {
    return new SingleInput(anchor);
  }
}

export default SingleFactory;
