import { JSDOM } from 'jsdom';
import SingleHandle from '../../../../ts/View/UI/Handle/SingleHandle';

const dom = new JSDOM('<html><body><div class="anchor"></div></body></html>');
const { document } = dom.window;

const anchor = document.querySelector('.anchor') as HTMLElement;
const sliderTemplate = `<div class="slider__wrapper">`;

anchor.insertAdjacentHTML('afterbegin', sliderTemplate);

const slider = document.querySelector('.slider__wrapper');

describe('SingleHandle', () => {
  beforeEach(() => {
    const handle = new SingleHandle(anchor, false);
    handle.moveElement(10);
  });

  afterEach(() => {
    slider.innerHTML = '';
  });

  test('change left', () => {
    const element: HTMLElement = document.querySelector(
      '.slider__handle--single'
    );
    expect(element.style.left).toMatch(/10%/);
  });
});

describe('SingleHandleVertical', () => {
  beforeEach(() => {
    const handleVertical = new SingleHandle(anchor, true);
    handleVertical.moveElement(10);
  });

  afterEach(() => {
    slider.innerHTML = '';
  });

  test('change top', () => {
    const element: HTMLElement = document.querySelector(
      '.slider__handle--single'
    );
    expect(element.style.top).toMatch(/10%/);
  });
});
