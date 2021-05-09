class SingleLabel {
  constructor(public anchor: HTMLElement) {
    this.init(anchor);
  }

  private init(anchor: HTMLElement): void {
    const label =
      '<div class="slider__label">' +
      '<div class="slider__label-text slider__label-text_single"></div>' +
      '</div>';

    const handle = anchor.querySelector('.slider__handle_single');

    if (!handle) throw new Error('.slider__handle_single - не найдено');

    handle.insertAdjacentHTML('afterbegin', label);
  }

  public changeLabelValue(fromValue: string): void {
    const labelSingle = this.anchor.querySelector('.slider__label-text_single');

    if (!labelSingle)
      throw new Error('.slider__label-text_single - не найдено');

    labelSingle.innerHTML = fromValue;
  }
}

export default SingleLabel;
