import { typeData } from 'Helpers/interface';
import Constants from 'Helpers/enums';

const { SINGLE, DOUBLE } = Constants;

class Template {
  private classWrapperMainVertical?: string;

  private classWrapperVertical?: string;

  private classWrapperSingle?: string;

  private classWrapperDouble?: string;

  constructor(
    private anchor: HTMLElement,
    private isVertical: boolean,
    private type: typeData
  ) {
    this.init();
  }

  private init() {
    this.createClass(this.isVertical, this.type);
    this.createHtml(this.anchor);
  }

  private createHtml(anchor: HTMLElement): void {
    const sliderTemplate = `<div class="slider__main-wrapper ${this.classWrapperMainVertical}"><div class="slider__wrapper ${this.classWrapperVertical} ${this.classWrapperSingle} ${this.classWrapperDouble}"></div></div>`;

    anchor.insertAdjacentHTML('afterbegin', sliderTemplate);
  }

  private createClass(isVertical: boolean, type: typeData): void {
    this.classWrapperMainVertical = isVertical
      ? 'slider__main-wrapper_vertical'
      : '';
    this.classWrapperVertical = isVertical ? 'slider__wrapper_vertical' : '';
    this.classWrapperSingle = type === SINGLE ? 'slider__wrapper_single' : '';
    this.classWrapperDouble = type === DOUBLE ? 'slider__wrapper_double' : '';
  }
}

export default Template;
