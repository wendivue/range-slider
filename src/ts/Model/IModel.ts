import { Config } from 'Helpers/interface';
import Constants from 'Helpers/enums';

interface IModel {
  getConfig(): Config;
  add<T extends keyof Config>(value: Config[T], prop: T): void;
  get<T extends keyof Config>(prop: T): Config[T];
  getPercentage(percentage: number, elementType: Constants): number;
  getValue(percentage: number): number;
  getPercentageInput(value: number): number;
  createStep(): Array<number>;
  validateEdgeValue(value: number): number;
  validateRange(value: number, type: Constants): number;
  validateTwoHandleValue(percentage: number, element: Constants): number;
}

export { IModel };