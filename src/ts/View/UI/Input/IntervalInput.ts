import { boundMethod } from 'autobind-decorator';

import Constants from 'Helpers/enums';
import { getUniqueID } from 'Helpers/helpersFunctions';
import { ElementType } from 'Helpers/interface';
import { IView } from 'Ts/View/IView';

import { IIntervalInput } from './IIntervalInput';

const { FROM, TO, ELEMENTTYPE, INPUTS } = Constants;

class IntervalInput implements IIntervalInput {
  private inputFrom!: HTMLInputElement;

  private inputTo!: HTMLInputElement;

  constructor(private anchor: HTMLElement, private view: IView) {
    this.init();
  }

  public changeValue(fromValue: string, toValue: string): void {
    this.inputFrom.value = fromValue;
    this.inputTo.value = toValue;
  }

  private init() {
    this.createHtml();
    this.addEventHandlersInput(FROM);
    this.addEventHandlersInput(TO);
  }

  private createHtml(): void {
    const fromId = `from-${getUniqueID()}`;
    const toId = `to-${getUniqueID()}`;

    const inputTemplate = `
      <div class="slider__input-wrapper">
        <label class="slider__input-title" for="${fromId}">From</label>
        <input id="${fromId}" type="number" class="input input__from">
      </div>

      <div class="slider__input-wrapper">
        <label class="slider__input-title" for="${toId}">To</label>
        <input id="${toId}" type="number" class="input input__to">
      </div>
      `;

    const slider = this.anchor.querySelector<HTMLElement>('.slider__main-wrapper');

    if (!slider) throw new Error('slider - не найдено');

    slider.insertAdjacentHTML('afterend', inputTemplate);

    const inputFrom = this.anchor.querySelector<HTMLInputElement>('.input__from');
    const inputTo = this.anchor.querySelector<HTMLInputElement>('.input__to');

    if (!inputFrom) throw new Error('inputFrom - не найдено');
    if (!inputTo) throw new Error('inputTo - не найдено');

    this.inputFrom = inputFrom;
    this.inputTo = inputTo;
  }

  private addEventHandlersInput(elementType: Constants): void {
    let element;

    if (elementType === FROM) element = this.anchor.querySelector<HTMLInputElement>('.input__from');
    if (elementType === TO) element = this.anchor.querySelector<HTMLInputElement>('.input__to');

    if (!element) throw new Error('element не передан');

    element.addEventListener('change', this.inputOnChange);
  }

  @boundMethod
  private inputOnChange(event: Event): void {
    const element = event.target;
    if (!(element instanceof HTMLInputElement)) return;
    const elementType = this.validateElementType(element);
    const data: { [k: string]: number | boolean | ElementType } = {};
    let value = parseFloat(element.value);
    if (Number.isNaN(value)) value = this.view.config[elementType];

    data[elementType] = value;
    data[ELEMENTTYPE] = elementType;
    data[INPUTS] = true;

    this.view.notify(data);
  }

  private validateElementType(element: HTMLElement): ElementType {
    let elementType: ElementType | undefined;

    if (element === this.inputFrom) elementType = FROM;
    if (element === this.inputTo) elementType = TO;

    if (!elementType) throw new Error('elementType - не найдено');

    return elementType;
  }
}

export default IntervalInput;
