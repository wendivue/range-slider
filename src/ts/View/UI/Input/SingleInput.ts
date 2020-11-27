class SingleInput {
  constructor(public anchor: HTMLElement) {
    this.init(anchor);
  }

  private init(anchor: HTMLElement): void {
    const inputTemplate = `
    <div class="slider__wrapper-input">
      <label class="slider__title-input" for="single">From</label>
      <input id="single" type="text" class="input input__single">
    </div>
    `;

    const slider = anchor.querySelector('.slider__wrapper');
    slider.insertAdjacentHTML('afterend', inputTemplate);
  }

  public changeValue(fromValue: string): void {
    const inputSingle: HTMLInputElement = this.anchor.querySelector(
      '.input__single'
    );

    inputSingle.value = fromValue;
  }
}

export default SingleInput;
