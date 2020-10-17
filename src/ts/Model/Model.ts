import { Config } from '../helpers/interface';
import {
  FROM,
  TO,
  MAX,
  MIN,
  STEP,
  PERSENT_FROM,
  PERSENT_TO,
} from '../helpers/constants';

class Model {
  public config: Config;
  public options: Config;

  constructor(options: Config) {
    this.config = options;
  }

  public add(value: Record<string, any>, prop: string): void {
    const obj = this.config;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (key === prop) value = { [key]: value };
      }
    }

    this.config = { ...this.config, ...value };
  }

  public get(prop: string): number {
    const obj: any = this.config;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (key === prop) return obj[key];
      }
    }
  }

  public getPercentage(percentage: number, elementType: string): number {
    percentage = this.calcPercentageFromStep(this.createStep(), percentage);
    percentage = this.validateEdgePercentage(percentage);
    percentage = this.validateTwotumbr(percentage, elementType);

    return percentage;
  }

  public getValue(percentage: number): number {
    let value = this.calcValue(percentage);
    value = this.validateEdgeValue(value);

    return value;
  }

  public getPercentageInput(value: number): number {
    value = this.calcPecentageInput(value);

    return value;
  }

  public createStep(): Array<number> {
    const step = this.get(STEP);
    const max = this.get(MAX);
    const length = max / step - 1;
    let array: Array<number> = [];
    let nextValue = 0;

    for (let astep = 0; astep < length; astep++) {
      nextValue = nextValue + step;
      array = [...array, ...[nextValue]];
    }

    array = [0, ...array, max];

    array = array.map((item: number) => {
      return (100 * item) / this.get(MAX);
    });

    return array;
  }

  public calcPercentageFromStep(
    array: Array<number>,
    percentage: number
  ): number {
    let newPercentage;

    array.map((item: number) => {
      if (item == 0) {
        newPercentage = item;
      }

      if (percentage > item) {
        newPercentage = item;
      }

      const halfItem = (item / 2) * 1.9;
      if (percentage >= halfItem && percentage <= item) {
        newPercentage = item;
      }
    });
    return newPercentage;
  }

  public calcValue(percentage: number): number {
    return Math.round((this.get(MAX) / 100) * percentage + this.get(MIN));
  }

  public calcPecentageInput(value: number): number {
    return (value * 100) / this.get(MAX);
  }

  public validateEdgePercentage(percentage: number): number {
    if (percentage < 0) percentage = 0;
    const rightEdge = 100;
    if (percentage > rightEdge) percentage = rightEdge;
    return percentage;
  }

  public validateEdgeValue(value: number): number {
    if (value < this.get(MIN)) value = this.get(MIN);
    if (value > this.get(MAX)) value = this.get(MAX);
    return value;
  }

  public validateTwotumbr(percentage: number, element: string): number {
    const from: number = this.get(PERSENT_FROM);
    const to: number = this.get(PERSENT_TO);

    if (element === FROM) {
      if (percentage > to) {
        percentage = to;
      }
    }

    if (element === TO) {
      if (percentage < from) {
        percentage = from;
      }
    }

    return percentage;
  }
}

export default Model;
