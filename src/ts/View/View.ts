import { SINGLE, FROM, TO } from '../helpers/constants';
import { Config, Coords, Shift } from '../helpers/interface';
import SingleFactory from './Factories/SingleFactory';
import IntervalFactory from './Factories/IntervalFactory';

class View {
  public factory: any;

  public options: Config;

  public config: Config;

  public app: HTMLElement;

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

  constructor(options: Config, id: string) {
    this.config = options;

    if (this.config.type === SINGLE) {
      this.factory = new SingleFactory();
    } else {
      this.factory = new IntervalFactory();
    }

    this.app = document.getElementById(id);
    this.getHtml();

    this.getElement();
  }

  public init(html: string): void {
    this.app.insertAdjacentHTML('afterbegin', html);
  }

  public getHtml(): void {
    this.factory.createTemplate(this.app, this.config.vertical);
    this.factory.createBar(this.app, this.config.vertical, this.config.type);
    this.factory.createHandle(this.app, this.config.vertical);
    this.factory.createLabel(this.app);
    this.factory.createRange(this.app, this.config.min, this.config.max);
    this.factory.createInput(this.app);
  }

  public getElement(): void {
    this.slider = this.app.querySelector('.slider__wrapper');
    this.bar = this.app.querySelector('.slider__bar');
    this.single = this.app.querySelector('.slider__handle--single');
    this.from = this.app.querySelector('.slider__handle--from');
    this.to = this.app.querySelector('.slider__handle--to');
    this.handle = this.app.querySelector('.slider__handle');
    this.labelSingle = this.app.querySelector('.slider__label-text--single');
    this.labelFrom = this.app.querySelector('.slider__label-text--from');
    this.labelTo = this.app.querySelector('.slider__label-text--to');
    this.inputSingle = this.app.querySelector('.input__single');
    this.inputFrom = this.app.querySelector('.input__from');
    this.inputTo = this.app.querySelector('.input__to');
    this.rangeMin = this.app.querySelector('.slider__range-min');
    this.rangeMax = this.app.querySelector('.slider__range-max');
  }

  public checkElementType(element: HTMLElement): string {
    let elementType: string;
    if (element === this.from || element === this.inputFrom) {
      elementType = FROM;
    } else if (element === this.to || element === this.inputTo) {
      elementType = TO;
    } else if (element === this.single || element === this.inputSingle) {
      elementType = SINGLE;
    }
    return elementType;
  }

  public moveElement(percentage: number, elementType: string): void {
    if (this.config.vertical) {
      if (elementType === FROM) {
        this.from.style.top = `${percentage}%`;
      } else if (elementType === TO) {
        this.to.style.top = `${percentage}%`;
      } else if (elementType === SINGLE) {
        this.single.style.top = `${percentage}%`;
      }
    } else if (elementType === FROM) {
      this.from.style.left = `${percentage}%`;
    } else if (elementType === TO) {
      this.to.style.left = `${percentage}%`;
    } else if (elementType === SINGLE) {
      this.single.style.left = `${percentage}%`;
    }
  }

  public changeBar(from: number, to: number): void {
    if (this.config.vertical) {
      if (this.config.type === SINGLE) {
        this.bar.style.height = `${from}%`;
      } else {
        this.bar.style.height = `${to - from}%`;
        this.bar.style.top = `${from}%`;
      }
    } else if (this.config.type === SINGLE) {
      this.bar.style.width = `${from}%`;
    } else {
      this.bar.style.width = `${to - from}%`;
      this.bar.style.left = `${from}%`;
    }
  }

  public changeLabelValue(fromValue: string, toValue?: string): void {
    if (this.config.type === SINGLE) {
      this.labelSingle.innerHTML = fromValue;
    } else {
      this.labelFrom.innerHTML = fromValue;
      this.labelTo.innerHTML = toValue;
    }
  }

  public changeValue(fromValue: string, toValue?: string): void {
    if (this.config.type === SINGLE) {
      this.inputSingle.value = fromValue;
    } else {
      this.inputFrom.value = fromValue;
      this.inputTo.value = toValue;
    }
  }

  public getCoords(element: HTMLElement): Coords {
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
