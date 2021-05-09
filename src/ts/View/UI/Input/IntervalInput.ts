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

    if (!slider) throw new Error('.slider__wrapper - не найдено');

    slider.insertAdjacentHTML('afterend', inputTemplate);
  }

  public changeValue(fromValue: string, toValue?: string): void {
    const inputFrom = this.anchor.querySelector(
      '.input__from'
    ) as HTMLInputElement;
    const inputTo = this.anchor.querySelector('.input__to') as HTMLInputElement;

    if (!inputFrom) throw new Error('.input__from - не найдено');
    if (!inputTo) throw new Error('.input__to - не найдено');
    if (fromValue === undefined || toValue === undefined) {
      throw new Error('fromValue || toValue не передан');
    }

    inputFrom.value = fromValue;
    inputTo.value = toValue;
  }
}

export default IntervalInput;
