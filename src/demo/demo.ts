import 'Ts/plugin';
import Setting from 'Components/Setting/Setting';
import { Config } from 'Helpers/interface';

declare global {
  interface JQuery {
    rangeSlider(options: Config, id: string): void;
  }
}

const config1: Config = {
  single: 10,
  from: 20,
  to: 50,
  step: 1,
  percentFrom: 0,
  percentTo: 0,
  percentSingle: 0,
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
  percentFrom: 0,
  percentTo: 0,
  percentSingle: 0,
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
  percentFrom: 0,
  percentTo: 0,
  percentSingle: 0,
  min: 0,
  max: 1000,
  type: 'double',
  isInput: true,
  isRange: true,
  isLabel: false,
  isVertical: true,
};

const anchor1 = document.getElementById('slider1') as HTMLElement;
const anchor2 = document.getElementById('slider2') as HTMLElement;
const anchor3 = document.getElementById('slider3') as HTMLElement;

if (!anchor1) throw new Error('#slider1 - не найдено');
if (!anchor2) throw new Error('#slider2 - не найдено');
if (!anchor3) throw new Error('#slider3 - не найдено');

function createSetting(config: Config, anchor: HTMLElement) {
  return new Setting(config, anchor);
}

$('#slider1').rangeSlider(
  {
    single: 400,
    type: 'single',
  },
  'slider1'
);

$('#slider2').rangeSlider(
  {
    from: 200,
    to: 700,
    type: 'double',
    step: 10,
  },
  'slider2'
);

$('#slider3').rangeSlider(
  {
    from: 60,
    to: 600,
    type: 'double',
    isLabel: false,
    isVertical: true,
  },
  'slider3'
);

createSetting(config1, anchor1);
createSetting(config2, anchor2);
createSetting(config3, anchor3);
