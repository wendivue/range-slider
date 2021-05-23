import { Config, Coords, Shift, methodsViewFactory } from 'Helpers/interface';
import Constants from 'Helpers/enums';
import SingleFactory from './Factories/SingleFactory';
import IntervalFactory from './Factories/IntervalFactory';

const { SINGLE, FROM, TO, DOUBLE } = Constants;

class View {
  public factory?: SingleFactory | IntervalFactory;

  public slider!: HTMLElement;

  public bar!: HTMLElement;

  public single!: HTMLElement;

  public from!: HTMLElement;

  public to!: HTMLElement;

  public handle!: HTMLElement;

  public rangeMin!: HTMLInputElement;

  public rangeMax!: HTMLInputElement;

  public inputSingle!: HTMLInputElement;

  public inputFrom!: HTMLInputElement;

  public inputTo!: HTMLInputElement;

  public labelSingle!: HTMLInputElement;

  public labelFrom!: HTMLInputElement;

  public labelTo!: HTMLInputElement;

  public sliderSingle!: HTMLElement;

  public sliderDouble!: HTMLElement;

  public factoryBar?: methodsViewFactory;

  public factoryHandle?: methodsViewFactory;

  public factoryLabel?: methodsViewFactory;

  public factoryInput?: methodsViewFactory;

  constructor(public config: Config, public app: HTMLElement) {
    this.init();
  }

  private init(): void {
    this.createFactory();
    this.getHtml();
    this.getElement();
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
    this.factoryBar = this.factory.createBar(
      this.app,
      this.config.isVertical,
      this.config.type
    );
    this.factoryHandle = this.factory.createHandle(
      this.app,
      this.config.isVertical
    );

    if (this.config.isLabel) {
      this.factoryLabel = this.factory.createLabel(this.app);
    }

    if (this.config.isRange) {
      this.factory.createRange(this.app, this.config.min, this.config.max);
    }

    if (this.config.isInput) {
      this.factoryInput = this.factory.createInput(this.app);
    }
  }

  private getElement(): void {
    const slider = this.app.querySelector('.slider__wrapper') as HTMLElement;
    const bar = this.app.querySelector('.slider__bar') as HTMLElement;
    const handle = this.app.querySelector('.slider__handle') as HTMLElement;

    this.slider = slider;
    this.bar = bar;
    this.handle = handle;

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

  private createFactory() {
    if (this.config.type === SINGLE) {
      this.factory = new SingleFactory();
    } else {
      this.factory = new IntervalFactory();
    }
  }

  public checkElementType(element: HTMLElement): Constants {
    let elementType: Constants | undefined;
    if (
      element === this.from ||
      element === this.inputFrom ||
      element === this.sliderDouble
    ) {
      elementType = FROM;
    } else if (element === this.to || element === this.inputTo) {
      elementType = TO;
    } else if (
      element === this.single ||
      element === this.inputSingle ||
      element === this.sliderSingle
    ) {
      elementType = SINGLE;
    }

    if (!elementType) throw new Error('elementType - не найдено');

    return elementType;
  }

  public moveElement(percentage: number, elementType?: string): void {
    if (
      this.factoryHandle === undefined ||
      this.factoryHandle.moveElement === undefined
    ) {
      throw new Error('moveElement не передан');
    }

    this.factoryHandle.moveElement(percentage, elementType);
  }

  public changeBar(from: number, to?: number): void {
    if (
      this.factoryBar === undefined ||
      this.factoryBar.changeBar === undefined
    ) {
      throw new Error('changeBar не передан');
    }

    this.factoryBar.changeBar(from, to);
  }

  public changeLabelValue(fromValue: string, toValue?: string): void {
    if (
      this.factoryLabel === undefined ||
      this.factoryLabel.changeLabelValue === undefined
    ) {
      throw new Error('changeLabelValue не передан');
    }

    this.factoryLabel.changeLabelValue(fromValue, toValue);
  }

  public changeValue(fromValue: string, toValue?: string): void {
    if (
      this.factoryInput === undefined ||
      this.factoryInput.changeValue === undefined
    ) {
      throw new Error('changeValue не передан');
    }

    this.factoryInput.changeValue(fromValue, toValue);
  }

  public calcPercentage(left: number): number {
    let slider;

    if (this.config.isVertical) {
      slider = this.slider.offsetHeight;
    } else {
      slider = this.slider.offsetWidth;
    }

    return (100 * left) / slider;
  }

  private getCoords(element: HTMLElement): Coords {
    const box = element.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
    };
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
}

export default View;
