import Template from '../UI/Template/Template';
import IntervalHandle from '../UI/Handle/IntervalHandle';
import IntervalLabel from '../UI/Label/IntervalLabel';
import Range from '../UI/Range/Range';
import IntervalInput from '../UI/Input/IntervalInput';
import Bar from '../UI/Bar/Bar';

class IntervalFactory {
  public createTemplate(anchor: HTMLElement, vertical: boolean): Template {
    return new Template(anchor, vertical);
  }

  public createBar(anchor: HTMLElement, vertical: boolean, type: string): Bar {
    return new Bar(anchor, vertical, type);
  }

  public createHandle(anchor: HTMLElement, vertical: boolean): IntervalHandle {
    return new IntervalHandle(anchor, vertical);
  }

  public createLabel(anchor: HTMLElement): IntervalLabel {
    return new IntervalLabel(anchor);
  }

  public createRange(anchor: HTMLElement, min: number, max: number): Range {
    return new Range(anchor, min, max);
  }

  public createInput(anchor: HTMLElement): IntervalInput {
    return new IntervalInput(anchor);
  }
}

export default IntervalFactory;
