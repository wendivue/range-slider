import { JSDOM } from 'jsdom';
import Scale from 'Ts/View/UI/Scale/Scale';
import Constants from 'Helpers/enums';
import View from 'Ts/View/View';
import { IConfig } from 'Helpers/interface';

const singleConfig: IConfig = {
  single: 20,
  from: 20,
  to: 50,
  step: 100,
  percentFrom: 0,
  percentTo: 0,
  percentSingle: 0,
  min: 30,
  max: 1000,
  type: 'single',
  isInput: true,
  isRange: true,
  isLabel: true,
  isVertical: false,
  isScale: true,
};

const { SINGLE } = Constants;

const dom = new JSDOM('<html><body><div class="anchor"></div></body></html>');
const { document } = dom.window;

const anchor = document.querySelector<HTMLElement>('.anchor');
const sliderTemplate = `<div class="slider__main-wrapper">`;

if (!anchor) throw new Error('anchor - не найдено');

anchor.insertAdjacentHTML('afterbegin', sliderTemplate);

const slider = document.querySelector<HTMLElement>('.slider__main-wrapper');
const view = new View(singleConfig, anchor);

if (!slider) throw new Error('slider - не найдено');

describe('Scale', () => {
  afterEach(() => {
    slider.innerHTML = '';
  });

  test('should change scale', () => {
    const scale = new Scale(anchor, false, SINGLE, view);
    scale.changeScale([0, 40, 80, 100], 0, 100, 40);

    const element: NodeListOf<HTMLElement> = document.querySelectorAll('.slider__scale-item');

    expect(element[0].style.left).toMatch(/0%/);
    expect(element[2].style.left).toMatch(/100%/);
  });

  test('should change vertical scale', () => {
    const scale = new Scale(anchor, true, SINGLE, view);
    scale.changeScale([0, 40, 80, 100], 0, 100, 40);

    const element: NodeListOf<HTMLElement> = document.querySelectorAll('.slider__scale-item');

    expect(element[0].style.top).toMatch(/0%/);
    expect(element[2].style.top).toMatch(/100%/);
  });

  test('when step fractional should return fractional percent', () => {
    const scale = new Scale(anchor, false, SINGLE, view);
    scale.changeScale([0, 40.5, 81, 100], 0, 100, 40.5);

    const element: NodeListOf<HTMLElement> = document.querySelectorAll('.slider__scale-item');

    expect(element[0].style.left).toMatch(/0%/);
    expect(element[1].style.left).toMatch(/40.5%/);
  });

  test('when newPercentage.length > maxLength should remove unnecessary values', () => {
    const scale = new Scale(anchor, false, SINGLE, view);
    scale.changeScale(
      [0, 5, 10, 15, 20, 25, 30, 40, 50, 55, 60, 70, 80, 85, 90, 100],
      0,
      100,
      40.5
    );

    const element: NodeListOf<HTMLElement> = document.querySelectorAll('.slider__scale-item');

    expect(element[0].style.left).toMatch(/0%/);
    expect(element[2].style.left).toMatch(/40%/);
  });
});
