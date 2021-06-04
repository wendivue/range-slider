import { JSDOM } from 'jsdom';
import Constants from 'Helpers/enums';
import IntervalHandle from 'Ts/View/UI/Handle/IntervalHandle';

const { FROM, TO } = Constants;

const dom = new JSDOM('<html><body><div class="anchor"></div></body></html>');
const { document } = dom.window;

const anchor = document.querySelector('.anchor') as HTMLElement;
const sliderTemplate = `<div class="slider__wrapper">`;

anchor.insertAdjacentHTML('afterbegin', sliderTemplate);

const slider = document.querySelector('.slider__wrapper') as HTMLElement;

describe('handleFrom', () => {
  beforeEach(() => {
    const handleFrom = new IntervalHandle(anchor, false);
    handleFrom.moveElement(10, FROM);
  });

  afterEach(() => {
    slider.innerHTML = '';
  });

  test('should change left', () => {
    const element = document.querySelector(
      '.slider__handle_from'
    ) as HTMLElement;
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

  test('should change left', () => {
    const element = document.querySelector('.slider__handle_to') as HTMLElement;
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

  test('should change top', () => {
    const element = document.querySelector(
      '.slider__handle_from'
    ) as HTMLElement;
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

  test('should change top', () => {
    const element = document.querySelector('.slider__handle_to') as HTMLElement;

    expect(element.style.top).toMatch(/10%/);
  });
});
