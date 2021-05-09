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

    if (!handleFrom) throw new Error('.slider__handle_from - не найдено');
    if (!handleTo) throw new Error('.slider__handle_to - не найдено');

    handleFrom.insertAdjacentHTML('afterbegin', labelFrom);
    handleTo.insertAdjacentHTML('afterbegin', labelTo);
  }

  public changeLabelValue(fromValue: string, toValue?: string): void {
    const labelFrom = this.anchor.querySelector('.slider__label-text_from');
    const labelTo = this.anchor.querySelector('.slider__label-text_to');

    if (!labelFrom) throw new Error('.slider__label-text_from - не найдено');
    if (!labelTo) throw new Error('.slider__label-text_to - не найдено');
    if (fromValue === undefined || toValue === undefined) {
      throw new Error('fromValue || toValue не передан');
    }

    labelFrom.innerHTML = fromValue;
    labelTo.innerHTML = toValue;
  }
}
export default IntervalLabel;
