class IntervalHandle {
  private classHandleVertical: string;

  private classHandleToVertical: string;

  constructor(public anchor: HTMLElement, vertical: boolean) {
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
}

export default IntervalHandle;
