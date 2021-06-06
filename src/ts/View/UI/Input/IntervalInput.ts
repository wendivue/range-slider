import { getUniqueID } from 'Helpers/helpersFunctions';
import { IIntervalInput } from './IIntervalInput';

class IntervalInput implements IIntervalInput {
  constructor(private anchor: HTMLElement) {
    this.init(anchor);
  }

  public changeValue(fromValue: string, toValue: string): void {
    const inputFrom = this.anchor.querySelector('.input__from') as HTMLInputElement;
    const inputTo = this.anchor.querySelector('.input__to') as HTMLInputElement;

    inputFrom.value = fromValue;
    inputTo.value = toValue;
  }

  private init(anchor: HTMLElement): void {
    const fromId = `from-${getUniqueID()}`;
    const toId = `to-${getUniqueID()}`;

    const inputTemplate = `
      <div class="slider__wrapper-input">
        <label class="slider__title-input" for="${fromId}">From</label>
        <input id="${fromId}" type="number" class="input input__from">
      </div>

      <div class="slider__wrapper-input">
        <label class="slider__title-input" for="${toId}">To</label>
        <input id="${toId}" type="number" class="input input__to">
      </div>
      `;

    const slider = anchor.querySelector('.slider__main-wrapper') as HTMLElement;

    slider.insertAdjacentHTML('afterend', inputTemplate);
  }
}

export default IntervalInput;
