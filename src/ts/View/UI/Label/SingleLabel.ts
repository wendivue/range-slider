import { ISingleLabel } from './ISingleLabel';

class SingleLabel implements ISingleLabel {
  private classLabelVertical?: string;

  private classLabelTextVertical?: string;

  constructor(private anchor: HTMLElement, private isVertical: boolean) {
    this.init();
  }

  public changeLabelValue(fromValue: string): void {
    const labelSingle = this.anchor.querySelector<HTMLElement>('.slider__label-text_single');

    if (!labelSingle) throw new Error('labelSingle - не найдено');

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

    const handle = anchor.querySelector<HTMLElement>('.slider__handle_single');

    if (!handle) throw new Error('handle - не найдено');

    handle.insertAdjacentHTML('afterbegin', label);
  }

  private createClass(isVertical: boolean): void {
    this.classLabelVertical = isVertical ? 'slider__label_vertical' : '';
    this.classLabelTextVertical = isVertical ? 'slider__label-text_vertical' : '';
  }
}

export default SingleLabel;
