import { Config } from 'Helpers/interface';
import Constants from 'Helpers/enums';

const { FROM, TO, MAX, MIN, STEP, PERCENT_FROM, PERCENT_TO } = Constants;

class Model {
  public config: Config;

  public options: Config;

  constructor(options: Config) {
    this.config = options;
  }

  public getConfig(): Config {
    return this.config;
  }

  public add<T>(value: T, prop: Constants): void {
    const obj = this.config;
    let userObj: Record<string, T> = { value };

    Object.keys(obj).forEach((key: Constants) => {
      if (key === prop) userObj = { [key]: value };
    });

    this.config = { ...this.config, ...userObj };
  }

  public get<T>(prop: Constants): T {
    const obj = this.config;
    let value;

    Object.keys(obj).forEach((key: Constants) => {
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

  private createStep(): Array<number> {
    let step: number = this.get(STEP);
    const max: number = this.get(MAX);

    step = this.validateStep(step);

    const length = max / step - 1;
    let array: Array<number> = [];
    let nextValue = 0;

    for (let aStep = 0; aStep < length; aStep += 1) {
      nextValue += step;
      array = [...array, ...[nextValue]];
    }

    array = [0, ...array, max];

    array = array.map((item: number) => (100 * item) / <number>this.get(MAX));

    return array;
  }

  private calcPercentageFromStep(
    array: Array<number>,
    percentage: number
  ): number {
    let newPercentage: number | undefined;

    array.map((item: number) => {
      if (item === 0) {
        newPercentage = item;
      }

      if (percentage > item) {
        newPercentage = item;
      }

      const halfItem = (item / 2) * 1.9;
      if (percentage >= halfItem && percentage <= item) {
        newPercentage = item;
      }

      return newPercentage;
    });

    if (newPercentage === undefined) throw new Error('value не передан');

    return newPercentage;
  }

  private calcValue(percentage: number): number {
    return (
      Math.round(
        ((<number>this.get(MAX) - <number>this.get(MIN)) / 100) * percentage
      ) + <number>this.get(MIN)
    );
  }

  private calcPercentageInput(value: number): number {
    return (value * 100) / <number>this.get(MAX);
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
    if (value < <number>this.get(MIN)) newValue = this.get(MIN);
    if (value > <number>this.get(MAX)) newValue = this.get(MAX);
    return newValue;
  }

  private validateTwoHandle(percentage: number, element: Constants): number {
    const from: number = this.get(PERCENT_FROM);
    const to: number = this.get(PERCENT_TO);
    let value = percentage;

    if (element === FROM) {
      if (percentage > to) {
        value = to;
      }
    }

    if (element === TO) {
      if (percentage < from) {
        value = from;
      }
    }

    return value;
  }

  public validateStep(value: number): number {
    const max: number = this.get(MAX);
    const halfMax = max / 2;
    let step = value;

    if (step > halfMax) step = halfMax;
    if (step < 0.5) step = 0.5;
    return step;
  }
}

export default Model;
