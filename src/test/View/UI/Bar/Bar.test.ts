import { JSDOM } from 'jsdom';
import Constants from 'Helpers/enums';
import Bar from 'Ts/View/UI/Bar/Bar';

const { SINGLE, DOUBLE } = Constants;

const dom = new JSDOM('<html><body><div class="anchor"></div></body></html>');
const { document } = dom.window;

const anchor = document.querySelector('.anchor') as HTMLElement;
const sliderTemplate = `<div class="slider__wrapper">`;

anchor.insertAdjacentHTML('afterbegin', sliderTemplate);

const slider = document.querySelector('.slider__wrapper');

if (!slider) throw new Error('.slider__wrapper - не найдено');

describe('doubleBar', () => {
  beforeEach(() => {
    const doubleBar = new Bar(anchor, false, DOUBLE);
    doubleBar.changeBar(10, 30);
  });

  afterEach(() => {
    slider.innerHTML = '';
  });

  test('change width & left', () => {
    const element = document.querySelector('.slider__bar') as HTMLElement;

    expect(element.style.width).toMatch(/20%/);
    expect(element.style.left).toMatch(/10%/);
  });
});

describe('SingleBar', () => {
  beforeEach(() => {
    const singleBar = new Bar(anchor, false, SINGLE);
    singleBar.changeBar(15);
  });

  afterEach(() => {
    slider.innerHTML = '';
  });

  test('change width', () => {
    const element = document.querySelector('.slider__bar') as HTMLElement;
    expect(element.style.width).toMatch(/15%/);
  });
});

describe('singleBarVertical', () => {
  beforeEach(() => {
    const singleBarVertical = new Bar(anchor, true, SINGLE);
    singleBarVertical.changeBar(15);
  });

  afterEach(() => {
    slider.innerHTML = '';
  });

  test('change height', () => {
    const element = document.querySelector('.slider__bar') as HTMLElement;

    if (!element) throw new Error('.slider__bar - не найдено');

    expect(element.style.height).toMatch(/15%/);
  });
});

describe('doubleBarVertical', () => {
  beforeEach(() => {
    const doubleBarVertical = new Bar(anchor, true, DOUBLE);
    doubleBarVertical.changeBar(10, 30);
  });

  afterEach(() => {
    slider.innerHTML = '';
  });

  test('change height & top', () => {
    const element = document.querySelector('.slider__bar') as HTMLElement;

    if (!element) throw new Error('.slider__bar - не найдено');

    expect(element.style.height).toMatch(/20%/);
    expect(element.style.top).toMatch(/10%/);
  });
});

describe('Bar undefined', () => {
  beforeEach(() => {
    const doubleBar = new Bar(anchor, false, DOUBLE);
    doubleBar.changeBar(10, 30);
  });

  afterEach(() => {
    slider.innerHTML = '';
  });

  test('to undefined', () => {
    const doubleBar = new Bar(anchor, false, DOUBLE);
    const bar = () => doubleBar.changeBar(10, undefined);

    expect(bar).toThrow(Error);
    expect(bar).toThrow('to не передан');
  });
});
