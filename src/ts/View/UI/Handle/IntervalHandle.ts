import { FROM, TO } from 'Helpers/constants';

class IntervalHandle {
  private classHandleVertical: string;

  private classHandleToVertical: string;

  constructor(public anchor: HTMLElement, public isVertical: boolean) {
    this.anchor = anchor;
    this.init();
  }

  private init(): void {
    this.createClass(this.isVertical);
    this.createHtml(this.anchor);
  }

  private createHtml(anchor: HTMLElement): void {
    const handleTemplate =
      `<div class="slider__handle ${this.classHandleVertical} slider__handle_from"></div>` +
      `<div class="slider__handle ${this.classHandleVertical} ${this.classHandleToVertical} slider__handle_to"></div>`;
    const slider = anchor.querySelector('.slider__wrapper');

    slider.insertAdjacentHTML('beforeend', handleTemplate);
  }

  private createClass(isVertical: boolean): void {
    this.classHandleVertical = isVertical ? 'slider__handle_vertical' : '';
    this.classHandleToVertical = isVertical ? 'slider__handle_to_vertical' : '';
  }

  public moveElement(percentage: number, elementType: string): void {
    const from: HTMLElement = this.anchor.querySelector('.slider__handle_from');
    const to: HTMLElement = this.anchor.querySelector('.slider__handle_to');

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
