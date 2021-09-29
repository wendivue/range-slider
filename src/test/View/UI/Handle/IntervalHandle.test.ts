import { JSDOM } from 'jsdom';
import Constants from 'Helpers/enums';
import IntervalHandle from 'Ts/View/UI/Handle/IntervalHandle';
import View from 'Ts/View/View';
import { IConfig } from 'Helpers/interface';

const { FROM, TO } = Constants;

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

if (!anchor) throw new Error('anchor - не найдено');

const sliderTemplate = `<div class="slider__wrapper">`;

anchor.insertAdjacentHTML('afterbegin', sliderTemplate);

const slider = document.querySelector<HTMLElement>('.slider__wrapper');
const view = new View(intervalConfig, anchor);

if (!slider) throw new Error('slider - не найдено');

describe('handleFrom', () => {
  beforeEach(() => {
    const handleFrom = new IntervalHandle(anchor, false, view);
    handleFrom.moveElement(10, FROM);
  });

  afterEach(() => {
    slider.innerHTML = '';
  });

  test('should change left', () => {
    const element = document.querySelector<HTMLElement>('.slider__handle_from');

    if (!element) throw new Error('element - не найдено');

    expect(element.style.left).toMatch(/10%/);
  });
});

describe('handleTo', () => {
  beforeEach(() => {
    const handleTo = new IntervalHandle(anchor, false, view);
    handleTo.moveElement(10, TO);
  });

  afterEach(() => {
    slider.innerHTML = '';
  });

  test('should change left', () => {
    const element = document.querySelector<HTMLElement>('.slider__handle_to');

    if (!element) throw new Error('element - не найдено');

    expect(element.style.left).toMatch(/10%/);
  });
});

describe('handleFromVertical', () => {
  beforeEach(() => {
    const handleFromVertical = new IntervalHandle(anchor, true, view);
    handleFromVertical.moveElement(10, FROM);
  });

  afterEach(() => {
    slider.innerHTML = '';
  });

  test('should change top', () => {
    const element = document.querySelector<HTMLElement>('.slider__handle_from');

    if (!element) throw new Error('element - не найдено');

    expect(element.style.top).toMatch(/10%/);
  });
});

describe('handleToVertical', () => {
  beforeEach(() => {
    const handleToVertical = new IntervalHandle(anchor, true, view);
    handleToVertical.moveElement(10, TO);
  });

  afterEach(() => {
    slider.innerHTML = '';
  });

  test('should change top', () => {
    const element = document.querySelector<HTMLElement>('.slider__handle_to');

    if (!element) throw new Error('element - не найдено');

    expect(element.style.top).toMatch(/10%/);
  });
});
