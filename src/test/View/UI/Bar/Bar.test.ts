import { JSDOM } from 'jsdom';
import Bar from 'Ts/View/UI/Bar/Bar';

const dom = new JSDOM('<html><body><div class="anchor"></div></body></html>');
const { document } = dom.window;

const anchor = document.querySelector('.anchor') as HTMLElement;
const sliderTemplate = `<div class="slider__wrapper">`;

anchor.insertAdjacentHTML('afterbegin', sliderTemplate);

const slider = document.querySelector('.slider__wrapper');

describe('doubleBar', () => {
  beforeEach(() => {
    const doubleBar = new Bar(anchor, false, 'double');
    doubleBar.changeBar(10, 30);
  });

  afterEach(() => {
    slider.innerHTML = '';
  });

  test('change width & left', () => {
    const element: HTMLElement = document.querySelector('.slider__bar');

    expect(element.style.width).toMatch(/20%/);
    expect(element.style.left).toMatch(/10%/);
  });
});

describe('SingleBar', () => {
  beforeEach(() => {
    const singleBar = new Bar(anchor, false, 'single');
    singleBar.changeBar(15);
  });

  afterEach(() => {
    slider.innerHTML = '';
  });

  test('change width', () => {
    const element: HTMLElement = document.querySelector('.slider__bar');
    expect(element.style.width).toMatch(/15%/);
  });
});

describe('singleBarVertical', () => {
  beforeEach(() => {
    const singleBarVertical = new Bar(anchor, true, 'single');
    singleBarVertical.changeBar(15);
  });

  afterEach(() => {
    slider.innerHTML = '';
  });

  test('change height', () => {
    const element: HTMLElement = document.querySelector('.slider__bar');

    expect(element.style.height).toMatch(/15%/);
  });
});

describe('doubleBarVertical', () => {
  beforeEach(() => {
    const doubleBarVertical = new Bar(anchor, true, 'double');
    doubleBarVertical.changeBar(10, 30);
  });

  afterEach(() => {
    slider.innerHTML = '';
  });

  test('change height & top', () => {
    const element: HTMLElement = document.querySelector('.slider__bar');

    expect(element.style.height).toMatch(/20%/);
    expect(element.style.top).toMatch(/10%/);
  });
});
