import { getUniqueID } from 'Helpers/helpersFunctions';
import { ISingleInput } from './ISingleInput';

class SingleInput implements ISingleInput {
  constructor(private anchor: HTMLElement) {
    this.init(anchor);
  }

  public changeValue(fromValue: string): void {
    const inputSingle = this.anchor.querySelector('.input__single') as HTMLInputElement;

    inputSingle.value = fromValue;
  }

  private init(anchor: HTMLElement): void {
    const singleId = `single-${getUniqueID()}`;

    const inputTemplate = `
    <div class="slider__wrapper-input">
      <label class="slider__title-input" for="${singleId}">From</label>
      <input id="${singleId}" type="number" class="input input__single">
    </div>
    `;

    const slider = anchor.querySelector('.slider__main-wrapper') as HTMLElement;

    slider.insertAdjacentHTML('afterend', inputTemplate);
  }
}

export default SingleInput;
