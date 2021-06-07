import { IConfig } from 'Helpers/interface';
import { JSDOM } from 'jsdom';
import Range from 'Ts/View/UI/Range/Range';
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
  isInput: true,
  isRange: true,
  isLabel: true,
  isVertical: false,
  isScale: true,
};

const dom = new JSDOM('<html><body><div class="anchor"></div></body></html>');
const { document } = dom.window;

const anchor = document.querySelector<HTMLElement>('.anchor');
const sliderTemplate = `<div class="slider__main-wrapper">`;

if (!anchor) throw new Error('anchor - не найдено');

anchor.insertAdjacentHTML('afterbegin', sliderTemplate);

const slider = document.querySelector<HTMLElement>('.slider__main-wrapper');
const view = new View(intervalConfig, anchor);
const range = new Range(anchor, 10, 100, view);

if (!slider) throw new Error('slider - не найдено');

describe('Range', () => {
  afterEach(() => {
    slider.innerHTML = '';
  });

  test('should return min=30 & max=110', () => {
    const rangeMin = anchor.querySelector<HTMLInputElement>('.slider__range-min');
    const rangeMax = anchor.querySelector<HTMLInputElement>('.slider__range-max');

    if (!rangeMin) throw new Error('rangeMin - не найдено');
    if (!rangeMax) throw new Error('rangeMax - не найдено');

    range.changeValue('30', '110');

    expect(rangeMin.value).toMatch(/30/);
    expect(rangeMax.value).toMatch(/110/);
  });
});
