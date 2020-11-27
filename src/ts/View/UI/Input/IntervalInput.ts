class IntervalInput {
  constructor(public anchor: HTMLElement) {
    this.init(anchor);
  }

  private init(anchor: HTMLElement): void {
    const inputTemplate = `
      <div class="slider__wrapper-input">
        <label class="slider__title-input" for="from">From</label>
        <input id="from" type="text" class="input input__from">
      </div>

      <div class="slider__wrapper-input">
        <label class="slider__title-input" for="to">To</label>
        <input id="to" type="text" class="input input__to">
      </div>
      `;

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
