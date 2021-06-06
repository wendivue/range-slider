import { IShift, TypeSlider } from 'Helpers/interface';
import Constants from 'Helpers/enums';
import { IView } from 'Ts/View/IView';

const { SINGLE, DOUBLE, FROM, TYPE } = Constants;

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
    this.bindWrapperEvents();
  }

  private createHtml(anchor: HTMLElement): void {
    const sliderTemplate = `
    <div class="slider__main-wrapper ${this.classWrapperMainVertical}">
      <div class="slider__wrapper ${this.classWrapperVertical} ${this.classWrapperSingle} ${this.classWrapperDouble}">
      </div>
    </div>`;

    anchor.insertAdjacentHTML('afterbegin', sliderTemplate);

    if (this.type === SINGLE)
      this.sliderSingle = this.anchor.querySelector('.slider__wrapper_single') as HTMLElement;

    if (this.type === DOUBLE)
      this.sliderDouble = this.anchor.querySelector('.slider__wrapper_double') as HTMLElement;
  }

  private createClass(isVertical: boolean, type: TypeSlider): void {
    this.classWrapperMainVertical = isVertical ? 'slider__main-wrapper_vertical' : '';
    this.classWrapperVertical = isVertical ? 'slider__wrapper_vertical' : '';
    this.classWrapperSingle = type === SINGLE ? 'slider__wrapper_single' : '';
    this.classWrapperDouble = type === DOUBLE ? 'slider__wrapper_double' : '';
  }

  private bindWrapperEvents(): void {
    let slider;

    if (this.type === SINGLE) slider = this.sliderSingle;
    if (this.type === DOUBLE) slider = this.sliderDouble;

    if (slider === undefined) throw new Error('element не передан');

    slider.addEventListener('click', this.wrapperClick.bind(this));
  }

  private wrapperClick(event: MouseEvent): void {
    const element = event.currentTarget as HTMLElement;
    const newShift: IShift = this.view.getShift(event, element);

    let percentage: number;
    let elementType = this.checkElementType(element);
    const data: { [k: string]: number | Constants } = {};

    if (this.isVertical) {
      percentage = this.view.calcPercentage(newShift.y);
    } else {
      percentage = this.view.calcPercentage(newShift.x);
    }

    elementType = this.view.checkRangeType(percentage, elementType);

    data[elementType] = percentage;
    data[TYPE] = elementType;

    this.view.notify(data);
  }

  private checkElementType(element: HTMLElement): Constants {
    let elementType;

    if (element === this.sliderSingle) elementType = SINGLE;
    if (element === this.sliderDouble) elementType = FROM;

    if (!elementType) throw new Error('elementType - не найдено');

    return elementType;
  }
}

export default Template;
