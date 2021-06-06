import { TypeSlider } from 'Helpers/interface';
import Constants from 'Helpers/enums';
import { IView } from 'Ts/View/IView';
import { IScale } from './IScale';

const { DOUBLE, SINGLE, FROM, TYPE } = Constants;

class Scale implements IScale {
  private classType?: string;

  private classScaleVertical?: string;

  private classScaleItemVertical?: string;

  private scaleDouble!: HTMLElement;

  private scaleSingle!: HTMLElement;

  constructor(
    private anchor: HTMLElement,
    private isVertical: boolean,
    private type: TypeSlider,
    private view: IView
  ) {
    this.init();
  }

  public changeScale(ArrayPercentage: Array<number>, min: number, max: number, step: number): void {
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
    newPercentage = newPercentage.filter((item, index, array) => array.indexOf(item) === index);

    const scale = this.anchor.querySelector('.slider__scale') as HTMLElement;
    scale.innerHTML = '';

    Object.entries(newPercentage).forEach(([key, percentage]) => {
      const value = this.calculateValue(percentage, min, max, step);
      const scaleItemTemplate = `<div class="slider__scale-item ${this.classScaleItemVertical}">${value}</div>`;
      scale.insertAdjacentHTML('beforeend', scaleItemTemplate);

      const scaleItem = this.anchor.querySelectorAll('.slider__scale-item') as NodeListOf<
        HTMLElement
      >;

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
    this.bindScaleEvents();
  }

  private createHtml(anchor: HTMLElement): void {
    const scaleTemplate = `<div class="slider__scale ${this.classScaleVertical} ${this.classType}"></div>`;

    const slider = anchor.querySelector('.slider__main-wrapper') as HTMLElement;

    slider.insertAdjacentHTML('beforeend', scaleTemplate);

    if (this.type === SINGLE) {
      this.scaleSingle = anchor.querySelector('.slider__scale_single') as HTMLInputElement;
    }

    if (this.type === DOUBLE) {
      this.scaleDouble = anchor.querySelector('.slider__scale_double') as HTMLInputElement;
    }
  }

  private createClass(isVertical: boolean): void {
    this.classType = this.type === DOUBLE ? 'slider__scale_double' : 'slider__scale_single';
    this.classScaleVertical = isVertical ? 'slider__scale_vertical' : '';
    this.classScaleItemVertical = isVertical ? 'slider__scale-item_vertical' : '';
  }

  private calculateValue(percentage: number, min: number, max: number, step: number): number {
    let newValue = percentage;
    if (Number.isInteger(step)) {
      newValue = Math.round(((max - min) / 100) * percentage + min);
    } else {
      newValue = ((max - min) / 100) * percentage + min;
    }

    newValue = parseFloat(newValue.toFixed(2));

    return newValue;
  }

  private bindScaleEvents(): void {
    const scale = this.anchor.querySelector('.slider__scale') as HTMLInputElement;

    scale.addEventListener('click', this.scaleClick.bind(this));
  }

  private scaleClick(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    let element = event.target as HTMLElement;
    element = element.closest('.slider__scale-item') as HTMLElement;

    let percentage;
    let elementType = this.checkElementType(target);
    const data: { [k: string]: number | Constants } = {};

    if (this.view.config.isVertical) {
      percentage = element.offsetTop;
    } else {
      percentage = element.offsetLeft;
    }

    percentage = this.view.calcPercentage(percentage);
    elementType = this.view.checkRangeType(percentage, elementType);

    data[elementType] = percentage;
    data[TYPE] = elementType;

    this.view.notify(data);
  }

  private checkElementType(element: HTMLElement): Constants {
    let elementType;

    if (element === this.scaleSingle) elementType = SINGLE;
    if (element === this.scaleDouble) elementType = FROM;

    if (!elementType) throw new Error('elementType - не найдено');

    return elementType;
  }
}

export default Scale;
