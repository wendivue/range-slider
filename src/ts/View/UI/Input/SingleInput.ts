import Constants from 'Helpers/enums';
import { getUniqueID } from 'Helpers/helpersFunctions';
import { IView } from 'Ts/View/IView';
import { ISingleInput } from './ISingleInput';

const { SINGLE, TYPE, INPUT } = Constants;

class SingleInput implements ISingleInput {
  constructor(private anchor: HTMLElement, private view: IView) {
    this.init();
  }

  public changeValue(fromValue: string): void {
    const inputSingle = this.anchor.querySelector('.input__single') as HTMLInputElement;

    inputSingle.value = fromValue;
  }

  private createHtml(): void {
    const singleId = `single-${getUniqueID()}`;

    const inputTemplate = `
    <div class="slider__wrapper-input">
      <label class="slider__title-input" for="${singleId}">From</label>
      <input id="${singleId}" type="number" class="input input__single">
    </div>
    `;

    const slider = this.anchor.querySelector('.slider__main-wrapper') as HTMLElement;

    slider.insertAdjacentHTML('afterend', inputTemplate);
  }

  private init() {
    this.createHtml();
    this.bindInputEvents();
  }

  private bindInputEvents(): void {
    const element = this.anchor.querySelector('.input__single') as HTMLInputElement;

    element.addEventListener('change', this.inputOnChange.bind(this));
  }

  private inputOnChange(event: Event): void {
    const element = event.target as HTMLInputElement;
    const elementType = SINGLE;
    const data: { [k: string]: number | boolean | Constants } = {};
    let value = parseFloat(element.value);
    if (Number.isNaN(value)) value = this.view.config[elementType];

    data[elementType] = value;
    data[TYPE] = elementType;
    data[INPUT] = true;

    this.view.notify(data);
  }
}

export default SingleInput;
