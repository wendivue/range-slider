import {
  SINGLE,
  FROM,
  TO,
  MIN,
  MAX,
  TYPE,
  INPUT,
  RANGE,
  VERTICAL,
  PERSENT_FROM,
  PERSENT_TO,
  PERSENT_SINGLE,
} from '../helpers/constants';

import { forMouseMove } from '../helpers/interface';

class Presenters {
  private view: any;
  private model: any;

  constructor(view: any, model: any) {
    this.view = view;
    this.model = model;

    this.init(
      this.model.get(TYPE),
      this.model.get(INPUT),
      this.model.get(RANGE)
    );
  }

  public init(type: string, input: boolean, range: boolean): void {
    if (type === SINGLE) {
      this.initConfigValue(
        this.model.get(SINGLE),
        [this.view.config.min, this.view.config.max],
        SINGLE
      );

      this.bindHandleEvents(this.view.single);
    } else {
      this.initConfigValue(
        this.model.get(FROM),
        [this.view.config.min, this.view.config.max],
        FROM
      );
      this.initConfigValue(
        this.model.get(TO),
        [this.view.config.min, this.view.config.max],
        TO
      );
      this.bindHandleEvents(this.view.from);
      this.bindHandleEvents(this.view.to);
    }

    if (input) {
      if (type === SINGLE) {
        this.bindInputEvents(this.view.inputSingle);
      } else {
        this.bindInputEvents(this.view.inputFrom);
        this.bindInputEvents(this.view.inputTo);
      }
    }

    if (range) {
      this.bindRangeEvents(this.view.rangeMin);
      this.bindRangeEvents(this.view.rangeMax);
    }
  }

  private initConfigValue(
    value: number,
    [min, max]: Array<number>,
    elementType: string
  ): void {
    const percentage: number = this.model.getPercentageInput(value);

    if (elementType === FROM) {
      this.model.add(percentage, PERSENT_FROM);
      this.model.add(value, FROM);
    } else if (elementType === TO) {
      this.model.add(percentage, PERSENT_TO);
      this.model.add(value, TO);
    } else if (elementType === SINGLE) {
      this.model.add(percentage, PERSENT_SINGLE);
      this.model.add(value, SINGLE);
    }

    this.model.add(min, MIN);
    this.model.add(max, MAX);

    this.updateView(elementType, false);
  }

  private calcPercentage(left: number): number {
    let slider;
    if (this.model.get(VERTICAL)) {
      slider = this.view.slider.offsetHeight;
    } else {
      slider = this.view.slider.offsetWidth;
    }

    return (100 * left) / slider;
  }

  private updateView(elementType: string, input: boolean): void {
    if (elementType === FROM) {
      this.view.moveElement(this.model.get(PERSENT_FROM), elementType);
    } else if (elementType === TO) {
      this.view.moveElement(this.model.get(PERSENT_TO), elementType);
    } else if (elementType === SINGLE) {
      this.view.moveElement(this.model.get(PERSENT_SINGLE), elementType);
    }

    if (this.model.get(TYPE) === SINGLE) {
      this.view.changeBetween(this.model.get(PERSENT_SINGLE));
    } else {
      this.view.changeBetween(
        this.model.get(PERSENT_FROM),
        this.model.get(PERSENT_TO)
      );
    }

    if (!input) {
      if (this.model.get(TYPE) === SINGLE) {
        this.view.changeLabelValue(this.model.get(SINGLE));
      } else {
        this.view.changeLabelValue(this.model.get(TO), this.model.get(FROM));
      }

      if (this.model.get(INPUT)) {
        if (this.model.get(TYPE) === SINGLE) {
          this.view.changeValue(this.model.get(SINGLE));
        } else {
          this.view.changeValue(this.model.get(FROM), this.model.get(TO));
        }
      }
    }
  }

  private bindHandleEvents(element: HTMLElement): void {
    element.addEventListener(
      'mousedown',
      this.handleMouseDown.bind(this, element)
    );
  }

  private bindInputEvents(element: HTMLElement): void {
    element.addEventListener('change', this.inputOnChange.bind(this, element));
  }

  private bindRangeEvents(element: HTMLElement): void {
    element.addEventListener('change', this.rangeOnChange.bind(this, element));
  }

  private handleMouseDown(element: HTMLElement, event: MouseEvent): void {
    event.preventDefault();
    const shift = this.view.getShift(event, element);

    const forMouseMove: forMouseMove = {
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

  private handleMouseMove(forMouseMove: forMouseMove, event: MouseEvent): void {
    let percentage: number;
    const elementType = this.view.checkElementType(forMouseMove.element);
    const newShift = this.view.getNewShift(event, forMouseMove.shift);

    if (this.model.get(VERTICAL)) {
      percentage = this.calcPercentage(newShift.y);
    } else {
      percentage = this.calcPercentage(newShift.x);
    }

    percentage = this.model.getPercentage(percentage, elementType);
    const value = this.model.getValue(percentage);

    if (elementType === FROM) {
      this.model.add(percentage, PERSENT_FROM);
      this.model.add(value, FROM);
    } else if (elementType === TO) {
      this.model.add(percentage, PERSENT_TO);
      this.model.add(value, TO);
    } else if (elementType === SINGLE) {
      this.model.add(percentage, PERSENT_SINGLE);
      this.model.add(value, SINGLE);
    }

    this.updateView(elementType, false);
  }

  private inputOnChange(element: any): void {
    const elementType = this.view.checkElementType(element);
    element.value = this.model.validateEdgeValue(element.value);

    let percentage: number = this.model.getPercentageInput(element.value);
    percentage = this.model.getPercentage(percentage, elementType);

    if (elementType === FROM) {
      this.model.add(percentage, PERSENT_FROM);
    } else if (elementType === TO) {
      this.model.add(percentage, PERSENT_TO);
    } else if (elementType === SINGLE) {
      this.model.add(percentage, PERSENT_SINGLE);
    }

    this.updateView(elementType, true);
  }

  private rangeOnChange(element: HTMLElement): void {
    let min: number;
    let max: number;

    if (element === this.view.rangeMin) {
      min = parseInt(this.view.rangeMin.value);
      this.model.add(min, MIN);
    } else if (element === this.view.rangeMax) {
      max = parseInt(this.view.rangeMax.value);
      this.model.add(max, MAX);
    }
  }
}

export default Presenters;
