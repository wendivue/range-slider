import { IConfig, ICoords, IShift, PartialConfig, IConfigWithArrayStep } from 'Helpers/interface';
import Constants from 'Helpers/enums';
import Observable from 'Ts/Observable/Observable';
import { PartialUI, IView } from './IView';
import SingleFactory from './Factories/SingleFactory';
import IntervalFactory from './Factories/IntervalFactory';

const { SINGLE, FROM, TO, DOUBLE } = Constants;

class View extends Observable implements IView {
  public UI: PartialUI = {};

  private factory!: SingleFactory | IntervalFactory;

  private slider!: HTMLElement;

  constructor(public config: IConfig, private app: HTMLElement) {
    super();

    this.init();
  }

  public setConfig(option: PartialConfig): void {
    this.config = { ...this.config, ...option };
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

  public getShift(event: MouseEvent | PointerEvent, element: HTMLElement): IShift {
    const elemCoords = this.getCoords(element);

    return {
      x: event.pageX - elemCoords.left,
      y: event.pageY - elemCoords.top,
    };
  }

  public getNewShift(event: MouseEvent | PointerEvent, shift: IShift): IShift {
    const sliderCoords = this.getCoords(this.slider);

    return {
      x: event.pageX - shift.x - sliderCoords.left,
      y: event.pageY - shift.y - sliderCoords.top,
    };
  }

  public updateView(data: IConfigWithArrayStep): void {
    const { handle, bar, scale, label, input, range } = this.UI;

    if (!handle) throw new Error('handle - не найдено');
    if (!bar) throw new Error('bar - не найдено');

    const {
      min,
      max,
      single,
      from,
      to,
      step,
      percentFrom,
      percentTo,
      percentSingle,
      type,
      isInput,
      isRange,
      isLabel,
      isScale,
      arrayStep,
    } = data;

    if (type === DOUBLE) {
      handle.moveElement(percentFrom, FROM);
      handle.moveElement(percentTo, TO);
      bar.changeBar(percentFrom, percentTo);
    }

    if (type === SINGLE) {
      handle.moveElement(percentSingle, type);
      bar.changeBar(percentSingle);
    }

    if (isLabel) {
      if (!label) throw new Error('label - не найдено');
      if (type === SINGLE) label.changeLabelValue(single.toString());
      if (type === DOUBLE) label.changeLabelValue(from.toString(), to.toString());
    }

    if (isInput) {
      if (!input) throw new Error('input - не найдено');
      if (type === SINGLE) input.changeValue(single.toString());
      if (type === DOUBLE) input.changeValue(from.toString(), to.toString());
    }

    if (isRange) {
      if (!range) throw new Error('range - не найдено');
      range.changeValue(min.toString(), max.toString());
    }

    if (isScale) {
      if (!scale) throw new Error('scale - не найдено');
      scale.changeScale(arrayStep, min, max, step);
    }
  }

  public checkRangeType(percentage: number, type: Constants): Constants {
    const range = this.config.percentTo - this.config.percentFrom;
    const halfRange = range / 2;
    let elementType = type;

    if (elementType !== SINGLE) {
      if (percentage > this.config.percentFrom + halfRange) {
        elementType = TO;
      } else {
        elementType = FROM;
      }
    }

    return elementType;
  }

  private init(): void {
    this.createFactory();
    this.getHtml();
    this.createElement();
  }

  private getCoords(element: HTMLElement): ICoords {
    const box = element.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
    };
  }

  private createFactory() {
    if (this.config.type === SINGLE) this.factory = new SingleFactory();
    if (this.config.type === DOUBLE) this.factory = new IntervalFactory();
  }

  private getHtml(): void {
    this.factory.createTemplate(this.app, this.config.isVertical, this.config.type, this);
    this.UI.bar = this.factory.createBar(this.app, this.config.isVertical, this.config.type);
    this.UI.handle = this.factory.createHandle(this.app, this.config.isVertical, this);
    this.UI.scale = this.factory.createScale(
      this.app,
      this.config.isVertical,
      this.config.type,
      this
    );

    if (this.config.isLabel) {
      this.UI.label = this.factory.createLabel(this.app, this.config.isVertical);
    }

    if (this.config.isRange) {
      this.UI.range = this.factory.createRange(this.app, this.config.min, this.config.max, this);
    }

    if (this.config.isInput) {
      this.UI.input = this.factory.createInput(this.app, this);
    }
  }

  private createElement(): void {
    const slider = this.app.querySelector<HTMLElement>('.slider__main-wrapper');

    if (!slider) throw new Error('slider - не найдено');

    this.slider = slider;
  }
}

export default View;
