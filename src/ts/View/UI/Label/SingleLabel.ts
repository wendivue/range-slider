import { ISingleLabel } from './ISingleLabel';

class SingleLabel implements ISingleLabel {
  private classLabelVertical?: string;

  private classLabelTextVertical?: string;

  constructor(private anchor: HTMLElement, private isVertical: boolean) {
    this.init();
  }

  public changeLabelValue(fromValue: string): void {
    const labelSingle = this.anchor.querySelector(
      '.slider__label-text_single'
    ) as HTMLElement;

    labelSingle.innerHTML = fromValue;
  }

  private init(): void {
    this.createClass(this.isVertical);
    this.createHtml(this.anchor);
  }

  private createHtml(anchor: HTMLElement): void {
    const label =
      `<div class="slider__label ${this.classLabelVertical}">` +
      `<div class="slider__label-text ${this.classLabelTextVertical} slider__label-text_single"></div>` +
      '</div>';

    const handle = anchor.querySelector(
      '.slider__handle_single'
    ) as HTMLElement;

    handle.insertAdjacentHTML('afterbegin', label);
  }

  private createClass(isVertical: boolean): void {
    this.classLabelVertical = isVertical ? 'slider__label_vertical' : '';
    this.classLabelTextVertical = isVertical
      ? 'slider__label-text_vertical'
      : '';
  }
}

export default SingleLabel;
