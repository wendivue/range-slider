import getUniqueID from 'Helpers/helpersFunctions';

class IntervalInput {
  constructor(public anchor: HTMLElement) {
    this.init(anchor);
  }

  private init(anchor: HTMLElement): void {
    const fromId = `from-${getUniqueID()}`;
    const toId = `to-${getUniqueID()}`;

    const inputTemplate = `
      <div class="slider__wrapper-input">
        <label class="slider__title-input" for="${fromId}">From</label>
        <input id="${fromId}" type="text" class="input input__from">
      </div>

      <div class="slider__wrapper-input">
        <label class="slider__title-input" for="${toId}">To</label>
        <input id="${toId}" type="text" class="input input__to">
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
