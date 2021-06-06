import { getUniqueID } from 'Helpers/helpersFunctions';
import { IRange } from './IRange';

class Range implements IRange {
  constructor(private anchor: HTMLElement, min: number, max: number) {
    this.init(anchor, min, max);
  }

  public changeValue(min: string, max: string): void {
    const rangeMin = this.anchor.querySelector('.slider__range-min') as HTMLInputElement;
    const rangeMax = this.anchor.querySelector('.slider__range-max') as HTMLInputElement;

    rangeMin.value = min;
    rangeMax.value = max;
  }

  private init(anchor: HTMLElement, min: number, max: number): void {
    const minId = `min-${getUniqueID()}`;
    const maxId = `max-${getUniqueID()}`;

    const rangeTemplate = `
    <div class="slider__wrapper-input">
      <label class="slider__title-input" for="${minId}">Min</label>
      <input id="${minId}" type="number" class="input slider__range slider__range-min" value=${min} >
    </div>

    <div class="slider__wrapper-input">
      <label class="slider__title-input" for="${maxId}">Max</label>
      <input id="${maxId}" type="number" class="input slider__range slider__range-max" value=${max} >
    </div>
    `;

    const slider = anchor.querySelector('.slider__main-wrapper') as HTMLElement;

    slider.insertAdjacentHTML('afterend', rangeTemplate);
  }
}

export default Range;
