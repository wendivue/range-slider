class IntervalLabel {
  constructor(anchor: HTMLElement) {
    this.init(anchor);
  }

  private init(anchor: HTMLElement): void {
    const labelFrom =
      '<div class="slider__label">' +
      '<div class="slider__label-text slider__label-text--from"></div>' +
      '</div>';

    const labelTo =
      '<div class="slider__label">' +
      '<div class="slider__label-text slider__label-text--to"></div>' +
      '</div>';

    const handleFrom = anchor.querySelector('.slider__handle--from');
    const handleTo = anchor.querySelector('.slider__handle--to');

    handleFrom.insertAdjacentHTML('afterbegin', labelFrom);
    handleTo.insertAdjacentHTML('afterbegin', labelTo);
  }
}
export default IntervalLabel;
