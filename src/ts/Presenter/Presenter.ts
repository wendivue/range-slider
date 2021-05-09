import Constants from 'Helpers/enums';
import { forMouse, Shift } from 'Helpers/interface';
import View from '../View/View';
import Model from '../Model/Model';

const {
  SINGLE,
  FROM,
  TO,
  MIN,
  MAX,
  TYPE,
  INPUT,
  RANGE,
  LABEL,
  VERTICAL,
  PERCENT_FROM,
  PERCENT_TO,
  PERCENT_SINGLE,
} = Constants;

class Presenter {
  constructor(public model: Model, public view: View) {
    this.init(
      this.model.get(TYPE),
      this.model.get(INPUT),
      this.model.get(RANGE)
    );
  }

  private init(type: Constants, isInput: boolean, isRange: boolean): void {
    if (this.view.config.isVertical === undefined) {
      throw new Error('isVertical не передан');
    }

    if (this.view.config.type === undefined) {
      throw new Error('type не передан');
    }

    if (this.view.config.min === undefined) {
      throw new Error('min не передан');
    }

    if (this.view.config.max === undefined) {
      throw new Error('max не передан');
    }

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

    if (isInput) {
      if (type === SINGLE) {
        this.bindInputEvents(this.view.inputSingle);
      } else {
        this.bindInputEvents(this.view.inputFrom);
        this.bindInputEvents(this.view.inputTo);
      }
    }

    if (isRange) {
      this.bindRangeEvents(this.view.rangeMin);
      this.bindRangeEvents(this.view.rangeMax);
    }
  }

  private initConfigValue(
    value: number,
    [min, max]: Array<number>,
    elementType: Constants
  ): void {
    const percentage: number = this.model.getPercentageInput(value);

    if (elementType === FROM) {
      this.model.add(percentage, PERCENT_FROM);
      this.model.add(value, FROM);
    } else if (elementType === TO) {
      this.model.add(percentage, PERCENT_TO);
      this.model.add(value, TO);
    } else if (elementType === SINGLE) {
      this.model.add(percentage, PERCENT_SINGLE);
      this.model.add(value, SINGLE);
    }

    this.model.add(min, MIN);
    this.model.add(max, MAX);

    this.updateView(elementType, false);
  }

  private updateView(elementType: Constants, isInput: boolean): void {
    if (elementType === FROM) {
      this.view.moveElement(this.model.get(PERCENT_FROM), elementType);
    } else if (elementType === TO) {
      this.view.moveElement(this.model.get(PERCENT_TO), elementType);
    } else if (elementType === SINGLE) {
      this.view.moveElement(this.model.get(PERCENT_SINGLE), elementType);
    }

    if (this.model.get(TYPE) === SINGLE) {
      this.view.changeBar(this.model.get(PERCENT_SINGLE));
    } else {
      this.view.changeBar(
        this.model.get(PERCENT_FROM),
        this.model.get(PERCENT_TO)
      );
    }

    if (this.model.get(LABEL))
      if (this.model.get(TYPE) === SINGLE) {
        this.view.changeLabelValue(this.model.get(SINGLE));
      } else {
        this.view.changeLabelValue(this.model.get(FROM), this.model.get(TO));
      }

    if (!isInput) {
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
    element.addEventListener('mousedown', this.handleMouseDown.bind(this));
  }

  private bindInputEvents(element: HTMLElement): void {
    element.addEventListener('change', this.inputOnChange.bind(this));
  }

  private bindRangeEvents(element: HTMLElement): void {
    element.addEventListener('change', this.rangeOnChange.bind(this));
  }

  private handleMouseDown(event: MouseEvent): void {
    const element = event.target as HTMLElement;
    const shift: Shift = this.view.getShift(event, element);

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
    let percentage: number;
    const elementType = this.view.checkElementType(forMouseMove.element);
    const newShift = this.view.getNewShift(event, forMouseMove.shift);

    if (this.model.get(VERTICAL)) {
      percentage = this.view.calcPercentage(newShift.y);
    } else {
      percentage = this.view.calcPercentage(newShift.x);
    }

    percentage = this.model.getPercentage(percentage, elementType);
    const value = this.model.getValue(percentage);

    if (elementType === FROM) {
      this.model.add(percentage, PERCENT_FROM);
      this.model.add(value, FROM);
    } else if (elementType === TO) {
      this.model.add(percentage, PERCENT_TO);
      this.model.add(value, TO);
    } else if (elementType === SINGLE) {
      this.model.add(percentage, PERCENT_SINGLE);
      this.model.add(value, SINGLE);
    }

    this.updateView(elementType, false);
  }

  private inputOnChange(event: Event): void {
    const element = event.target as HTMLInputElement;
    const elementType = this.view.checkElementType(element);
    const value = this.model.validateEdgeValue(parseFloat(element.value));

    let percentage: number = this.model.getPercentageInput(value);
    percentage = this.model.getPercentage(percentage, elementType);

    if (elementType === FROM) {
      this.model.add(percentage, PERCENT_FROM);
      this.model.add(value, FROM);
    } else if (elementType === TO) {
      this.model.add(percentage, PERCENT_TO);
      this.model.add(value, TO);
    } else if (elementType === SINGLE) {
      this.model.add(percentage, PERCENT_SINGLE);
      this.model.add(value, SINGLE);
    }

    this.updateView(elementType, true);
  }

  private rangeOnChange(event: Event): void {
    const element = event.target as HTMLInputElement;
    let min: number;
    let max: number;

    if (element === this.view.rangeMin) {
      min = parseFloat(this.view.rangeMin.value);
      this.model.add(min, MIN);
    } else if (element === this.view.rangeMax) {
      max = parseFloat(this.view.rangeMax.value);
      this.model.add(max, MAX);
    }
  }
}

export default Presenter;
