class SingleHandle {
  private classHandleSingleVertical: string;

  private classHandleVertical: string;

  constructor(public anchor: HTMLElement, public isVertical: boolean) {
    this.anchor = anchor;
    this.createClass(isVertical);
    this.init(anchor);
  }

  private init(anchor: HTMLElement): void {
    const handleTemplate = `<div class="slider__handle slider__handle--single ${this.classHandleVertical} 
    ${this.classHandleSingleVertical}"></div>`;
    const slider = anchor.querySelector('.slider__wrapper');

    slider.insertAdjacentHTML('beforeend', handleTemplate);
  }

  private createClass(isVertical: boolean): void {
    this.classHandleSingleVertical = isVertical
      ? 'slider__handle--single--vertical'
      : '';
    this.classHandleVertical = isVertical ? 'slider__handle--vertical' : '';
  }

  public moveElement(percentage: number): void {
    const single: HTMLElement = this.anchor.querySelector(
      '.slider__handle--single'
    );

    if (this.isVertical) {
      single.style.top = `${percentage}%`;
    } else {
      single.style.left = `${percentage}%`;
    }
  }
}

export default SingleHandle;
