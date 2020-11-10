class Range {
  constructor(anchor: HTMLElement, min: number, max: number) {
    this.init(anchor, min, max);
  }

  private init(anchor: HTMLElement, min: number, max: number): void {
    const rangeTemplate =
      `<input type="text" class="slider__range slider__range-min" value=${min} >` +
      `<input type="text" class="slider__range slider__range-max" value=${max} >`;

    const slider = anchor.querySelector('.slider__wrapper');
    slider.insertAdjacentHTML('afterend', rangeTemplate);
  }
}

export default Range;
