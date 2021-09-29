import 'Ts/plugin';
import Setting from 'Components/Setting/Setting';
import { IAPI, PartialConfigWithArrayStep } from 'Helpers/interface';

const anchor1 = document.getElementById('slider1');
const anchor2 = document.getElementById('slider2');
const anchor3 = document.getElementById('slider3');

if (!anchor1) throw new Error('#slider1 - не найдено');
if (!anchor2) throw new Error('#slider2 - не найдено');
if (!anchor3) throw new Error('#slider3 - не найдено');

const slider1 = $('#slider1').rangeSlider({
  single: 50,
  max: 1000,
  min: 0,
  step: 10,
  type: 'single',
  hasScale: true,
});

const slider2 = $('#slider2').rangeSlider({
  from: 200,
  to: 700,
  type: 'double',
  step: 10,
});

const slider3 = $('#slider3').rangeSlider({
  from: 60,
  to: 600,
  type: 'double',
  step: 1,
  hasLabels: false,
  isVertical: true,
});

const createSetting = (anchor: HTMLElement, slider: IAPI): void => {
  const config = slider.getConfig();
  const setting = new Setting(config, anchor);

  const callbackSettingUpdate = () => (changedConfig: PartialConfigWithArrayStep) =>
    setting.update({ ...config, ...changedConfig });

  slider.subscribe(callbackSettingUpdate());

  setting.subscribe((changedConfig: PartialConfigWithArrayStep) => {
    slider.update({ ...config, ...changedConfig });
    slider.subscribe(callbackSettingUpdate());
  });
};

createSetting(anchor1, slider1);
createSetting(anchor2, slider2);
createSetting(anchor3, slider3);
