import { JSDOM } from 'jsdom';

import { IConfig } from 'Helpers/interface';
import View from 'Ts/View/View';
import SingleInput from 'Ts/View/UI/Input/SingleInput';

const singleConfig: IConfig = {
  single: 20,
  from: 20,
  to: 50,
  step: 100,
  percentFrom: 0,
  percentTo: 0,
  percentSingle: 0,
  min: 30,
  max: 1000,
  type: 'single',
  hasInputs: true,
  hasRange: true,
  hasLabels: true,
  isVertical: false,
  hasScale: true,
};

const dom = new JSDOM('<html><body><div class="anchor"></div></body></html>');
const { document } = dom.window;

const anchor = document.querySelector<HTMLElement>('.anchor');
const sliderTemplate = `<div class="slider__main-wrapper">`;

if (!anchor) throw new Error('anchor - не найдено');

anchor.insertAdjacentHTML('afterbegin', sliderTemplate);

const slider = document.querySelector<HTMLElement>('.slider__main-wrapper');
const view = new View(singleConfig, anchor);

if (!slider) throw new Error('slider - не найдено');

describe('SingleInput', () => {
  beforeEach(() => {
    const input = new SingleInput(anchor, view);
    input.changeValue('10');
  });

  afterEach(() => {
    slider.innerHTML = '';
  });

  test('should change value', () => {
    const inputSingle = document.querySelector<HTMLInputElement>('.input__single');

    if (!inputSingle) throw new Error('inputSingle - не найдено');

    expect(inputSingle.value).toMatch(/10/);
  });
});
