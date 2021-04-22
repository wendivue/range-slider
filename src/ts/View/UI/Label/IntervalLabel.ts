class IntervalLabel {
  constructor(public anchor: HTMLElement) {
    this.init(anchor);
  }

  private init(anchor: HTMLElement): void {
    const labelFrom =
      '<div class="slider__label">' +
      '<div class="slider__label-text slider__label-text_from"></div>' +
      '</div>';

    const labelTo =
      '<div class="slider__label">' +
      '<div class="slider__label-text slider__label-text_to"></div>' +
      '</div>';

    const handleFrom = anchor.querySelector('.slider__handle_from');
    const handleTo = anchor.querySelector('.slider__handle_to');

    handleFrom.insertAdjacentHTML('afterbegin', labelFrom);
    handleTo.insertAdjacentHTML('afterbegin', labelTo);
  }

  public changeLabelValue(fromValue: string, toValue?: string): void {
    const labelFrom = this.anchor.querySelector('.slider__label-text_from');
    const labelTo = this.anchor.querySelector('.slider__label-text_to');

    labelFrom.innerHTML = fromValue;
    labelTo.innerHTML = toValue;
  }
}
export default IntervalLabel;
