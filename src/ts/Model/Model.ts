import { Config } from 'Helpers/interface';
import Constants from 'Helpers/enums';

const { FROM, TO, MAX, MIN, STEP, PERCENT_FROM, PERCENT_TO } = Constants;

class Model {
  private config: Config;

  constructor(public options: Config) {
    this.config = options;
  }

  public getConfig(): Config {
    return this.config;
  }

  public add<T extends keyof Config>(value: Config[T], prop: T): void {
    const obj = this.config;
    let userObj: Record<string, Config[T]> = { value };

    Object.keys(obj).forEach((key) => {
      if (key === prop) userObj = { [<keyof Config>key]: value };
    });

    this.config = { ...this.config, ...userObj };
  }

  public get<T extends keyof Config>(prop: T): Config[T] {
    const obj = this.config;
    let value;

    Object.keys(obj).forEach((key) => {
      if (key === prop) value = obj[<keyof Config>key];
    });

    if (value === undefined) throw new Error('value не передан');

    return value;
  }

  public getPercentage(percentage: number, elementType: Constants): number {
    let value = this.calcPercentageFromStep(this.createStep(), percentage);
    value = this.validateEdgePercentage(value);
    value = this.validateTwoHandle(value, elementType);

    return value;
  }

  public getValue(percentage: number): number {
    let value = this.calcValue(percentage);
    value = this.validateEdgeValue(value);

    return value;
  }

  public getPercentageInput(value: number): number {
    const percentage = this.calcPercentageInput(value);

    return percentage;
  }

  public createStep(): Array<number> {
    let step = this.get(STEP);
    const max = this.get(MAX);
    const min = this.get(MIN);

    step = this.validateStep(step);

    const amount = min / step + 1;

    const length = max / step - amount;
    let array: Array<number> = [];
    let nextValue = 0;

    for (let aStep = 0; aStep < length; aStep += 1) {
      nextValue += step;
      array = [...array, ...[nextValue]];
    }

    array = array.map(
      (item: number) => (100 * item) / (this.get(MAX) - this.get(MIN))
    );

    array = [0, ...array, 100];

    return array;
  }

  private calcPercentageFromStep(
    array: Array<number>,
    percentage: number
  ): number {
    let newPercentage: number | undefined;
    const step = this.get(STEP);

    array.map((item: number) => {
      const stepPercentage = (100 * step) / (this.get(MAX) - this.get(MIN));
      const halfItemGreater = item + stepPercentage / 2;
      const halfItemLess = item - stepPercentage / 2;

      if (item === 0) {
        newPercentage = item;
      }

      if (percentage >= 100) {
        newPercentage = item;
      }

      if (percentage <= halfItemGreater && percentage >= halfItemLess) {
        newPercentage = item;
      }

      return newPercentage;
    });

    if (newPercentage === undefined) throw new Error('value не передан');

    return newPercentage;
  }

  private calcValue(percentage: number): number {
    let value;
    if (Number.isInteger(this.get(STEP))) {
      value = Math.round(
        ((this.get(MAX) - this.get(MIN)) / 100) * percentage + this.get(MIN)
      );
    } else {
      value =
        ((this.get(MAX) - this.get(MIN)) / 100) * percentage + this.get(MIN);
    }

    return value;
  }

  private calcPercentageInput(value: number): number {
    return (value * 100) / this.get(MAX);
  }

  private validateEdgePercentage(percentage: number): number {
    let value: number = percentage;
    if (percentage < 0) value = 0;
    const rightEdge = 100;
    if (percentage > rightEdge) value = rightEdge;
    return value;
  }

  public validateEdgeValue(value: number): number {
    let newValue = value;
    if (value < this.get(MIN)) newValue = this.get(MIN);
    if (value > this.get(MAX)) newValue = this.get(MAX);
    return newValue;
  }

  private validateTwoHandle(percentage: number, element: Constants): number {
    const from = this.get(PERCENT_FROM);
    const to = this.get(PERCENT_TO);
    const step = this.get(STEP);
    const max = this.get(MAX);
    const stepPercentage = (100 * step) / max;
    let value = percentage;

    if (element === FROM) {
      if (percentage >= to) value = to - stepPercentage;
    }

    if (element === TO) {
      if (percentage <= from) value = from + stepPercentage;
      if (percentage <= 0 && from === 0) value = stepPercentage;
    }

    return value;
  }

  public validateStep(value: number): number {
    const max = this.get(MAX);
    const halfMax = max / 2;
    let step = value;

    if (step > halfMax) step = halfMax;
    if (step < 0.5) step = 0.5;
    return step;
  }

  public validateRange(value: number, type: Constants): number {
    const max = this.get(MAX);
    const min = this.get(MIN);
    const step = this.get(STEP);
    let newValue = value;

    if (type === MAX && value < min) newValue = min + step;
    if (type === MIN && value > max) newValue = max - step;
    if (type === MAX && value < step) newValue = step * 2;

    return newValue;
  }

  public validateTwoHandleValue(
    percentage: number,
    element: Constants
  ): number {
    const from = this.get(FROM);
    const to = this.get(TO);
    const step = this.get(STEP);
    const max = this.get(MAX);
    let value = percentage;

    if (element === FROM) {
      if (percentage > to) value = to - step;
      if (percentage >= max && to === max) value = max - step;
    }

    if (element === TO) {
      if (percentage < from) value = from + step;
      if (percentage <= 0 && from === 0) value = step;
    }

    return value;
  }
}

export default Model;
