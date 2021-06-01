import { Config, Coords, Shift, forMouse } from 'Helpers/interface';
import Constants from 'Helpers/enums';
import { PartialUI, IView } from './IView';
import SingleFactory from './Factories/SingleFactory';
import IntervalFactory from './Factories/IntervalFactory';
import Observable from '../Observable/Observable';

const { SINGLE, FROM, TO, DOUBLE, MIN, MAX, TYPE, INPUT } = Constants;

class View extends Observable implements IView {
  public UI: PartialUI = {};

  private factory?: SingleFactory | IntervalFactory;

  private slider!: HTMLElement;

  private single!: HTMLElement;

  private from!: HTMLElement;

  private to!: HTMLElement;

  private rangeMin!: HTMLInputElement;

  private rangeMax!: HTMLInputElement;

  private inputSingle!: HTMLInputElement;

  private inputFrom!: HTMLInputElement;

  private inputTo!: HTMLInputElement;

  private labelSingle!: HTMLInputElement;

  private labelFrom!: HTMLInputElement;

  private labelTo!: HTMLInputElement;

  private scale!: HTMLElement;

  private scaleDouble!: HTMLElement;

  private scaleSingle!: HTMLElement;

  private sliderSingle!: HTMLElement;

  private sliderDouble!: HTMLElement;

  constructor(public config: Config, private app: HTMLElement) {
    super();

    this.init();
  }

  public setConfig(option: Config): void {
    this.config = { ...this.config, ...option };
  }

  public checkElementType(element: HTMLElement): Constants {
    let elementType: Constants | undefined;
    const conditionFrom =
      element === this.from ||
      element === this.inputFrom ||
      element === this.sliderDouble ||
      element === this.scaleDouble ||
      element === this.labelFrom;
    const conditionTo =
      element === this.to ||
      element === this.inputTo ||
      element === this.labelTo;
    const conditionSingle =
      element === this.single ||
      element === this.inputSingle ||
      element === this.sliderSingle ||
      element === this.scaleSingle ||
      element === this.labelSingle;

    if (conditionFrom) {
      elementType = FROM;
    } else if (conditionTo) {
      elementType = TO;
    } else if (conditionSingle) {
      elementType = SINGLE;
    }

    if (!elementType) throw new Error('elementType - не найдено');

    return elementType;
  }

  public calcPercentage(left: number): number {
    let slider;

    if (this.config.isVertical) {
      slider = this.slider.offsetHeight;
    } else {
      slider = this.slider.offsetWidth - 10;
    }

    return (100 * left) / slider;
  }

  public getShift(event: MouseEvent, element: HTMLElement): Shift {
    const elemCoords = this.getCoords(element);

    return {
      x: event.pageX - elemCoords.left,
      y: event.pageY - elemCoords.top,
    };
  }

  public getNewShift(event: MouseEvent, shift: Shift): Shift {
    const sliderCoords = this.getCoords(this.slider);

    return {
      x: event.pageX - shift.x - sliderCoords.left,
      y: event.pageY - shift.y - sliderCoords.top,
    };
  }

  public getElement(elementType: Constants): HTMLInputElement {
    let element;

    if (elementType === MAX) {
      element = this.rangeMax;
    } else if (elementType === MIN) {
      element = this.rangeMin;
    }

    if (!element) throw new Error('element - не найдено');

    return element;
  }

  private init(): void {
    this.createFactory();
    this.getHtml();
    this.createElement();
    this.bindEvents();
  }

  private getCoords(element: HTMLElement): Coords {
    const box = element.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
    };
  }

  private bindHandleEvents(elementType: Constants): void {
    let element;

    if (elementType === SINGLE) {
      element = this.single;
    } else if (elementType === FROM) {
      element = this.from;
    } else if (elementType === TO) {
      element = this.to;
    }

    if (element === undefined) throw new Error('element не передан');

    element.addEventListener('mousedown', this.handleMouseDown.bind(this));
  }

  private bindWrapperEvents(): void {
    let element;

    if (this.config.type === SINGLE) {
      element = this.sliderSingle;
    } else if (this.config.type === DOUBLE) {
      element = this.sliderDouble;
    }

    if (element === undefined) throw new Error('element не передан');

    element.addEventListener('click', this.wrapperClick.bind(this));
  }

  private bindScaleEvents(): void {
    const element = this.scale;

    element.addEventListener('click', this.scaleClick.bind(this));
  }

  private bindInputEvents(elementType: Constants): void {
    let element;

    if (elementType === SINGLE) {
      element = this.inputSingle;
    } else if (elementType === FROM) {
      element = this.inputFrom;
    } else if (elementType === TO) {
      element = this.inputTo;
    }

    if (element === undefined) throw new Error('element не передан');

    element.addEventListener('change', this.inputOnChange.bind(this));
  }

  private bindRangeEvents(elementType: Constants): void {
    let element;

    if (elementType === MIN) {
      element = this.rangeMin;
    } else if (elementType === MAX) {
      element = this.rangeMax;
    }

    if (element === undefined) throw new Error('element не передан');

    element.addEventListener('change', this.rangeOnChange.bind(this));
  }

  private handleMouseDown(event: MouseEvent): void {
    const element = event.target as HTMLElement;
    const shift: Shift = this.getShift(event, element);

    const forMouseMove: forMouse = {
      shift,
      element,
    };

    const handleMouseMove = this.handleMouseMove.bind(this, forMouseMove);

    const onMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  private handleMouseMove(forMouseMove: forMouse, event: MouseEvent): void {
    let percentage;
    const elementType = this.checkElementType(forMouseMove.element);
    const newShift = this.getNewShift(event, forMouseMove.shift);
    const data: { [k: string]: number | Constants } = {};

    if (this.config.isVertical) {
      percentage = this.calcPercentage(newShift.y);
    } else {
      percentage = this.calcPercentage(newShift.x);
    }

    data[elementType] = percentage;
    data[TYPE] = elementType;

    this.notify(data);
    event.preventDefault();
  }

  private scaleClick(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    let element = event.target as HTMLElement;
    element = element.closest('.slider__scale-item') as HTMLElement;

    let percentage;
    let elementType = this.checkElementType(target);
    const data: { [k: string]: number | Constants } = {};

    if (this.config.isVertical) {
      percentage = element.offsetTop;
    } else {
      percentage = element.offsetLeft;
    }

    percentage = this.calcPercentage(percentage);
    elementType = this.checkRangeType(percentage, elementType);

    data[elementType] = percentage;
    data[TYPE] = elementType;

    this.notify(data);
  }

  private wrapperClick(event: MouseEvent): void {
    const element = event.currentTarget as HTMLElement;
    const newShift: Shift = this.getShift(event, element);

    let percentage: number;
    let elementType = this.checkElementType(element);
    const data: { [k: string]: number | Constants } = {};

    if (this.config.isVertical) {
      percentage = this.calcPercentage(newShift.y);
    } else {
      percentage = this.calcPercentage(newShift.x);
    }

    elementType = this.checkRangeType(percentage, elementType);

    data[elementType] = percentage;
    data[TYPE] = elementType;

    this.notify(data);
  }

  private rangeOnChange(event: Event): void {
    const element = event.target as HTMLInputElement;
    let min = Math.abs(parseFloat(this.getElement(MIN).value));
    let max = Math.abs(parseFloat(this.getElement(MAX).value));
    let data: { [k: string]: number } = {};

    if (Number.isNaN(min)) min = this.config.min;
    if (Number.isNaN(max)) max = this.config.max;

    if (element === this.getElement(MIN)) {
      data = { min };
    } else if (element === this.getElement(MAX)) {
      data = { max };
    }

    this.notify(data);
  }

  private inputOnChange(event: Event): void {
    const element = event.target as HTMLInputElement;
    const elementType = this.checkElementType(element) as
      | typeof FROM
      | typeof TO;
    const data: { [k: string]: number | boolean | Constants } = {};
    let value = parseFloat(element.value);
    if (Number.isNaN(value)) value = this.config[elementType];

    data[elementType] = value;
    data[TYPE] = elementType;
    data[INPUT] = true;

    this.notify(data);
  }

  private bindEvents() {
    if (this.config.type === SINGLE) {
      this.bindWrapperEvents();
      this.bindHandleEvents(SINGLE);
    } else {
      this.bindWrapperEvents();
      this.bindHandleEvents(FROM);
      this.bindHandleEvents(TO);
    }

    if (this.config.isInput) {
      if (this.config.type === SINGLE) {
        this.bindInputEvents(SINGLE);
      } else {
        this.bindInputEvents(FROM);
        this.bindInputEvents(TO);
      }
    }

    if (this.config.isRange) {
      this.bindRangeEvents(MIN);
      this.bindRangeEvents(MAX);
    }

    if (this.config.isScale) this.bindScaleEvents();
  }

  private checkRangeType(percentage: number, type: Constants): Constants {
    const range = this.config.percentTo - this.config.percentFrom;
    let elementType = type;

    if (elementType !== SINGLE) {
      if (percentage > this.config.percentFrom + range / 2) {
        elementType = TO;
      } else {
        elementType = FROM;
      }
    }

    return elementType;
  }

  private createFactory() {
    if (this.config.type === SINGLE) {
      this.factory = new SingleFactory();
    } else {
      this.factory = new IntervalFactory();
    }
  }

  private getHtml(): void {
    if (this.factory === undefined) {
      throw new Error('factory не передан');
    }

    this.factory.createTemplate(
      this.app,
      this.config.isVertical,
      this.config.type
    );
    this.UI.bar = this.factory.createBar(
      this.app,
      this.config.isVertical,
      this.config.type
    );
    this.UI.handle = this.factory.createHandle(
      this.app,
      this.config.isVertical
    );
    this.UI.scale = this.factory.createScale(
      this.app,
      this.config.isVertical,
      this.config.type
    );

    if (this.config.isLabel) {
      this.UI.label = this.factory.createLabel(
        this.app,
        this.config.isVertical
      );
    }

    if (this.config.isRange) {
      this.UI.range = this.factory.createRange(
        this.app,
        this.config.min,
        this.config.max
      );
    }

    if (this.config.isInput) {
      this.UI.input = this.factory.createInput(this.app);
    }
  }

  private createElement(): void {
    const slider = this.app.querySelector(
      '.slider__main-wrapper'
    ) as HTMLElement;

    this.slider = slider;

    if (this.config.type === SINGLE) {
      const single = this.app.querySelector(
        '.slider__handle_single'
      ) as HTMLElement;

      if (this.config.isLabel) {
        const labelSingle = this.app.querySelector(
          '.slider__label-text_single'
        ) as HTMLInputElement;

        this.labelSingle = labelSingle;
      }

      if (this.config.isScale) {
        const scale = this.app.querySelector(
          '.slider__scale'
        ) as HTMLInputElement;
        const scaleSingle = this.app.querySelector(
          '.slider__scale_single'
        ) as HTMLInputElement;

        this.scale = scale;
        this.scaleSingle = scaleSingle;
      }

      const inputSingle = this.app.querySelector(
        '.input__single'
      ) as HTMLInputElement;

      const sliderSingle = this.app.querySelector(
        '.slider__wrapper_single'
      ) as HTMLElement;

      this.inputSingle = inputSingle;
      this.single = single;
      this.sliderSingle = sliderSingle;
    } else if (this.config.type === DOUBLE) {
      const from = this.app.querySelector(
        '.slider__handle_from'
      ) as HTMLElement;
      const to = this.app.querySelector('.slider__handle_to') as HTMLElement;

      const inputFrom = this.app.querySelector(
        '.input__from'
      ) as HTMLInputElement;
      const inputTo = this.app.querySelector('.input__to') as HTMLInputElement;

      if (this.config.isLabel) {
        const labelFrom = this.app.querySelector(
          '.slider__label-text_from'
        ) as HTMLInputElement;
        const labelTo = this.app.querySelector(
          '.slider__label-text_to'
        ) as HTMLInputElement;

        this.labelFrom = labelFrom;
        this.labelTo = labelTo;
      }

      if (this.config.isScale) {
        const scale = this.app.querySelector(
          '.slider__scale'
        ) as HTMLInputElement;
        const scaleDouble = this.app.querySelector(
          '.slider__scale_double'
        ) as HTMLInputElement;

        this.scale = scale;
        this.scaleDouble = scaleDouble;
      }

      const sliderDouble = this.app.querySelector(
        '.slider__wrapper_double'
      ) as HTMLElement;

      this.sliderDouble = sliderDouble;
      this.inputFrom = inputFrom;
      this.inputTo = inputTo;
      this.from = from;
      this.to = to;
    }

    if (this.config.isRange) {
      const rangeMin = this.app.querySelector(
        '.slider__range-min'
      ) as HTMLInputElement;
      const rangeMax = this.app.querySelector(
        '.slider__range-max'
      ) as HTMLInputElement;

      this.rangeMin = rangeMin;
      this.rangeMax = rangeMax;
    }
  }
}

export default View;
