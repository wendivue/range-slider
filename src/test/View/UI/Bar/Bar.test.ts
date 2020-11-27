import { JSDOM } from 'jsdom';
import Bar from '../../../../ts/View/UI/Bar/Bar';

const dom = new JSDOM('<html><body><div class="anchor"></div></body></html>');
const { document } = dom.window;

const anchor = document.querySelector('.anchor') as HTMLElement;
const sliderTemplate = `<div class="slider__wrapper">`;

anchor.insertAdjacentHTML('afterbegin', sliderTemplate);

const doubleBar = new Bar(anchor, false, 'double');
const singleBar = new Bar(anchor, false, 'single');
const singleBarVertical = new Bar(anchor, true, 'single');
const doubleBarVertical = new Bar(anchor, true, 'double');

describe('doubleBar', () => {
  beforeEach(() => {
    doubleBar.changeBar(10, 30);
  });

  test('.slider__bar rendered', () => {
    const element = document.querySelector('.slider__bar');
    expect(element).not.toBeNull();
  });

  test('change width & left', () => {
    const element: HTMLElement = document.querySelector('.slider__bar');

    expect(element.style.width).toMatch(/20%/);
    expect(element.style.left).toMatch(/10%/);
  });
});

describe('SingleBar', () => {
  beforeEach(() => {
    singleBar.changeBar(15);
  });

  test('.slider__bar rendered', () => {
    const element = document.querySelector('.slider__bar');
    expect(element).not.toBeNull();
  });

  test('change width', () => {
    const element: HTMLElement = document.querySelector('.slider__bar');
    expect(element.style.width).toMatch(/15%/);
  });
});

describe('singleBarVertical', () => {
  beforeEach(() => {
    singleBarVertical.changeBar(15);
  });

  test('.slider__bar rendered', () => {
    const element = document.querySelector('.slider__bar');

    expect(element).not.toBeNull();
  });

  test('change height', () => {
    const element: HTMLElement = document.querySelector('.slider__bar');

    expect(element.style.height).toMatch(/15%/);
  });
});

describe('doubleBarVertical', () => {
  beforeEach(() => {
    doubleBarVertical.changeBar(10, 30);
  });

  test('.slider__bar rendered', () => {
    const element = document.querySelector('.slider__bar');

    expect(element).not.toBeNull();
  });

  test('change height & top', () => {
    const element: HTMLElement = document.querySelector('.slider__bar');

    expect(element.style.height).toMatch(/20%/);
    expect(element.style.top).toMatch(/10%/);
  });
});
