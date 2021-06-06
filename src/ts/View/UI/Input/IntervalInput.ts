import Constants from 'Helpers/enums';
import { getUniqueID } from 'Helpers/helpersFunctions';
import { IView } from 'Ts/View/IView';
import { IIntervalInput } from './IIntervalInput';

const { FROM, TO, TYPE, INPUT } = Constants;

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
    this.bindInputEvents(FROM);
    this.bindInputEvents(TO);
  }

  private createHtml(): void {
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

    const slider = this.anchor.querySelector('.slider__main-wrapper') as HTMLElement;

    slider.insertAdjacentHTML('afterend', inputTemplate);

    this.inputFrom = this.anchor.querySelector('.input__from') as HTMLInputElement;
    this.inputTo = this.anchor.querySelector('.input__to') as HTMLInputElement;
  }

  private bindInputEvents(elementType: Constants): void {
    let element;

    if (elementType === FROM)
      element = this.anchor.querySelector('.input__from') as HTMLInputElement;
    if (elementType === TO) element = this.anchor.querySelector('.input__to') as HTMLInputElement;

    if (element === undefined) throw new Error('element не передан');

    element.addEventListener('change', this.inputOnChange.bind(this));
  }

  private inputOnChange(event: Event): void {
    const element = event.target as HTMLInputElement;
    const elementType = this.checkElementType(element) as typeof FROM | typeof TO;
    const data: { [k: string]: number | boolean | Constants } = {};
    let value = parseFloat(element.value);
    if (Number.isNaN(value)) value = this.view.config[elementType];

    data[elementType] = value;
    data[TYPE] = elementType;
    data[INPUT] = true;

    this.view.notify(data);
  }

  private checkElementType(element: HTMLElement): Constants {
    let elementType;

    if (element === this.inputFrom) elementType = FROM;
    if (element === this.inputTo) elementType = TO;

    if (!elementType) throw new Error('elementType - не найдено');

    return elementType;
  }
}

export default IntervalInput;
