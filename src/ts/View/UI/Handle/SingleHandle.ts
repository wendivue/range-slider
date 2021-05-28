import { ISingleHandle } from './ISingleHandle';

class SingleHandle implements ISingleHandle {
  private classHandleSingleVertical?: string;

  private classHandleVertical?: string;

  constructor(private anchor: HTMLElement, private isVertical: boolean) {
    this.anchor = anchor;
    this.init();
  }

  public moveElement(percentage: number): void {
    const single = this.anchor.querySelector(
      '.slider__handle_single'
    ) as HTMLElement;

    if (this.isVertical) {
      single.style.top = `${percentage}%`;
    } else {
      single.style.left = `${percentage}%`;
    }
  }

  private init(): void {
    this.createClass(this.isVertical);
    this.createHtml(this.anchor);
  }

  private createHtml(anchor: HTMLElement): void {
    const handleTemplate = `<div class="slider__handle slider__handle_single ${this.classHandleVertical} 
    ${this.classHandleSingleVertical}"></div>`;
    const slider = anchor.querySelector('.slider__wrapper') as HTMLElement;

    slider.insertAdjacentHTML('beforeend', handleTemplate);
  }

  private createClass(isVertical: boolean): void {
    this.classHandleSingleVertical = isVertical
      ? 'slider__handle_single_vertical'
      : '';
    this.classHandleVertical = isVertical ? 'slider__handle_vertical' : '';
  }
}

export default SingleHandle;
