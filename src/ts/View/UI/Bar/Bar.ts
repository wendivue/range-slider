import { SINGLE } from 'Helpers/constants';

class Bar {
  private classBarVertical: string;

  private classBarSingle: string;

  private classBarSingleVertical: string;

  constructor(
    public anchor: HTMLElement,
    public isVertical: boolean,
    public type: string
  ) {
    this.createClass(isVertical, type);
    this.init(anchor);
  }

  private init(anchor: HTMLElement): void {
    const barTemplate = `<div class="slider__bar ${this.classBarVertical} 
    ${this.classBarSingle} ${this.classBarSingleVertical}"></div>`;
    const slider = anchor.querySelector('.slider__wrapper');

    slider.insertAdjacentHTML('afterbegin', barTemplate);
  }

  private createClass(isVertical: boolean, type: string): void {
    this.classBarVertical = isVertical ? 'slider__bar--vertical' : '';
    this.classBarSingle = type === SINGLE ? 'slider__bar--single' : '';
    this.classBarSingleVertical =
      type === SINGLE && isVertical ? 'slider__bar--single--vertical' : '';
  }

  public changeBar(from: number, to?: number): void {
    const bar: HTMLElement = this.anchor.querySelector('.slider__bar');

    if (this.isVertical) {
      if (this.type === SINGLE) {
        bar.style.height = `${from}%`;
      } else {
        bar.style.height = `${to - from}%`;
        bar.style.top = `${from}%`;
      }
    } else if (this.type === SINGLE) {
      bar.style.width = `${from}%`;
    } else {
      bar.style.width = `${to - from}%`;
      bar.style.left = `${from}%`;
    }
  }
}

export default Bar;
