import Constants from 'Helpers/enums';
import { forMouse, Shift } from 'Helpers/interface';
import { IModel } from '../Model/IModel';
import { IView } from '../View/IView';

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
  STEP,
  VERTICAL,
  PERCENT_FROM,
  PERCENT_TO,
  PERCENT_SINGLE,
  SCALE,
  DOUBLE,
} = Constants;

class Presenter {
  constructor(public model: IModel, public view: IView) {
    this.init(
      this.model.get(TYPE),
      this.model.get(INPUT),
      this.model.get(RANGE),
      this.model.get(SCALE)
    );
  }

  private init(
    type: string,
    isInput: boolean,
    isRange: boolean,
    isScale: boolean
  ): void {
    if (type === SINGLE) {
      this.initConfigValue(
        this.model.get(SINGLE),
        [this.view.config.min, this.view.config.max],
        SINGLE
      );

      this.view.bindWrapperEvents(SINGLE, this.wrapperClick.bind(this));
      this.view.bindHandleEvents(SINGLE, this.handleMouseMove.bind(this));
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

      this.view.bindWrapperEvents(DOUBLE, this.wrapperClick.bind(this));
      this.view.bindHandleEvents(FROM, this.handleMouseMove.bind(this));
      this.view.bindHandleEvents(TO, this.handleMouseMove.bind(this));
    }

    if (isInput) {
      if (type === SINGLE) {
        this.view.bindInputEvents(SINGLE, this.inputOnChange.bind(this));
      } else {
        this.view.bindInputEvents(FROM, this.inputOnChange.bind(this));
        this.view.bindInputEvents(TO, this.inputOnChange.bind(this));
      }
    }

    if (isRange) {
      this.view.bindRangeEvents(MIN, this.rangeOnChange.bind(this));
      this.view.bindRangeEvents(MAX, this.rangeOnChange.bind(this));
    }

    if (isScale) {
      this.view.bindScaleEvents(this.scaleClick.bind(this));
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
        this.view.changeLabelValue(this.model.get(SINGLE).toString());
      } else {
        this.view.changeLabelValue(
          this.model.get(FROM).toString(),
          this.model.get(TO).toString()
        );
      }

    if (!isInput) {
      if (this.model.get(INPUT)) {
        if (this.model.get(TYPE) === SINGLE) {
          this.view.changeValue(this.model.get(SINGLE).toString());
        } else {
          this.view.changeValue(
            this.model.get(FROM).toString(),
            this.model.get(TO).toString()
          );
        }
      }
    }

    if (this.model.get(SCALE)) {
      this.view.changeScale(
        this.model.createStep(),
        this.model.get(MIN),
        this.model.get(MAX),
        this.model.get(STEP)
      );
    }
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
    event.preventDefault();
  }

  private inputOnChange(event: Event): void {
    const element = event.target as HTMLInputElement;
    const elementType = this.view.checkElementType(element) as
      | typeof FROM
      | typeof TO;
    let value = parseFloat(element.value);
    if (Number.isNaN(value)) value = this.model.get(elementType);

    value = this.model.validateEdgeValue(value);
    value = this.model.validateTwoHandleValue(value, elementType);
    element.value = value.toString();

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

  private wrapperClick(event: MouseEvent): void {
    const element = event.currentTarget as HTMLElement;
    const newShift: Shift = this.view.getShift(event, element);

    let percentage: number;
    let elementType = this.view.checkElementType(element);

    if (this.model.get(VERTICAL)) {
      percentage = this.view.calcPercentage(newShift.y);
    } else {
      percentage = this.view.calcPercentage(newShift.x);
    }

    const range = this.model.get(PERCENT_TO) - this.model.get(PERCENT_FROM);

    if (elementType !== SINGLE) {
      if (percentage > this.model.get(PERCENT_FROM) + range / 2) {
        elementType = TO;
      } else {
        elementType = FROM;
      }
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

  private scaleClick(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    let element = event.target as HTMLElement;
    element = element.closest('.slider__scale-item') as HTMLElement;

    let percentage: number;
    let elementType = this.view.checkElementType(target);

    if (this.model.get(VERTICAL)) {
      percentage = element.offsetTop;
    } else {
      percentage = element.offsetLeft;
    }

    percentage = this.view.calcPercentage(percentage);
    const range = this.model.get(PERCENT_TO) - this.model.get(PERCENT_FROM);

    if (elementType !== SINGLE) {
      if (percentage > this.model.get(PERCENT_FROM) + range / 2) {
        elementType = TO;
      } else {
        elementType = FROM;
      }
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

  private rangeOnChange(event: Event): void {
    const element = event.target as HTMLInputElement;
    let min = Math.abs(parseFloat(this.view.getElement(MIN).value));
    let max = Math.abs(parseFloat(this.view.getElement(MAX).value));

    if (Number.isNaN(min)) min = this.model.get(MIN);
    if (Number.isNaN(max)) max = this.model.get(MAX);

    if (element === this.view.getElement(MIN)) {
      min = this.model.validateRange(min, MIN);
      this.view.getElement(MIN).value = min.toString();
      this.model.add(min, MIN);
    } else if (element === this.view.getElement(MAX)) {
      max = this.model.validateRange(max, MAX);
      this.view.getElement(MAX).value = max.toString();
      this.model.add(max, MAX);
    }

    if (this.model.get(SCALE)) {
      this.view.changeScale(
        this.model.createStep(),
        this.model.get(MIN),
        this.model.get(MAX),
        this.model.get(STEP)
      );
    }
  }
}

export default Presenter;
