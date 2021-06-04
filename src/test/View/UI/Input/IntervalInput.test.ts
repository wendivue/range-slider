import { JSDOM } from 'jsdom';
import IntervalInput from 'Ts/View/UI/Input/IntervalInput';

const dom = new JSDOM('<html><body><div class="anchor"></div></body></html>');
const { document } = dom.window;

const anchor = document.querySelector('.anchor') as HTMLElement;
const sliderTemplate = `<div class="slider__main-wrapper">`;

anchor.insertAdjacentHTML('afterbegin', sliderTemplate);

const slider = document.querySelector('.slider__main-wrapper') as HTMLElement;

describe('IntervalInput', () => {
  beforeEach(() => {
    const input = new IntervalInput(anchor);
    input.changeValue('10', '20');
  });

  afterEach(() => {
    slider.innerHTML = '';
  });

  test('should change value', () => {
    const inputFrom = document.querySelector(
      '.input__from'
    ) as HTMLInputElement;
    const inputTo = document.querySelector('.input__to') as HTMLInputElement;

    expect(inputFrom.value).toMatch(/10/);
    expect(inputTo.value).toMatch(/20/);
  });
});
