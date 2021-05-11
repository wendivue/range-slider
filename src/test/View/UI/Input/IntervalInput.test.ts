import { JSDOM } from 'jsdom';
import IntervalInput from 'Ts/View/UI/Input/IntervalInput';

const dom = new JSDOM('<html><body><div class="anchor"></div></body></html>');
const { document } = dom.window;

const anchor = document.querySelector('.anchor') as HTMLElement;
const sliderTemplate = `<div class="slider__wrapper">`;

anchor.insertAdjacentHTML('afterbegin', sliderTemplate);

const slider = document.querySelector('.slider__wrapper') as HTMLElement;

if (!slider) throw new Error('.slider__wrapper - не найдено');

describe('IntervalInput', () => {
  beforeEach(() => {
    const input = new IntervalInput(anchor);
    input.changeValue('10', '20');
  });

  afterEach(() => {
    slider.innerHTML = '';
  });

  test('change value', () => {
    const inputFrom = document.querySelector(
      '.input__from'
    ) as HTMLInputElement;
    const inputTo = document.querySelector('.input__to') as HTMLInputElement;

    if (!inputFrom) throw new Error('.input__from - не найдено');
    if (!inputTo) throw new Error('.input__to - не найдено');

    expect(inputFrom.value).toMatch(/10/);
    expect(inputTo.value).toMatch(/20/);
  });
});

describe('Input undefined', () => {
  beforeEach(() => {
    const input = new IntervalInput(anchor);
    input.changeValue('10', '20');
  });

  afterEach(() => {
    slider.innerHTML = '';
  });

  test('to undefined', () => {
    const input = new IntervalInput(anchor);
    const item = () => input.changeValue('10', undefined);

    expect(item).toThrow(Error);
    expect(item).toThrow('toValue не передан');
  });
});
