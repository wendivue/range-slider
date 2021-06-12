import { boundMethod } from 'autobind-decorator';

import { TypeSlider } from 'Helpers/interface';
import Constants from 'Helpers/enums';
import { IView } from 'Ts/View/IView';
import { IScale } from './IScale';

const { DOUBLE, SINGLE, FROM, ELEMENTTYPE } = Constants;

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

    let lastNumberArray = newPercentage.pop();
    const stepPercentage = (100 * step) / (max - min);

    if (!lastNumberArray) throw new Error('lastNumberArray - не найдено');

    if (lastNumberArray >= 100) {
      lastNumberArray = newPercentage.pop();
      if (!lastNumberArray) throw new Error('lastNumberArray - не найдено');
    }

    if (stepPercentage <= 100 - lastNumberArray && stepPercentage > 10) {
      newPercentage = [...newPercentage, lastNumberArray];
    }

    newPercentage = [0, ...newPercentage, 100];
    newPercentage = newPercentage.filter((item, index, array) => array.indexOf(item) === index);

    const scale = this.anchor.querySelector<HTMLElement>('.slider__scale');

    if (!scale) throw new Error('scale - не найдено');

    scale.innerHTML = '';

    Object.entries(newPercentage).forEach(([key, percentage]) => {
      const value = this.calculateValue(percentage, min, max, step);
      const scaleItemTemplate = `<div class="slider__scale-item ${this.classScaleItemVertical}">${value}</div>`;
      scale.insertAdjacentHTML('beforeend', scaleItemTemplate);

      const scaleItem: NodeListOf<HTMLElement> = this.anchor.querySelectorAll(
        '.slider__scale-item'
      );

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

    const slider = anchor.querySelector<HTMLElement>('.slider__main-wrapper');

    if (!slider) throw new Error('slider - не найдено');

    slider.insertAdjacentHTML('beforeend', scaleTemplate);

    if (this.type === SINGLE) {
      const scaleSingle = anchor.querySelector<HTMLInputElement>('.slider__scale_single');

      if (!scaleSingle) throw new Error('scaleSingle - не найдено');

      this.scaleSingle = scaleSingle;
    }

    if (this.type === DOUBLE) {
      const scaleDouble = anchor.querySelector<HTMLInputElement>('.slider__scale_double');

      if (!scaleDouble) throw new Error('scaleDouble - не найдено');

      this.scaleDouble = scaleDouble;
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
    const scale = this.anchor.querySelector<HTMLInputElement>('.slider__scale');

    if (!scale) throw new Error('scaleDouble - не найдено');

    scale.addEventListener('click', this.scaleClick);
  }

  @boundMethod
  private scaleClick(event: MouseEvent): void {
    const target = event.currentTarget;
    let element = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (!(element instanceof HTMLElement)) return;
    element = element.closest('.slider__scale-item');
    if (!(element instanceof HTMLElement)) return;

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
    data[ELEMENTTYPE] = elementType;

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
