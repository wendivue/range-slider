import { Config } from 'Helpers/interface';
import {
  FROM,
  TO,
  MAX,
  MIN,
  STEP,
  PERSENT_FROM,
  PERSENT_TO,
} from 'Helpers/constants';

class Model {
  public config: Config;

  public options: Config;

  constructor(options: Config) {
    this.config = options;
  }

  public getConfig(): Config {
    return this.config;
  }

  public add(value: any, prop: string): void {
    const obj = this.config;
    let userObj: Record<string, number> = { value };

    Object.keys(obj).forEach((key: string) => {
      if (key === prop) userObj = { [key]: value };
    });

    this.config = { ...this.config, ...userObj };
  }

  public get(prop: string): any {
    const obj: any = this.config;
    let value;
    Object.keys(obj).forEach((key: string) => {
      if (key === prop) value = obj[key];
    });

    return value;
  }

  public getPercentage(percentage: number, elementType: string): number {
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
    const percentage = this.calcPecentageInput(value);

    return percentage;
  }

  private createStep(): Array<number> {
    let step = this.get(STEP);
    const max = this.get(MAX);

    step = this.validateStep(step);

    const length = max / step - 1;
    let array: Array<number> = [];
    let nextValue = 0;

    for (let astep = 0; astep < length; astep += 1) {
      nextValue += step;
      array = [...array, ...[nextValue]];
    }

    array = [0, ...array, max];

    array = array.map((item: number) => (100 * item) / this.get(MAX));

    return array;
  }

  private calcPercentageFromStep(
    array: Array<number>,
    percentage: number
  ): number {
    let newPercentage: number;

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
    return newPercentage;
  }

  private calcValue(percentage: number): number {
    return (
      Math.round(((this.get(MAX) - this.get(MIN)) / 100) * percentage) +
      this.get(MIN)
    );
  }

  private calcPecentageInput(value: number): number {
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

  private validateTwoHandle(percentage: number, element: string): number {
    const from: number = this.get(PERSENT_FROM);
    const to: number = this.get(PERSENT_TO);
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
    const max = this.get(MAX);
    const halfMax = max / 2;
    let step = value;

    if (step > halfMax) step = halfMax;
    if (step < 0.5) step = 0.5;
    return step;
  }
}

export default Model;
