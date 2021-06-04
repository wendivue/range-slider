import { JSDOM } from 'jsdom';
import Range from 'Ts/View/UI/Range/Range';

const dom = new JSDOM('<html><body><div class="anchor"></div></body></html>');
const { document } = dom.window;

const anchor = document.querySelector('.anchor') as HTMLElement;
const sliderTemplate = `<div class="slider__main-wrapper">`;

anchor.insertAdjacentHTML('afterbegin', sliderTemplate);

const slider = document.querySelector('.slider__main-wrapper') as HTMLElement;
const range = new Range(anchor, 10, 100);

describe('Range', () => {
  afterEach(() => {
    slider.innerHTML = '';
  });

  test('should return min=30 & max=110', () => {
    const rangeMin = anchor.querySelector(
      '.slider__range-min'
    ) as HTMLInputElement;
    const rangeMax = anchor.querySelector(
      '.slider__range-max'
    ) as HTMLInputElement;

    range.changeValue('30', '110');

    expect(rangeMin.value).toMatch(/30/);
    expect(rangeMax.value).toMatch(/110/);
  });
});
