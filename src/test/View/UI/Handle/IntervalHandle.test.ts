import { JSDOM } from 'jsdom';
import { FROM, TO } from 'Helpers/constants';
import IntervalHandle from 'Ts/View/UI/Handle/IntervalHandle';

const dom = new JSDOM('<html><body><div class="anchor"></div></body></html>');
const { document } = dom.window;

const anchor = document.querySelector('.anchor') as HTMLElement;
const sliderTemplate = `<div class="slider__wrapper">`;

anchor.insertAdjacentHTML('afterbegin', sliderTemplate);

const slider = document.querySelector('.slider__wrapper');

describe('handleFrom', () => {
  beforeEach(() => {
    const handleFrom = new IntervalHandle(anchor, false);
    handleFrom.moveElement(10, FROM);
  });

  afterEach(() => {
    slider.innerHTML = '';
  });

  test('change left', () => {
    const element: HTMLElement = document.querySelector(
      '.slider__handle--from'
    );
    expect(element.style.left).toMatch(/10%/);
  });
});

describe('handleTo', () => {
  beforeEach(() => {
    const handleTo = new IntervalHandle(anchor, false);
    handleTo.moveElement(10, TO);
  });

  afterEach(() => {
    slider.innerHTML = '';
  });

  test('change left', () => {
    const element: HTMLElement = document.querySelector('.slider__handle--to');
    expect(element.style.left).toMatch(/10%/);
  });
});

describe('handleFromVertical', () => {
  beforeEach(() => {
    const handleFromVertical = new IntervalHandle(anchor, true);
    handleFromVertical.moveElement(10, FROM);
  });

  afterEach(() => {
    slider.innerHTML = '';
  });

  test('change top', () => {
    const element: HTMLElement = document.querySelector(
      '.slider__handle--from'
    );
    expect(element.style.top).toMatch(/10%/);
  });
});

describe('handleToVertical', () => {
  beforeEach(() => {
    const handleToVertical = new IntervalHandle(anchor, true);
    handleToVertical.moveElement(10, TO);
  });

  afterEach(() => {
    slider.innerHTML = '';
  });

  test('change top', () => {
    const element: HTMLElement = document.querySelector('.slider__handle--to');
    expect(element.style.top).toMatch(/10%/);
  });
});
