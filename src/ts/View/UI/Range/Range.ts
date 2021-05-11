import getUniqueID from 'Helpers/helpersFunctions';

class Range {
  constructor(anchor: HTMLElement, min: number, max: number) {
    this.init(anchor, min, max);
  }

  private init(anchor: HTMLElement, min: number, max: number): void {
    const minId = `min-${getUniqueID()}`;
    const maxId = `max-${getUniqueID()}`;

    const rangeTemplate = `
    <div class="slider__wrapper-input">
      <label class="slider__title-input" for="${minId}">Min</label>
      <input id="${minId}" type="text" class="input slider__range slider__range-min" value=${min} >
    </div>

    <div class="slider__wrapper-input">
      <label class="slider__title-input" for="${maxId}">Max</label>
      <input id="${maxId}" type="text" class="input slider__range slider__range-max" value=${max} >
    </div>
    `;

    const slider = anchor.querySelector('.slider__wrapper') as HTMLElement;

    slider.insertAdjacentHTML('afterend', rangeTemplate);
  }
}

export default Range;
