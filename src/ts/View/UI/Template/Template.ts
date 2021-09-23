import { boundMethod } from 'autobind-decorator';

import { IShift, TypeSlider } from 'Helpers/interface';
import Constants from 'Helpers/enums';
import { IView } from 'Ts/View/IView';

const { SINGLE, DOUBLE, FROM, ELEMENTTYPE } = Constants;

class Template {
  private classWrapperMainVertical?: string;

  private classWrapperVertical?: string;

  private classWrapperSingle?: string;

  private classWrapperDouble?: string;

  private sliderSingle!: HTMLElement;

  private sliderDouble!: HTMLElement;

  constructor(
    private anchor: HTMLElement,
    private isVertical: boolean,
    private type: TypeSlider,
    private view: IView
  ) {
    this.init();
  }

  private init() {
    this.createClass(this.isVertical, this.type);
    this.createHtml(this.anchor);
    this.addEventHandlersWrapper();
  }

  private createHtml(anchor: HTMLElement): void {
    const sliderTemplate = `
    <div class="slider__main-wrapper ${this.classWrapperMainVertical}">
      <div class="slider__wrapper ${this.classWrapperVertical} ${this.classWrapperSingle} ${this.classWrapperDouble}">
      </div>
    </div>`;

    anchor.insertAdjacentHTML('afterbegin', sliderTemplate);

    if (this.type === SINGLE) {
      const sliderSingle = this.anchor.querySelector<HTMLElement>('.slider__wrapper_single');

      if (!sliderSingle) throw new Error('sliderSingle - не найдено');

      this.sliderSingle = sliderSingle;
    }

    if (this.type === DOUBLE) {
      const sliderDouble = this.anchor.querySelector<HTMLElement>('.slider__wrapper_double');

      if (!sliderDouble) throw new Error('sliderDouble - не найдено');

      this.sliderDouble = sliderDouble;
    }
  }

  private createClass(isVertical: boolean, type: TypeSlider): void {
    this.classWrapperMainVertical = isVertical ? 'slider__main-wrapper_vertical' : '';
    this.classWrapperVertical = isVertical ? 'slider__wrapper_vertical' : '';
    this.classWrapperSingle = type === SINGLE ? 'slider__wrapper_single' : '';
    this.classWrapperDouble = type === DOUBLE ? 'slider__wrapper_double' : '';
  }

  private addEventHandlersWrapper(): void {
    let slider;

    if (this.type === SINGLE) slider = this.sliderSingle;
    if (this.type === DOUBLE) slider = this.sliderDouble;

    if (slider === undefined) throw new Error('element не передан');

    slider.addEventListener('click', this.wrapperClick);
  }

  @boundMethod
  private wrapperClick(event: MouseEvent): void {
    const element = event.currentTarget;
    if (!(element instanceof HTMLElement)) return;
    const newShift: IShift = this.view.getShift(event, element);

    let percentage: number;
    let elementType = this.validateElementType(element);
    const data: { [k: string]: number | Constants } = {};

    if (this.isVertical) {
      percentage = this.view.calcPercentage(newShift.y);
    } else {
      percentage = this.view.calcPercentage(newShift.x);
    }

    elementType = this.view.validateRangeType(percentage, elementType);

    data[elementType] = percentage;
    data[ELEMENTTYPE] = elementType;

    this.view.notify(data);
  }

  private validateElementType(element: HTMLElement): Constants {
    let elementType;

    if (element === this.sliderSingle) elementType = SINGLE;
    if (element === this.sliderDouble) elementType = FROM;

    if (!elementType) throw new Error('elementType - не найдено');

    return elementType;
  }
}

export default Template;
