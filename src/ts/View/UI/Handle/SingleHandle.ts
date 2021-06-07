import { IView } from 'Ts/View/IView';
import Constants from 'Helpers/enums';
import { ISingleHandle } from './ISingleHandle';
import EventsHandle from './EventsHandle';

const { SINGLE } = Constants;

class SingleHandle implements ISingleHandle {
  private classHandleSingleVertical?: string;

  private classHandleVertical?: string;

  constructor(private anchor: HTMLElement, private isVertical: boolean, private view: IView) {
    this.init();
  }

  public moveElement(percentage: number): void {
    const single = this.anchor.querySelector<HTMLElement>('.slider__handle_single');

    if (!single) throw new Error('single - не найдено');

    if (this.isVertical) {
      single.style.top = `${percentage}%`;
    } else {
      single.style.left = `${percentage}%`;
    }
  }

  private init(): void {
    this.createClass(this.isVertical);
    this.createHtml(this.anchor);
    const events = new EventsHandle(this.anchor, this.isVertical, this.view);
    events.init(SINGLE);
  }

  private createHtml(anchor: HTMLElement): void {
    const handleTemplate = `<div class="slider__handle slider__handle_single ${this.classHandleVertical} 
    ${this.classHandleSingleVertical}"></div>`;
    const slider = anchor.querySelector<HTMLElement>('.slider__wrapper');

    if (!slider) throw new Error('slider - не найдено');

    slider.insertAdjacentHTML('beforeend', handleTemplate);
  }

  private createClass(isVertical: boolean): void {
    this.classHandleSingleVertical = isVertical ? 'slider__handle_single_vertical' : '';
    this.classHandleVertical = isVertical ? 'slider__handle_vertical' : '';
  }
}

export default SingleHandle;
