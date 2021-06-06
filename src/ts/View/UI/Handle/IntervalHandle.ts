import Constants from 'Helpers/enums';
import { IIntervalHandle } from './IIntervalHandle';

const { FROM, TO } = Constants;

class IntervalHandle implements IIntervalHandle {
  private classHandleVertical?: string;

  private classHandleToVertical?: string;

  constructor(private anchor: HTMLElement, private isVertical: boolean) {
    this.anchor = anchor;
    this.init();
  }

  public moveElement(percentage: number, elementType: Constants): void {
    const from = this.anchor.querySelector('.slider__handle_from') as HTMLElement;
    const to = this.anchor.querySelector('.slider__handle_to') as HTMLElement;

    if (this.isVertical) {
      if (elementType === FROM) from.style.top = `${percentage}%`;
      if (elementType === TO) to.style.top = `${percentage}%`;
    } else {
      if (elementType === FROM) from.style.left = `${percentage}%`;
      if (elementType === TO) to.style.left = `${percentage}%`;
    }
  }

  private init(): void {
    this.createClass(this.isVertical);
    this.createHtml(this.anchor);
  }

  private createHtml(anchor: HTMLElement): void {
    const handleTemplate =
      `<div class="slider__handle ${this.classHandleVertical} slider__handle_from"></div>` +
      `<div class="slider__handle ${this.classHandleVertical} ${this.classHandleToVertical} slider__handle_to"></div>`;
    const slider = anchor.querySelector('.slider__wrapper') as HTMLElement;

    slider.insertAdjacentHTML('beforeend', handleTemplate);
  }

  private createClass(isVertical: boolean): void {
    this.classHandleVertical = isVertical ? 'slider__handle_vertical' : '';
    this.classHandleToVertical = isVertical ? 'slider__handle_to_vertical' : '';
  }
}

export default IntervalHandle;
