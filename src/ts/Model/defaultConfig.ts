import { IConfig } from 'Helpers/interface';

const defaultConfig: IConfig = {
  single: 20,
  from: 20,
  to: 50,
  step: 1,
  percentFrom: 0,
  percentTo: 0,
  percentSingle: 0,
  min: 0,
  max: 1000,
  type: 'double',
  hasInputs: true,
  hasRange: true,
  hasLabels: true,
  isVertical: false,
  hasScale: false,
};

export default defaultConfig;
