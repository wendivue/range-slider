class IntervalLabel {
  private classLabelVertical?: string;

  constructor(public anchor: HTMLElement, public isVertical: boolean) {
    this.init();
  }

  private init(): void {
    this.createClass(this.isVertical);
    this.createHtml(this.anchor);
  }

  private createHtml(anchor: HTMLElement): void {
    const labelFrom =
      `<div class="slider__label ${this.classLabelVertical}">` +
      '<div class="slider__label-text slider__label-text_from"></div>' +
      '</div>';

    const labelTo =
      `<div class="slider__label ${this.classLabelVertical}">` +
      '<div class="slider__label-text slider__label-text_to"></div>' +
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
}
export default IntervalLabel;
