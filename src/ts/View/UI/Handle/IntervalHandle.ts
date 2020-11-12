import { FROM, TO } from '../../../helpers/constants';

class IntervalHandle {
  private classHandleVertical: string;

  private classHandleToVertical: string;

  constructor(public anchor: HTMLElement, public vertical: boolean) {
    this.anchor = anchor;
    this.createClass(vertical);
    this.init(anchor);
  }

  private init(anchor: HTMLElement): void {
    const handleTemplate =
      `<div class="slider__handle ${this.classHandleVertical} slider__handle--from"></div>` +
      `<div class="slider__handle ${this.classHandleVertical} ${this.classHandleToVertical} slider__handle--to"></div>`;
    const slider = anchor.querySelector('.slider__wrapper');

    slider.insertAdjacentHTML('beforeend', handleTemplate);
  }

  private createClass(vertical: boolean): void {
    this.classHandleVertical = vertical ? 'slider__handle--vertical' : '';
    this.classHandleToVertical = vertical ? 'slider__handle--to--vertical' : '';
  }

  public moveElement(percentage: number, elementType: string): void {
    const from: HTMLElement = this.anchor.querySelector(
      '.slider__handle--from'
    );
    const to: HTMLElement = this.anchor.querySelector('.slider__handle--to');

    if (this.vertical) {
      if (elementType === FROM) {
        from.style.top = `${percentage}%`;
      } else if (elementType === TO) {
        to.style.top = `${percentage}%`;
      }
    } else if (elementType === FROM) {
      from.style.left = `${percentage}%`;
    } else if (elementType === TO) {
      to.style.left = `${percentage}%`;
    }
  }
}

export default IntervalHandle;
