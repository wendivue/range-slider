import Constants from 'Helpers/enums';

const { SINGLE, DOUBLE } = Constants;

class Template {
  private classWrapperVertical?: string;

  private classWrapperSingle?: string;

  private classWrapperDouble?: string;

  constructor(
    public anchor: HTMLElement,
    public isVertical: boolean,
    public type: string
  ) {
    this.init();
  }

  private init() {
    this.createClass(this.isVertical, this.type);
    this.createHtml(this.anchor);
  }

  private createHtml(anchor: HTMLElement): void {
    const sliderTemplate = `<div class="slider__wrapper ${this.classWrapperVertical} ${this.classWrapperSingle} ${this.classWrapperDouble}">`;

    anchor.insertAdjacentHTML('afterbegin', sliderTemplate);
  }

  private createClass(isVertical: boolean, type: string): void {
    this.classWrapperVertical = isVertical ? 'slider__wrapper_vertical' : '';
    this.classWrapperSingle = type === SINGLE ? 'slider__wrapper_single' : '';
    this.classWrapperDouble = type === DOUBLE ? 'slider__wrapper_double' : '';
  }
}

export default Template;
