import { IIntervalLabel } from './IIntervalLabel';

class IntervalLabel implements IIntervalLabel {
  private classLabelVertical?: string;

  private classLabelTextVertical?: string;

  constructor(private anchor: HTMLElement, private isVertical: boolean) {
    this.init();
  }

  public changeLabelValue(fromValue: string, toValue: string): void {
    const labelFrom = this.anchor.querySelector(
      '.slider__label-text_from'
    ) as HTMLElement;
    const labelTo = this.anchor.querySelector(
      '.slider__label-text_to'
    ) as HTMLElement;

    labelFrom.innerHTML = fromValue;
    labelTo.innerHTML = toValue;
  }

  private init(): void {
    this.createClass(this.isVertical);
    this.createHtml(this.anchor);
  }

  private createHtml(anchor: HTMLElement): void {
    const labelFrom =
      `<div class="slider__label ${this.classLabelVertical}">` +
      `<div class="slider__label-text ${this.classLabelTextVertical} slider__label-text_from"></div>` +
      '</div>';

    const labelTo =
      `<div class="slider__label ${this.classLabelVertical}">` +
      `<div class="slider__label-text ${this.classLabelTextVertical} slider__label-text_to"></div>` +
      '</div>';

    const handleFrom = anchor.querySelector(
      '.slider__handle_from'
    ) as HTMLElement;
    const handleTo = anchor.querySelector('.slider__handle_to') as HTMLElement;

    handleFrom.insertAdjacentHTML('afterbegin', labelFrom);
    handleTo.insertAdjacentHTML('afterbegin', labelTo);
  }

  private createClass(isVertical: boolean): void {
    this.classLabelVertical = isVertical ? 'slider__label_vertical' : '';
    this.classLabelTextVertical = isVertical
      ? 'slider__label-text_vertical'
      : '';
  }
}
export default IntervalLabel;
