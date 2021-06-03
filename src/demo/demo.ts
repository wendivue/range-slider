import 'Ts/plugin';
import Setting from 'Components/Setting/Setting';
import { IConfig, PartialConfig } from 'Helpers/interface';

declare global {
  interface JQuery {
    rangeSlider(options: PartialConfig): void;
    update(data: PartialConfig): void;
    subscribe(fn: Function): void;
    unsubscribe(fn: Function): void;
    getConfig(): IConfig;
    destroy(): void;
    reset(): void;
  }
}

const config1: IConfig = {
  single: 50,
  from: 20,
  to: 50,
  step: 10,
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
  isScale: true,
};

const config2: IConfig = {
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
  isScale: false,
};

const config3: IConfig = {
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
  isScale: false,
};

const anchor1 = document.getElementById('slider1') as HTMLElement;
const anchor2 = document.getElementById('slider2') as HTMLElement;
const anchor3 = document.getElementById('slider3') as HTMLElement;

if (!anchor1) throw new Error('#slider1 - не найдено');
if (!anchor2) throw new Error('#slider2 - не найдено');
if (!anchor3) throw new Error('#slider3 - не найдено');

function createSetting(config: IConfig, anchor: HTMLElement) {
  return new Setting(config, anchor);
}

$('#slider1').rangeSlider({
  single: 50,
  max: 1000,
  min: 0,
  step: 10,
  type: 'single',
  isScale: true,
});

$('#slider2').rangeSlider({
  from: 200,
  to: 700,
  type: 'double',
  step: 10,
});

$('#slider3').rangeSlider({
  from: 60,
  to: 600,
  type: 'double',
  step: 1,
  isLabel: false,
  isVertical: true,
});

createSetting(config1, anchor1);
createSetting(config2, anchor2);
createSetting(config3, anchor3);
