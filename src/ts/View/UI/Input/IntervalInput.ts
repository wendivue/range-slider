class IntervalInput {
  constructor(public anchor: HTMLElement) {
    this.init(anchor);
  }

  private init(anchor: HTMLElement): void {
    const inputTemplate =
      `<input type="text" class="input input__from">` +
      `<input type="text" class="input input__to">`;

    const slider = anchor.querySelector('.slider__wrapper');
    slider.insertAdjacentHTML('afterend', inputTemplate);
  }

  public changeValue(fromValue: string, toValue?: string): void {
    const inputFrom: HTMLInputElement = this.anchor.querySelector(
      '.input__from'
    );
    const inputTo: HTMLInputElement = this.anchor.querySelector('.input__to');

    inputFrom.value = fromValue;
    inputTo.value = toValue;
  }
}

export default IntervalInput;
