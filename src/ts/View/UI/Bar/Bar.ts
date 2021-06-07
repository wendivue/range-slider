import { TypeSlider } from 'Helpers/interface';
import Constants from 'Helpers/enums';
import { IBar } from './IBar';

const { SINGLE, DOUBLE } = Constants;

class Bar implements IBar {
  private classBarVertical?: string;

  private classBarSingle?: string;

  private classBarSingleVertical?: string;

  constructor(private anchor: HTMLElement, private isVertical: boolean, private type: TypeSlider) {
    this.init();
  }

  public changeBar(from: number, to?: number): void {
    const bar = this.anchor.querySelector<HTMLElement>('.slider__bar');

    if (!bar) throw new Error('bar - не найдено');

    if (this.isVertical) {
      if (this.type === SINGLE) bar.style.height = `${from}%`;
      if (this.type === DOUBLE) {
        if (to === undefined) throw new Error('to не передан');

        bar.style.height = `${to - from}%`;
        bar.style.top = `${from}%`;
      }
    } else {
      if (this.type === SINGLE) bar.style.width = `${from}%`;
      if (this.type === DOUBLE) {
        if (to === undefined) throw new Error('to не передан');

        bar.style.width = `${to - from}%`;
        bar.style.left = `${from}%`;
      }
    }
  }

  private init(): void {
    this.createClass(this.isVertical, this.type);
    this.createHtml(this.anchor);
  }

  private createHtml(anchor: HTMLElement): void {
    const barTemplate = `<div class="slider__bar ${this.classBarVertical}
    ${this.classBarSingle} ${this.classBarSingleVertical}"></div>`;
    const slider = anchor.querySelector<HTMLElement>('.slider__wrapper');

    if (!slider) throw new Error('slider - не найдено');

    slider.insertAdjacentHTML('afterbegin', barTemplate);
  }

  private createClass(isVertical: boolean, type: string): void {
    this.classBarVertical = isVertical ? 'slider__bar_vertical' : '';
    this.classBarSingle = type === SINGLE ? 'slider__bar_single' : '';
    this.classBarSingleVertical =
      type === SINGLE && isVertical ? 'slider__bar_single_vertical' : '';
  }
}

export default Bar;
