import { boundMethod } from 'autobind-decorator';

import Constants from 'Helpers/enums';
import { getUniqueID } from 'Helpers/helpersFunctions';
import { IView } from 'Ts/View/IView';

import { IRange } from './IRange';

const { MIN, MAX } = Constants;

class Range implements IRange {
  private rangeMin!: HTMLInputElement;

  private rangeMax!: HTMLInputElement;

  constructor(
    private anchor: HTMLElement,
    private min: number,
    private max: number,
    private view: IView
  ) {
    this.init(anchor, min, max);
  }

  public changeValue(min: string, max: string): void {
    this.rangeMin.value = min;
    this.rangeMax.value = max;
  }

  private init(anchor: HTMLElement, min: number, max: number) {
    this.createHtml(anchor, min, max);
    this.addEventHandlersRange(MIN);
    this.addEventHandlersRange(MAX);
  }

  private createHtml(anchor: HTMLElement, min: number, max: number): void {
    const minId = `min-${getUniqueID()}`;
    const maxId = `max-${getUniqueID()}`;

    const rangeTemplate = `
    <div class="slider__input-wrapper">
      <label class="slider__input-title" for="${minId}">Min</label>
      <input id="${minId}" type="number" class="input slider__range slider__range-min" value=${min} >
    </div>

    <div class="slider__input-wrapper">
      <label class="slider__input-title" for="${maxId}">Max</label>
      <input id="${maxId}" type="number" class="input slider__range slider__range-max" value=${max} >
    </div>
    `;

    const slider = anchor.querySelector<HTMLElement>('.slider__main-wrapper');

    if (!slider) throw new Error('slider - не найдено');

    slider.insertAdjacentHTML('afterend', rangeTemplate);

    const rangeMin = this.anchor.querySelector<HTMLInputElement>('.slider__range-min');
    const rangeMax = this.anchor.querySelector<HTMLInputElement>('.slider__range-max');

    if (!rangeMin) throw new Error('rangeMin - не найдено');
    if (!rangeMax) throw new Error('rangeMax - не найдено');

    this.rangeMin = rangeMin;
    this.rangeMax = rangeMax;
  }

  private addEventHandlersRange(elementType: Constants): void {
    let element;

    if (elementType === MIN) element = this.rangeMin;
    if (elementType === MAX) element = this.rangeMax;

    if (element === undefined) throw new Error('element не передан');

    element.addEventListener('change', this.rangeOnChange);
  }

  @boundMethod
  private rangeOnChange(event: Event): void {
    const element = event.target;
    if (!(element instanceof HTMLInputElement)) return;
    let min = Math.abs(parseFloat(this.getElement(MIN).value));
    let max = Math.abs(parseFloat(this.getElement(MAX).value));
    let data: { [k: string]: number } = {};

    if (Number.isNaN(min)) min = this.min;
    if (Number.isNaN(max)) max = this.max;

    if (element === this.getElement(MIN)) data = { min };
    if (element === this.getElement(MAX)) data = { max };

    this.view.notify(data);
  }

  private getElement(elementType: Constants): HTMLInputElement {
    let element;

    if (elementType === MIN) element = this.rangeMin;
    if (elementType === MAX) element = this.rangeMax;

    if (!element) throw new Error('element - не найдено');

    return element;
  }
}

export default Range;
