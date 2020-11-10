class SingleHandle {
  private classHandleSingleVertical: string;

  private classHandleVertical: string;

  constructor(public anchor: HTMLElement, vertical: boolean) {
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
}

export default SingleHandle;
