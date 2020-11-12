class IntervalLabel {
  constructor(public anchor: HTMLElement) {
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

  public changeLabelValue(fromValue: string, toValue?: string): void {
    const labelFrom = this.anchor.querySelector('.slider__label-text--from');
    const labelTo = this.anchor.querySelector('.slider__label-text--to');

    labelFrom.innerHTML = fromValue;
    labelTo.innerHTML = toValue;
  }
}
export default IntervalLabel;
