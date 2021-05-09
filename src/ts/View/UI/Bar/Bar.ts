import Constants from 'Helpers/enums';

const { SINGLE } = Constants;

class Bar {
  private classBarVertical: string;

  private classBarSingle: string;

  private classBarSingleVertical: string;

  constructor(
    public anchor: HTMLElement,
    public isVertical: boolean,
    public type: string
  ) {
    this.init();
  }

  private init(): void {
    this.createClass(this.isVertical, this.type);
    this.createHtml(this.anchor);
  }

  private createHtml(anchor: HTMLElement): void {
    const barTemplate = `<div class="slider__bar ${this.classBarVertical}
    ${this.classBarSingle} ${this.classBarSingleVertical}"></div>`;
    const slider = anchor.querySelector('.slider__wrapper');

    if (!slider) throw new Error('.slider__wrapper - не найдено');

    slider.insertAdjacentHTML('afterbegin', barTemplate);
  }

  private createClass(isVertical: boolean, type: string): void {
    this.classBarVertical = isVertical ? 'slider__bar_vertical' : '';
    this.classBarSingle = type === SINGLE ? 'slider__bar_single' : '';
    this.classBarSingleVertical =
      type === SINGLE && isVertical ? 'slider__bar_single_vertical' : '';
  }

  public changeBar(from: number, to?: number): void {
    const bar = this.anchor.querySelector('.slider__bar') as HTMLElement;

    if (!bar) throw new Error('.slider__bar - не найдено');

    if (this.isVertical) {
      if (this.type === SINGLE) {
        bar.style.height = `${from}%`;
      } else {
        if (from === undefined || to === undefined) {
          throw new Error('from || to не передан');
        }

        bar.style.height = `${to - from}%`;
        bar.style.top = `${from}%`;
      }
    } else if (this.type === SINGLE) {
      bar.style.width = `${from}%`;
    } else {
      if (from === undefined || to === undefined) {
        throw new Error('from || to не передан');
      }

      bar.style.width = `${to - from}%`;
      bar.style.left = `${from}%`;
    }
  }
}

export default Bar;
