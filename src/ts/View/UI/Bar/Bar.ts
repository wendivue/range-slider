import { SINGLE } from '../../../helpers/constants';

class Bar {
  private classBarVertical: string;

  private classBarSingle: string;

  private classBarSingleVertical: string;

  constructor(anchor: HTMLElement, vertical: boolean, type: string) {
    this.createClass(vertical, type);
    this.init(anchor);
  }

  private init(anchor: HTMLElement): void {
    const barTemplate = `<div class="slider__bar ${this.classBarVertical} 
    ${this.classBarSingle} ${this.classBarSingleVertical}"></div>`;
    const slider = anchor.querySelector('.slider__wrapper');

    slider.insertAdjacentHTML('afterbegin', barTemplate);
  }

  private createClass(vertical: boolean, type: string): void {
    this.classBarVertical = vertical ? 'slider__bar--vertical' : '';
    this.classBarSingle = type === SINGLE ? 'slider__bar--single' : '';
    this.classBarSingleVertical =
      type === SINGLE && vertical ? 'slider__bar--single--vertical' : '';
  }
}

export default Bar;
