import { IConfig } from 'Helpers/interface';
import { JSDOM } from 'jsdom';
import IntervalInput from 'Ts/View/UI/Input/IntervalInput';
import View from 'Ts/View/View';

const intervalConfig: IConfig = {
  single: 20,
  from: 20,
  to: 50,
  step: 100,
  percentFrom: 0,
  percentTo: 0,
  percentSingle: 0,
  min: 30,
  max: 1000,
  type: 'double',
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
const view = new View(intervalConfig, anchor);

if (!slider) throw new Error('slider - не найдено');

describe('IntervalInput', () => {
  beforeEach(() => {
    const input = new IntervalInput(anchor, view);
    input.changeValue('10', '20');
  });

  afterEach(() => {
    slider.innerHTML = '';
  });

  test('should change value', () => {
    const inputFrom = document.querySelector<HTMLInputElement>('.input__from');
    const inputTo = document.querySelector<HTMLInputElement>('.input__to');

    if (!inputFrom) throw new Error('inputFrom - не найдено');
    if (!inputTo) throw new Error('inputTo - не найдено');

    expect(inputFrom.value).toMatch(/10/);
    expect(inputTo.value).toMatch(/20/);
  });
});
