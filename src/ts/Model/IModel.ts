import { IConfig, IConfigWithArrayStep } from 'Helpers/interface';
import Constants from 'Helpers/enums';
import { IObservable } from '../Observable/Observable';

type ConstantsExcludeDouble = Exclude<Constants, Constants.DOUBLE>;

interface IModel extends IObservable {
  checkInitConfigValue(): void;
  getConfigWithArrayStep(): IConfigWithArrayStep;
  getConfig(): IConfig;
  setConfig(option: IConfig): void;
  add<T extends keyof IConfig>(value: IConfig[T], prop: T): void;
  get<T extends keyof IConfig>(prop: T): IConfig[T];
  getPercentage(percentage: number, elementType: Constants): number;
  getValue(percentage: number): number;
  getPercentageInput(value: number): number;
  counting(options: IConfig): void;
  createStep(): Array<number>;
  validateEdgeValue(value: number): number;
  validateRange(value: number, type: Constants): number;
  validateTwoHandleValue(percentage: number, element: Constants): number;
}

export { IModel, ConstantsExcludeDouble };
