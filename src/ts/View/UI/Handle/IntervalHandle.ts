import Constants from 'Helpers/enums';
import { IView } from 'Ts/View/IView';
import EventsHandle from './EventsHandle';
import { IIntervalHandle } from './IIntervalHandle';

const { FROM, TO, DOUBLE } = Constants;

class IntervalHandle implements IIntervalHandle {
  private classHandleVertical?: string;

  private classHandleToVertical?: string;

  constructor(private anchor: HTMLElement, private isVertical: boolean, private view: IView) {
    this.init();
  }

  public moveElement(percentage: number, elementType: Constants): void {
    const from = this.anchor.querySelector<HTMLElement>('.slider__handle_from');
    const to = this.anchor.querySelector<HTMLElement>('.slider__handle_to');

    if (!from) throw new Error('from - не найдено');
    if (!to) throw new Error('to - не найдено');

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
    const events = new EventsHandle(this.anchor, this.isVertical, this.view);
    events.init(DOUBLE);
  }

  private createHtml(anchor: HTMLElement): void {
    const handleTemplate =
      `<div class="slider__handle ${this.classHandleVertical} slider__handle_from"></div>` +
      `<div class="slider__handle ${this.classHandleVertical} ${this.classHandleToVertical} slider__handle_to"></div>`;
    const slider = anchor.querySelector<HTMLElement>('.slider__wrapper');

    if (!slider) throw new Error('to - не найдено');

    slider.insertAdjacentHTML('beforeend', handleTemplate);
  }

  private createClass(isVertical: boolean): void {
    this.classHandleVertical = isVertical ? 'slider__handle_vertical' : '';
    this.classHandleToVertical = isVertical ? 'slider__handle_to_vertical' : '';
  }
}

export default IntervalHandle;
