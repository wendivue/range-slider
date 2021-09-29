import { boundMethod } from 'autobind-decorator';

import Constants from 'Helpers/enums';
import { getUniqueID } from 'Helpers/helpersFunctions';
import { IView } from 'Ts/View/IView';
import { ISingleInput } from './ISingleInput';

const { SINGLE, ELEMENTTYPE, INPUTS } = Constants;

class SingleInput implements ISingleInput {
  constructor(private anchor: HTMLElement, private view: IView) {
    this.init();
  }

  public changeValue(fromValue: string): void {
    const inputSingle = this.anchor.querySelector<HTMLInputElement>('.input__single');

    if (!inputSingle) throw new Error('inputSingle - не найдено');

    inputSingle.value = fromValue;
  }

  private createHtml(): void {
    const singleId = `single-${getUniqueID()}`;

    const inputTemplate = `
    <div class="slider__input-wrapper">
      <label class="slider__input-title" for="${singleId}">From</label>
      <input id="${singleId}" type="number" class="input input__single">
    </div>
    `;

    const slider = this.anchor.querySelector<HTMLElement>('.slider__main-wrapper');

    if (!slider) throw new Error('slider - не найдено');

    slider.insertAdjacentHTML('afterend', inputTemplate);
  }

  private init() {
    this.createHtml();
    this.addEventHandlersInput();
  }

  private addEventHandlersInput(): void {
    const element = this.anchor.querySelector<HTMLElement>('.input__single');

    if (!element) throw new Error('element - не найдено');

    element.addEventListener('change', this.inputOnChange);
  }

  @boundMethod
  private inputOnChange(event: Event): void {
    const element = <HTMLInputElement>event.target;
    const elementType = SINGLE;
    const data: { [k: string]: number | boolean | Constants } = {};
    let value = parseFloat(element.value);
    if (Number.isNaN(value)) value = this.view.config[elementType];

    data[elementType] = value;
    data[ELEMENTTYPE] = elementType;
    data[INPUTS] = true;

    this.view.notify(data);
  }
}

export default SingleInput;
