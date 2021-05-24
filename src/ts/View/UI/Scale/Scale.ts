class Scale {
  classScaleVertical?: string;

  classScaleItemVertical?: string;

  constructor(
    public anchor: HTMLElement,
    public min: number,
    public max: number,
    public isVertical: boolean
  ) {
    this.init();
  }

  private init(): void {
    this.createClass(this.isVertical);
    this.createHtml(this.anchor);
  }

  private createHtml(anchor: HTMLElement): void {
    const scaleTemplate = `<div class="slider__scale ${this.classScaleVertical}"></div>`;

    const slider = anchor.querySelector('.slider__wrapper') as HTMLElement;

    slider.insertAdjacentHTML('beforeend', scaleTemplate);
  }

  private createClass(isVertical: boolean): void {
    this.classScaleVertical = isVertical ? 'slider__scale_vertical' : '';
    this.classScaleItemVertical = isVertical
      ? 'slider__scale-item_vertical'
      : '';
  }

  private calculateValue(percentage: number): number {
    let newValue = percentage;
    newValue = Math.round(
      ((this.max - this.min) / 100) * percentage + this.min
    );

    return newValue;
  }

  public changeScale(ArrayPercentage: Array<number>): void {
    let newPercentage = ArrayPercentage;

    while (newPercentage.length > 20) {
      for (let i = 0; i <= newPercentage.length; i += 1) {
        newPercentage.splice(i, 1);
      }
    }

    newPercentage = [0, ...newPercentage, 100];
    newPercentage = newPercentage.filter(
      (item, index, array) => array.indexOf(item) === index
    );

    const scale = this.anchor.querySelector('.slider__scale') as HTMLElement;
    scale.innerHTML = '';
    Object.entries(newPercentage).forEach(([key, percentage]) => {
      const value = this.calculateValue(percentage);
      const scaleItemTemplate = `<div class="slider__scale-item ${this.classScaleItemVertical}">${value}</div>`;
      scale.insertAdjacentHTML('beforeend', scaleItemTemplate);

      const scaleItem = this.anchor.querySelectorAll(
        '.slider__scale-item'
      ) as any;

      if (this.isVertical) {
        scaleItem[key].style.top = `${percentage}%`;
      } else {
        scaleItem[key].style.left = `${percentage}%`;
      }
    });
  }
}

export default Scale;
