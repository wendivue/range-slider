import { TypeSlider } from 'Helpers/interface';
import Constants from 'Helpers/enums';
import { IScale } from './IScale';

const { DOUBLE } = Constants;

class Scale implements IScale {
  private classType?: string;

  private classScaleVertical?: string;

  private classScaleItemVertical?: string;

  constructor(
    private anchor: HTMLElement,
    private isVertical: boolean,
    private type: TypeSlider
  ) {
    this.init();
  }

  public changeScale(
    ArrayPercentage: Array<number>,
    min: number,
    max: number,
    step: number
  ): void {
    let newPercentage = ArrayPercentage;
    let maxLength = 12;

    if (max >= 100) maxLength = 7;
    if (max > 1000) maxLength = 4;

    while (newPercentage.length > maxLength) {
      for (let i = 0; i <= newPercentage.length; i += 1) {
        newPercentage.splice(i, 1);
      }
    }

    let lastNumberArray = newPercentage.pop() as number;
    const stepPercentage = (100 * step) / (max - min);

    if (lastNumberArray >= 100) {
      lastNumberArray = newPercentage.pop() as number;
    }

    if (stepPercentage <= 100 - lastNumberArray && stepPercentage > 10) {
      newPercentage = [...newPercentage, lastNumberArray];
    }

    newPercentage = [0, ...newPercentage, 100];
    newPercentage = newPercentage.filter(
      (item, index, array) => array.indexOf(item) === index
    );

    const scale = this.anchor.querySelector('.slider__scale') as HTMLElement;
    scale.innerHTML = '';

    Object.entries(newPercentage).forEach(([key, percentage]) => {
      const value = this.calculateValue(percentage, min, max, step);
      const scaleItemTemplate = `<div class="slider__scale-item ${this.classScaleItemVertical}">${value}</div>`;
      scale.insertAdjacentHTML('beforeend', scaleItemTemplate);

      const scaleItem = this.anchor.querySelectorAll(
        '.slider__scale-item'
      ) as NodeListOf<HTMLElement>;

      if (this.isVertical) {
        scaleItem[parseFloat(key)].style.top = `${percentage}%`;
      } else {
        scaleItem[parseFloat(key)].style.left = `${percentage}%`;
      }
    });
  }

  private init(): void {
    this.createClass(this.isVertical);
    this.createHtml(this.anchor);
  }

  private createHtml(anchor: HTMLElement): void {
    const scaleTemplate = `<div class="slider__scale ${this.classScaleVertical} ${this.classType}"></div>`;

    const slider = anchor.querySelector('.slider__main-wrapper') as HTMLElement;

    slider.insertAdjacentHTML('beforeend', scaleTemplate);
  }

  private createClass(isVertical: boolean): void {
    this.classType =
      this.type === DOUBLE ? 'slider__scale_double' : 'slider__scale_single';
    this.classScaleVertical = isVertical ? 'slider__scale_vertical' : '';
    this.classScaleItemVertical = isVertical
      ? 'slider__scale-item_vertical'
      : '';
  }

  private calculateValue(
    percentage: number,
    min: number,
    max: number,
    step: number
  ): number {
    let newValue = percentage;
    if (Number.isInteger(step)) {
      newValue = Math.round(((max - min) / 100) * percentage + min);
    } else {
      newValue = ((max - min) / 100) * percentage + min;
    }

    newValue = parseFloat(newValue.toFixed(2));

    return newValue;
  }
}

export default Scale;
