import '../ts/plugin';
import Setting from '../components/Setting/Setting';
import { Config } from '../ts/helpers/interface';

declare let $: any;

const config1: Config = {
  single: 10,
  from: 20,
  to: 50,
  step: 1,
  persentFrom: 0,
  persentTo: 0,
  persentSingle: 0,
  min: 0,
  max: 1000,
  type: 'single',
  isInput: true,
  isRange: true,
  isLabel: true,
  isVertical: false,
};

const config2: Config = {
  single: 20,
  from: 20,
  to: 50,
  step: 10,
  persentFrom: 0,
  persentTo: 0,
  persentSingle: 0,
  min: 0,
  max: 1000,
  type: 'double',
  isInput: true,
  isRange: true,
  isLabel: true,
  isVertical: false,
};

const config3: Config = {
  single: 20,
  from: 20,
  to: 50,
  step: 1,
  persentFrom: 0,
  persentTo: 0,
  persentSingle: 0,
  min: 0,
  max: 1000,
  type: 'double',
  isInput: true,
  isRange: true,
  isLabel: false,
  isVertical: true,
};

const anchor1: HTMLElement = document.getElementById('fesd');
const anchor2: HTMLElement = document.getElementById('azxs');
const anchor3: HTMLElement = document.getElementById('ajkg');

function createSetting(config: Config, anchor: HTMLElement) {
  return new Setting(config, anchor);
}

<any>$('#fesd').rangeSlider(
  {
    single: 400,
    type: 'single',
  },
  'fesd'
);

<any>$('#azxs').rangeSlider(
  {
    from: 200,
    to: 700,
    type: 'double',
    step: 10,
  },
  'azxs'
);

<any>$('#ajkg').rangeSlider(
  {
    from: 60,
    to: 600,
    type: 'double',
    isLabel: false,
    isVertical: true,
  },
  'ajkg'
);

createSetting(config1, anchor1);
createSetting(config2, anchor2);
createSetting(config3, anchor3);
