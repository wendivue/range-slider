import { FROM, TO } from 'Helpers/constants';

class IntervalHandle {
  private classHandleVertical: string;

  private classHandleToVertical: string;

  constructor(public anchor: HTMLElement, public isVertical: boolean) {
    this.anchor = anchor;
    this.createClass(isVertical);
    this.init(anchor);
  }

  private init(anchor: HTMLElement): void {
    const handleTemplate =
      `<div class="slider__handle ${this.classHandleVertical} slider__handle--from"></div>` +
      `<div class="slider__handle ${this.classHandleVertical} ${this.classHandleToVertical} slider__handle--to"></div>`;
    const slider = anchor.querySelector('.slider__wrapper');

    slider.insertAdjacentHTML('beforeend', handleTemplate);
  }

  private createClass(isVertical: boolean): void {
    this.classHandleVertical = isVertical ? 'slider__handle--vertical' : '';
    this.classHandleToVertical = isVertical
      ? 'slider__handle--to--vertical'
      : '';
  }

  public moveElement(percentage: number, elementType: string): void {
    const from: HTMLElement = this.anchor.querySelector(
      '.slider__handle--from'
    );
    const to: HTMLElement = this.anchor.querySelector('.slider__handle--to');

    if (this.isVertical) {
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
