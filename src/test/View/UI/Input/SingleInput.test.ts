import { JSDOM } from 'jsdom';
import SingleInput from '../../../../ts/View/UI/Input/SingleInput';

const dom = new JSDOM('<html><body><div class="anchor"></div></body></html>');
const { document } = dom.window;

const anchor = document.querySelector('.anchor') as HTMLElement;
const sliderTemplate = `<div class="slider__wrapper">`;

anchor.insertAdjacentHTML('afterbegin', sliderTemplate);

const slider = document.querySelector('.slider__wrapper');

describe('SingleInput', () => {
  beforeEach(() => {
    const input = new SingleInput(anchor);
    input.changeValue('10');
  });

  afterEach(() => {
    slider.innerHTML = '';
  });

  test('change value', () => {
    const inputSingle: HTMLInputElement = document.querySelector(
      '.input__single'
    );

    expect(inputSingle.value).toMatch(/10/);
  });
});
