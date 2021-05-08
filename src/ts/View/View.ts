import { Config, Coords, Shift, methodsViewFactory } from 'Helpers/interface';
import Constants from 'Helpers/enums';
import SingleFactory from './Factories/SingleFactory';
import IntervalFactory from './Factories/IntervalFactory';

const { SINGLE, FROM, TO } = Constants;

class View {
  public factory: SingleFactory | IntervalFactory;

  public slider: HTMLElement;

  public bar: HTMLElement;

  public single: HTMLElement;

  public from: HTMLElement;

  public to: HTMLElement;

  public handle: HTMLElement;

  public rangeMin: HTMLInputElement;

  public rangeMax: HTMLInputElement;

  public inputSingle: HTMLInputElement;

  public inputFrom: HTMLInputElement;

  public inputTo: HTMLInputElement;

  public labelSingle: HTMLInputElement;

  public labelFrom: HTMLInputElement;

  public labelTo: HTMLInputElement;

  private factoryBar: methodsViewFactory;

  private factoryHandle: methodsViewFactory;

  private factoryLabel: methodsViewFactory;

  private factoryInput: methodsViewFactory;

  constructor(public config: Config, public app: HTMLElement) {
    this.init();
  }

  private init(): void {
    this.createFactory();
    this.getHtml();
    this.getElement();
  }

  private getHtml(): void {
    this.factory.createTemplate(this.app, this.config.isVertical);
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
    this.slider = this.app.querySelector('.slider__wrapper');
    this.bar = this.app.querySelector('.slider__bar');
    this.single = this.app.querySelector('.slider__handle_single');
    this.from = this.app.querySelector('.slider__handle_from');
    this.to = this.app.querySelector('.slider__handle_to');
    this.handle = this.app.querySelector('.slider__handle');
    this.labelSingle = this.app.querySelector('.slider__label-text_single');
    this.labelFrom = this.app.querySelector('.slider__label-text_from');
    this.labelTo = this.app.querySelector('.slider__label-text_to');
    this.inputSingle = this.app.querySelector('.input__single');
    this.inputFrom = this.app.querySelector('.input__from');
    this.inputTo = this.app.querySelector('.input__to');
    this.rangeMin = this.app.querySelector('.slider__range-min');
    this.rangeMax = this.app.querySelector('.slider__range-max');
  }

  private createFactory() {
    if (this.config.type === SINGLE) {
      this.factory = new SingleFactory();
    } else {
      this.factory = new IntervalFactory();
    }
  }

  public checkElementType(element: HTMLElement): Constants {
    let elementType: Constants;
    if (element === this.from || element === this.inputFrom) {
      elementType = FROM;
    } else if (element === this.to || element === this.inputTo) {
      elementType = TO;
    } else if (element === this.single || element === this.inputSingle) {
      elementType = SINGLE;
    }
    return elementType;
  }

  public moveElement(percentage: number, elementType?: string): void {
    this.factoryHandle.moveElement(percentage, elementType);
  }

  public changeBar(from: number, to?: number): void {
    this.factoryBar.changeBar(from, to);
  }

  public changeLabelValue(fromValue: string, toValue?: string): void {
    this.factoryLabel.changeLabelValue(fromValue, toValue);
  }

  public changeValue(fromValue: string, toValue?: string): void {
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
      top: box.top,
      left: box.left,
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
