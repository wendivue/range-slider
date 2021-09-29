import {
  IConfig,
  IConfigWithArrayStep,
  PartialConfig,
  PartialConfigWithElementType,
} from 'Helpers/interface';
import Constants from 'Helpers/enums';
import Observable from 'Ts/Observable/Observable';

import { IModel } from './IModel';

const {
  FROM,
  TO,
  MAX,
  MIN,
  STEP,
  PERCENT_FROM,
  PERCENT_TO,
  SINGLE,
  PERCENT_SINGLE,
  TYPE,
  DOUBLE,
} = Constants;

class Model extends Observable implements IModel {
  constructor(private config: IConfig) {
    super();

    this.config = this.validateConfig(config);
  }

  public getConfig(): IConfig {
    return this.config;
  }

  public setConfig(option: IConfig): void {
    this.config = { ...this.config, ...option };
    this.config = this.validateConfig(this.config);
  }

  public add<T extends keyof IConfig>(value: IConfig[T], prop: T): void {
    const obj = this.config;
    let userObj: Record<string, IConfig[T]> = { value };

    Object.keys(obj).forEach((key) => {
      if (key === prop) userObj = { [key]: value };
    });

    this.config = { ...this.config, ...userObj };
  }

  public get<T extends keyof IConfig>(prop: T): IConfig[T] {
    const obj = this.config;
    let value;

    Object.keys(obj).forEach((key) => {
      if (key === prop) value = obj[<keyof IConfig>key];
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
    value = parseFloat(value.toFixed(2));

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

    const amount = min / step;
    const lastNumber = 1;
    const maxLength = 1000;
    let length = max / step - amount - lastNumber;
    let array: Array<number> = [];
    let nextValue = 0;

    if (length > maxLength) {
      const countRelativeLength = Math.round(length / maxLength);
      length = maxLength;
      step = step * countRelativeLength + step;
    }

    for (let aStep = 0; aStep < length; aStep += 1) {
      nextValue += step;
      array.push(nextValue);
    }

    array = array.map((item) => (100 * item) / (this.get(MAX) - this.get(MIN)));

    array = [0, ...array, 100];

    return array;
  }

  public validateEdgeValue(value: number): number {
    let newValue = value;
    if (value < this.get(MIN)) newValue = this.get(MIN);
    if (value > this.get(MAX)) newValue = this.get(MAX);
    return newValue;
  }

  public validateRange(value: number, type: Constants): number {
    const max = this.get(MAX);
    const min = this.get(MIN);
    const step = this.get(STEP);
    const stepTwice = step * 2;
    let newValue = value;

    if (type === MAX && newValue < min + step) newValue = min + step;
    if (type === MIN && newValue > max - step) newValue = max - step;
    if (type === MAX && newValue < stepTwice) newValue = stepTwice;

    return newValue;
  }

  public validateTwoHandleValue(percentage: number, element: Constants): number {
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

  public validateStep(value: number): number {
    const max = this.get(MAX);
    const min = this.get(MIN);
    const halfMax = max / 2;
    const minStep = 0.5;
    let step = value;

    if (step > halfMax) step = halfMax;
    if (step > max - min) step = max - min;
    if (step < minStep) step = minStep;
    return step;
  }

  public getConfigWithArrayStep(): IConfigWithArrayStep {
    const arrayStep = this.createStep();
    const config = this.getConfig();
    const newData = { ...config, arrayStep };

    return newData;
  }

  public initConfigValue(): void {
    if (this.get(TYPE) === SINGLE) {
      this.addConfigValue(this.get(SINGLE), SINGLE);
    }

    if (this.get(TYPE) === DOUBLE) {
      this.addConfigValue(this.get(FROM), FROM);
      this.addConfigValue(this.get(TO), TO);
    }
  }

  public counting(options: PartialConfigWithElementType): void {
    const data = { ...options };

    if (data.min !== undefined || data.max !== undefined) {
      this.addsRange(data);
    } else {
      const { elementType } = data;
      if (!elementType) throw new Error('elementType - не найдено');

      let percentage = data[elementType];
      if (percentage === undefined) throw new Error('percentage - не найдено');

      if (data.hasInputs) {
        percentage = this.validateEdgeValue(percentage);
        percentage = this.validateTwoHandleValue(percentage, elementType);
        percentage = this.getPercentageInput(percentage);
      }

      percentage = this.getPercentage(percentage, elementType);
      const value = this.getValue(percentage);

      this.adds(percentage, value, elementType);
    }

    this.config = this.validateConfig(this.config);
    this.initConfigValue();

    const arrayStep = this.createStep();
    const newData = { ...this.config, arrayStep };

    this.notify(newData);
  }

  private adds(percentage: number, value: number, elementType: Constants) {
    if (elementType === FROM) {
      this.add(percentage, PERCENT_FROM);
      this.add(value, FROM);
    }

    if (elementType === TO) {
      this.add(percentage, PERCENT_TO);
      this.add(value, TO);
    }

    if (elementType === SINGLE) {
      this.add(percentage, PERCENT_SINGLE);
      this.add(value, SINGLE);
    }
  }

  private addsRange(data: PartialConfig): void {
    if (data.min !== undefined) {
      let { min } = data;
      min = this.validateRange(min, MIN);
      this.add(min, MIN);
    }

    if (data.max !== undefined) {
      let { max } = data;
      max = this.validateRange(max, MAX);
      this.add(max, MAX);
    }
  }

  private addConfigValue(value: number, elementType: Constants): void {
    const percentage = this.getPercentageInput(value);

    if (elementType === FROM) this.add(percentage, PERCENT_FROM);
    if (elementType === TO) this.add(percentage, PERCENT_TO);
    if (elementType === SINGLE) this.add(percentage, PERCENT_SINGLE);
  }

  private validateConfig(options: IConfig): IConfig {
    let { min, max, step, from, to, single } = options;
    const config = options;
    const minStep = 0.5;
    const stepTwice = step * 2;
    const halfMax = max / 2;

    min = Math.abs(min);
    max = Math.abs(max);
    step = Math.abs(step);
    from = Math.abs(from);
    to = Math.abs(to);
    single = Math.abs(single);

    if (step < minStep) step = minStep;
    if (min > max - step) min = max - step;
    if (max < min + step) max = min + step;
    if (max < stepTwice) max = stepTwice;
    if (step > halfMax) step = halfMax;
    if (step > max - min) step = max - min;
    if (from > to) from = to - step;
    if (to < from) to = from + step;
    if (from > max) from = max - stepTwice;
    if (to > max) to = max - step;
    if (single > max) single = max - step;

    config.min = min;
    config.max = max;
    config.step = step;
    config.from = from;
    config.to = to;
    config.single = single;

    return config;
  }

  private calcPercentageFromStep(array: Array<number>, percentage: number): number {
    let newPercentage = percentage;
    const step = this.get(STEP);

    array.map((item) => {
      const stepPercentage = (100 * step) / (this.get(MAX) - this.get(MIN));
      const halfItemGreater = item + stepPercentage / 2;
      const halfItemLess = item - stepPercentage / 2;

      if (item === 0) newPercentage = item;
      if (percentage >= 100) newPercentage = item;

      if (percentage >= item) newPercentage = item;

      if (percentage <= halfItemGreater && percentage >= halfItemLess) {
        newPercentage = item;
      }

      return newPercentage;
    });

    return newPercentage;
  }

  private calcValue(percentage: number): number {
    let value;
    if (Number.isInteger(this.get(STEP))) {
      value = Math.round(((this.get(MAX) - this.get(MIN)) / 100) * percentage + this.get(MIN));
    } else {
      value = ((this.get(MAX) - this.get(MIN)) / 100) * percentage + this.get(MIN);
    }

    return value;
  }

  private calcPercentageInput(value: number): number {
    return (value * 100) / this.get(MAX);
  }

  private validateEdgePercentage(percentage: number): number {
    let value = percentage;
    if (percentage < 0) value = 0;
    const rightEdge = 100;
    if (percentage > rightEdge) value = rightEdge;
    return value;
  }

  private validateTwoHandle(percentage: number, element: Constants): number {
    const from = this.get(PERCENT_FROM);
    const to = this.get(PERCENT_TO);
    const step = this.get(STEP);
    const max = this.get(MAX);
    const min = this.get(MIN);
    const stepPercentage = (100 * step) / (max - min);
    let value = percentage;

    if (element === FROM) {
      if (percentage >= to - stepPercentage) value = to - stepPercentage;
    }

    if (element === TO) {
      if (percentage <= from) value = from + stepPercentage;
      if (percentage <= 0 && from === 0) value = stepPercentage;
    }

    return value;
  }
}

export default Model;
