import { SINGLE, FROM, TO } from './utils';
import { Config, Coords } from './interface';

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
  private base_input: string;
  private base_input_single: string;
  private base_thumb: string;
  private range_min: string;
  private range_max: string;
  private double_html: string;
  private single_html: string;

  private id_slider: string;
  private id_between: string;
  private id_single: string;
  private id_from: string;
  private id_to: string;
  private id_inputSingle: string;
  private id_inputFrom: string;
  private id_inputTo: string;
  private id_rangeMin: string;
  private id_rangeMax: string;
  private id_labelSingle: string;
  private id_labelFrom: string;
  private id_labelTo: string;

  constructor(options: Config, id: string) {
    this.getDefaultConfig();

    this.options = options;
    this.config = { ...this.config, ...this.options };

    this.id_slider = this.getId(id);
    this.id_between = this.getId(id);
    this.id_single = this.getId(id);
    this.id_from = this.getId(id);
    this.id_to = this.getId(id);
    this.id_inputSingle = this.getId(id);
    this.id_inputFrom = this.getId(id);
    this.id_inputTo = this.getId(id);
    this.id_rangeMin = this.getId(id);
    this.id_rangeMax = this.getId(id);
    this.id_labelSingle = this.getId(id);
    this.id_labelFrom = this.getId(id);
    this.id_labelTo = this.getId(id);

    this.app = document.getElementById(id);
    this.getHtml();

    this.init(this.base);
    this.getElement(
      this.id_slider,
      this.id_between,
      this.id_single,
      this.id_from,
      this.id_to,
      this.id_inputSingle,
      this.id_inputFrom,
      this.id_inputTo,
      this.id_rangeMin,
      this.id_rangeMax,
      this.id_labelSingle,
      this.id_labelFrom,
      this.id_labelTo
    );
  }

  init(html: string): void {
    this.app.innerHTML = html;
  }

  getHtml(): void {
    this.double_html =
      `<div id="${this.id_from}" class="thumb thumb__from">` +
      '<div class="thumb__label">' +
      `<div id="${this.id_labelFrom}" class="thumb__label-text"></div>` +
      '</div>' +
      '</div>' +
      `<div id="${this.id_to}" class="thumb thumb__to">` +
      '<div class="thumb__label">' +
      `<div id="${this.id_labelTo}" class="thumb__label-text"></div>` +
      '</div>' +
      '</div>';

    this.single_html =
      `<div id="${this.id_single}" class="thumb thumb__single">` +
      '<div class="thumb__label">' +
      `<div id="${this.id_labelSingle}" class="thumb__label-text"></div>` +
      '</div>' +
      '</div>';

    this.base_input =
      `<input id="${this.id_inputFrom}" type="text" class="input">` +
      `<input id="${this.id_inputTo}" type="text" class="input">`;

    this.base_input_single = `<input id="${this.id_inputSingle}" type="text" class="input">`;

    this.range_min = `<input type="text" id="${this.id_rangeMin}" class="slider__range" value="${this.config.min}" >`;
    this.range_max = `<input type="text" id="${this.id_rangeMax}" class="slider__range" value="${this.config.max}" >`;

    if (this.config.type === 'single') {
      this.base_thumb = this.single_html;
    } else if (this.config.type === 'double') {
      this.base_thumb = this.double_html;
    }

    this.base =
      `<div id="${this.id_slider}" class="slider__wrapper" >` +
      `<div id="${this.id_between}" class="slider__between slider__between--single"></div>` +
      this.base_thumb +
      '</div>';

    if (this.config.range) {
      this.base = this.range_min + this.base + this.range_max;
    }

    if (this.config.input) {
      if (this.config.type === SINGLE) {
        this.base += this.base_input_single;
      } else {
        this.base += this.base_input;
      }
    }
  }

  getId(id: string): string {
    return `${(~~(Math.random() * 1e8)).toString(16) + id}`;
  }

  getElement(
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

  getDefaultConfig(): Config {
    return (this.config = {
      min: 0,
      max: 1000,
      type: 'double',
      input: true,
      range: true,
    });
  }

  checkElementType(element: HTMLElement): string {
    let elementType: string;
    if (element == this.from) {
      elementType = FROM;
    } else if (element == this.to) {
      elementType = TO;
    } else if (element == this.single) {
      elementType = SINGLE;
    }
    return elementType;
  }

  moveElement(percentage: number, elementType: string): void {
    if (elementType === FROM) {
      this.from.style.left = percentage + '%';
    } else if (elementType === TO) {
      this.to.style.left = percentage + '%';
    } else if (elementType === SINGLE) {
      this.single.style.left = percentage + '%';
    }
  }

  changeBetween(from: number, to?: number): void {
    if (this.config.type === SINGLE) {
      this.between.style.width = from + 1 + '%';
      this.between.style.left = -1.3 + '%';
    } else {
      if (from > to) {
        this.between.style.width = from - to + '%';
        this.between.style.left = to + '%';
      } else {
        this.between.style.width = to - from + '%';
        this.between.style.left = from + '%';
      }
    }
  }

  changeLabelValue(fromValue: string, toValue?: string): void {
    if (this.config.type === SINGLE) {
      this.labelSingle.innerHTML = fromValue;
    } else {
      this.labelFrom.innerHTML = fromValue;
      this.labelTo.innerHTML = toValue;
    }
  }

  changeValue(fromValue: string, toValue?: string): void {
    if (this.config.type === SINGLE) {
      this.inputSingle.value = fromValue;
    } else {
      this.inputFrom.value = fromValue;
      this.inputTo.value = toValue;
    }
  }

  changeRange(element: HTMLElement): void {
    if (element === this.rangeMin) {
      this.config.min = parseInt(this.rangeMin.value);
    } else if (element === this.rangeMax) {
      this.config.max = parseInt(this.rangeMax.value);
    }
  }

  getCoords(element: HTMLElement): Coords {
    const box = element.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
    };
  }

  setCoords(): Array<Coords> {
    const sliderCoords = this.getCoords(this.slider);
    if (this.config.type === SINGLE) {
      const singleCoords = this.getCoords(this.single);
      return [sliderCoords, singleCoords];
    } else {
      const fromCoords = this.getCoords(this.from);
      const toCoords = this.getCoords(this.to);
      return [sliderCoords, fromCoords, toCoords];
    }
  }
}

export default View;
