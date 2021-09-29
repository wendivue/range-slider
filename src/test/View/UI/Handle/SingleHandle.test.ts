import { IConfig } from 'Helpers/interface';
import { JSDOM } from 'jsdom';
import SingleHandle from 'Ts/View/UI/Handle/SingleHandle';
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
const sliderTemplate = `<div class="slider__wrapper">`;

if (!anchor) throw new Error('anchor - не найдено');

anchor.insertAdjacentHTML('afterbegin', sliderTemplate);

const slider = document.querySelector<HTMLElement>('.slider__wrapper');
const view = new View(intervalConfig, anchor);

if (!slider) throw new Error('slider - не найдено');

describe('SingleHandle', () => {
  beforeEach(() => {
    const handle = new SingleHandle(anchor, false, view);
    handle.moveElement(10);
  });

  afterEach(() => {
    slider.innerHTML = '';
  });

  test('should change left', () => {
    const element = document.querySelector<HTMLElement>('.slider__handle_single');

    if (!element) throw new Error('element - не найдено');

    expect(element.style.left).toMatch(/10%/);
  });
});

describe('SingleHandleVertical', () => {
  beforeEach(() => {
    const handleVertical = new SingleHandle(anchor, true, view);
    handleVertical.moveElement(10);
  });

  afterEach(() => {
    slider.innerHTML = '';
  });

  test('should change top', () => {
    const element = document.querySelector<HTMLElement>('.slider__handle_single');

    if (!element) throw new Error('element - не найдено');

    expect(element.style.top).toMatch(/10%/);
  });
});
