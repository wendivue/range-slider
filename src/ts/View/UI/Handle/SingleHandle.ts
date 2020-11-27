class SingleHandle {
  private classHandleSingleVertical: string;

  private classHandleVertical: string;

  constructor(public anchor: HTMLElement, public vertical: boolean) {
    this.anchor = anchor;
    this.createClass(vertical);
    this.init(anchor);
  }

  private init(anchor: HTMLElement): void {
    const handleTemplate = `<div class="slider__handle slider__handle--single ${this.classHandleVertical} 
    ${this.classHandleSingleVertical}"></div>`;
    const slider = anchor.querySelector('.slider__wrapper');

    slider.insertAdjacentHTML('beforeend', handleTemplate);
  }

  private createClass(vertical: boolean): void {
    this.classHandleSingleVertical = vertical
      ? 'slider__handle--single--vertical'
      : '';
    this.classHandleVertical = vertical ? 'slider__handle--vertical' : '';
  }

  public moveElement(percentage: number): void {
    const single: HTMLElement = this.anchor.querySelector(
      '.slider__handle--single'
    );

    if (this.vertical) {
      single.style.top = `${percentage}%`;
    } else {
      single.style.left = `${percentage}%`;
    }
  }
}

export default SingleHandle;