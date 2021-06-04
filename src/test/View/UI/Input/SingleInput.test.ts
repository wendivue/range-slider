import { JSDOM } from 'jsdom';
import SingleInput from 'Ts/View/UI/Input/SingleInput';

const dom = new JSDOM('<html><body><div class="anchor"></div></body></html>');
const { document } = dom.window;

const anchor = document.querySelector('.anchor') as HTMLElement;
const sliderTemplate = `<div class="slider__main-wrapper">`;

anchor.insertAdjacentHTML('afterbegin', sliderTemplate);

const slider = document.querySelector('.slider__main-wrapper') as HTMLElement;

describe('SingleInput', () => {
  beforeEach(() => {
    const input = new SingleInput(anchor);
    input.changeValue('10');
  });

  afterEach(() => {
    slider.innerHTML = '';
  });

  test('should change value', () => {
    const inputSingle = document.querySelector(
      '.input__single'
    ) as HTMLInputElement;

    expect(inputSingle.value).toMatch(/10/);
  });
});
