import { SINGLE, FROM, TO } from '../helpers/constants';
import { Config, Coords, Shift } from '../helpers/interface';

class View {
  public options: Config;

  public config: Config;

  public app: HTMLElement;

  public slider: HTMLElement;

  public between: HTMLElement;

  public single: HTMLElement;

  public from: HTMLElement;

  public to: HTMLElement;

  public rangeMin: HTMLInputElement;

  public rangeMax: HTMLInputElement;

  public inputSingle: HTMLInputElement;

  public inputFrom: HTMLInputElement;

  public inputTo: HTMLInputElement;

  public labelSingle: HTMLInputElement;

  public labelFrom: HTMLInputElement;

  public labelTo: HTMLInputElement;

  private base: string;

  private baseInput: string;

  private baseInputSingle: string;

  private baseThumb: string;

  private baseRangeMin: string;

  private baseRangeMax: string;

  private doubleHtml: string;

  private singleHtml: string;

  private classWrapperVertical: string;

  private classTumbrVertical: string;

  private classBetweenVertical: string;

  private classTumbrToVertical: string;

  private classBetweenSingle: string;

  private classTumbrSingleVertical: string;

  private idSlider: string;

  private idBetween: string;

  private idSingle: string;

  private idFrom: string;

  private idTo: string;

  private idInputSingle: string;

  private idInputFrom: string;

  private idInputTo: string;

  private idRangeMin: string;

  private idRangeMax: string;

  private idLabelSingle: string;

  private idLabelFrom: string;

  private idLabelTo: string;

  constructor(options: Config, id: string) {
    this.config = options;

    this.getListId(id);
    this.app = document.getElementById(id);
    this.getHtml();

    this.init(this.base);
    this.getElement(
      this.idSlider,
      this.idBetween,
      this.idSingle,
      this.idFrom,
      this.idTo,
      this.idInputSingle,
      this.idInputFrom,
      this.idInputTo,
      this.idRangeMin,
      this.idRangeMax,
      this.idLabelSingle,
      this.idLabelFrom,
      this.idLabelTo
    );
  }

  public init(html: string): void {
    this.app.innerHTML = html;
  }

  public getHtml(): void {
    if (this.config.vertical) {
      this.classWrapperVertical = 'slider__wrapper--vertical';
      this.classTumbrVertical = 'thumb--vertical';
      this.classTumbrToVertical = 'thumb__to--vertical';
      this.classTumbrSingleVertical = 'thumb__single--vertical';
      this.classBetweenVertical = 'slider__between--vertical';
    } else {
      this.classWrapperVertical = '';
      this.classTumbrVertical = '';
      this.classTumbrToVertical = '';
      this.classTumbrSingleVertical = '';
      this.classBetweenVertical = '';
    }

    if (this.config.type === SINGLE) {
      this.classBetweenSingle = 'slider__between--single';
    } else {
      this.classBetweenSingle = '';
    }

    this.doubleHtml =
      `<div id="${this.idFrom}" class="thumb thumb__from ${this.classTumbrVertical}">` +
      '<div class="thumb__label">' +
      `<div id="${this.idLabelFrom}" class="thumb__label-text"></div>` +
      '</div>' +
      '</div>' +
      `<div id="${this.idTo}" class="thumb thumb__to ${this.classTumbrVertical} ${this.classTumbrToVertical}">` +
      '<div class="thumb__label">' +
      `<div id="${this.idLabelTo}" class="thumb__label-text"></div>` +
      '</div>' +
      '</div>';

    this.singleHtml =
      `<div id="${this.idSingle}" class="thumb thumb__single ${this.classTumbrVertical} ${this.classTumbrSingleVertical}">` +
      '<div class="thumb__label">' +
      `<div id="${this.idLabelSingle}" class="thumb__label-text"></div>` +
      '</div>' +
      '</div>';

    this.baseInput =
      `<input id="${this.idInputFrom}" type="text" class="input">` +
      `<input id="${this.idInputTo}" type="text" class="input">`;

    this.baseInputSingle = `<input id="${this.idInputSingle}" type="text" class="input">`;

    this.baseRangeMin = `<input type="text" id="${this.idRangeMin}" class="slider__range" value="${this.config.min}" >`;
    this.baseRangeMax = `<input type="text" id="${this.idRangeMax}" class="slider__range" value="${this.config.max}" >`;

    if (this.config.type === 'single') {
      this.baseThumb = this.singleHtml;
    } else if (this.config.type === 'double') {
      this.baseThumb = this.doubleHtml;
    }

    this.base = `${
      `<div id="${this.idSlider}" class="slider__wrapper ${this.classWrapperVertical}" >` +
      `<div id="${this.idBetween}" class="slider__between ${this.classBetweenSingle} ${this.classBetweenVertical}"></div>`
    }${this.baseThumb}</div>`;

    if (this.config.range) {
      this.base = this.baseRangeMin + this.base + this.baseRangeMax;
    }

    if (this.config.input) {
      if (this.config.type === SINGLE) {
        this.base += this.baseInputSingle;
      } else {
        this.base += this.baseInput;
      }
    }
  }

  public getId(id: string): string {
    return `${Math.floor(Math.random() * 1e8).toString(16) + id}`;
  }

  public getListId(id: string): void {
    this.idSlider = this.getId(id);
    this.idBetween = this.getId(id);
    this.idSingle = this.getId(id);
    this.idFrom = this.getId(id);
    this.idTo = this.getId(id);
    this.idInputSingle = this.getId(id);
    this.idInputFrom = this.getId(id);
    this.idInputTo = this.getId(id);
    this.idRangeMin = this.getId(id);
    this.idRangeMax = this.getId(id);
    this.idLabelSingle = this.getId(id);
    this.idLabelFrom = this.getId(id);
    this.idLabelTo = this.getId(id);
  }

  public getElement(
    slider: string,
    between: string,
    single: string,
    from: string,
    to: string,
    inputSingle: string,
    inputFrom: string,
    inputTo: string,
    rangeMin: string,
    rangeMax: string,
    labelSingle: string,
    labelTo: string,
    labelFrom: string
  ): void {
    this.slider = document.getElementById(slider);
    this.between = document.getElementById(between);
    this.single = document.getElementById(single);
    this.from = document.getElementById(from);
    this.to = document.getElementById(to);
    this.inputSingle = <HTMLInputElement>document.getElementById(inputSingle);
    this.inputFrom = <HTMLInputElement>document.getElementById(inputFrom);
    this.inputTo = <HTMLInputElement>document.getElementById(inputTo);
    this.rangeMin = <HTMLInputElement>document.getElementById(rangeMin);
    this.rangeMax = <HTMLInputElement>document.getElementById(rangeMax);
    this.labelSingle = <HTMLInputElement>document.getElementById(labelSingle);
    this.labelFrom = <HTMLInputElement>document.getElementById(labelFrom);
    this.labelTo = <HTMLInputElement>document.getElementById(labelTo);
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

  public changeBetween(from: number, to: number): void {
    if (this.config.vertical) {
      if (this.config.type === SINGLE) {
        this.between.style.height = `${from}%`;
      } else {
        this.between.style.height = `${to - from}%`;
        this.between.style.top = `${from}%`;
      }
    } else if (this.config.type === SINGLE) {
      this.between.style.width = `${from}%`;
    } else {
      this.between.style.width = `${to - from}%`;
      this.between.style.left = `${from}%`;
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
