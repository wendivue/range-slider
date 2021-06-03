import { JSDOM } from 'jsdom';
import { IConfig } from 'Helpers/interface';
import Constants from 'Helpers/enums';
import View from 'Ts/View/View';
import { IUI } from 'Ts/View/IView';

const { FROM, SINGLE, TO, MIN, MAX } = Constants;

const dom = new JSDOM(
  '<html><body><div id="azx2" class="anchor" style="width: 100px; height: 20px;"></div></body></html>'
);
const { document } = dom.window;

const anchor = document.querySelector('#azx2') as HTMLElement;

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

const intervalConfig: IConfig = {
  single: 20,
  from: 20,
  to: 50,
  step: 100,
  percentFrom: 0,
  percentTo: 0,
  percentSingle: 0,
  min: 30,
  max: 1000,
  type: 'double',
  isInput: true,
  isRange: true,
  isLabel: true,
  isVertical: false,
  isScale: false,
};

describe('Check type single', () => {
  afterEach(() => {
    anchor.innerHTML = '';
  });

  test('get single', () => {
    const view = new View(singleConfig, anchor);

    const handle = document.querySelector(
      '.slider__handle_single'
    ) as HTMLElement;

    expect(view.checkElementType(handle)).toBe(SINGLE);
  });

  describe('Check type interval', () => {
    afterEach(() => {
      anchor.innerHTML = '';
    });

    test('get from & to', () => {
      const view = new View(intervalConfig, anchor);

      const handleFrom = document.querySelector(
        '.slider__handle_from'
      ) as HTMLElement;
      const handleTo = document.querySelector(
        '.slider__handle_to'
      ) as HTMLElement;

      expect(view.checkElementType(handleFrom)).toBe(FROM);
      expect(view.checkElementType(handleTo)).toBe(TO);
    });
  });
});

describe('getElement', () => {
  afterEach(() => {
    anchor.innerHTML = '';
  });

  test('get element', () => {
    const view = new View(intervalConfig, anchor);
    const rangeMin = anchor.querySelector(
      '.slider__range-min'
    ) as HTMLInputElement;
    const rangeMax = anchor.querySelector(
      '.slider__range-max'
    ) as HTMLInputElement;

    expect(view.getElement(MIN)).toBe(rangeMin);
    expect(view.getElement(MAX)).toBe(rangeMax);
  });
});

describe('Create element', () => {
  afterEach(() => {
    anchor.innerHTML = '';
  });

  test('create handle', () => {
    const view = new View(singleConfig, anchor);
    const { handle } = view.UI as IUI;

    handle.moveElement(23, SINGLE);

    const element = anchor.querySelector(
      '.slider__handle_single'
    ) as HTMLElement;

    expect(element).toBeTruthy();
  });

  test('create bar', () => {
    const view = new View(singleConfig, anchor);
    const { bar } = view.UI as IUI;

    bar.changeBar(23);
    const element = anchor.querySelector('.slider__bar') as HTMLElement;

    expect(element).toBeTruthy();
  });

  test('create label', () => {
    const view = new View(singleConfig, anchor);
    const { label } = view.UI as IUI;

    label.changeLabelValue('23');

    const element = anchor.querySelector('.slider__label') as HTMLElement;

    expect(element).toBeTruthy();
  });

  test('create input', () => {
    const view = new View(singleConfig, anchor);
    const { input } = view.UI as IUI;

    input.changeValue('23');
    const element = anchor.querySelector(
      '.slider__wrapper-input'
    ) as HTMLElement;

    expect(element).toBeTruthy();
  });

  test('create scale single', () => {
    const view = new View(singleConfig, anchor);
    const { scale } = view.UI as IUI;

    scale.changeScale([0, 50, 100], 0, 100, 50);
    const element = anchor.querySelector('.slider__scale') as HTMLElement;
    const scaleSingle = anchor.querySelector(
      '.slider__scale_single'
    ) as HTMLInputElement;

    expect(element).toBeTruthy();
    expect(scaleSingle).toBeTruthy();
  });

  test('create scale double', () => {
    const view = new View(intervalConfig, anchor);
    const { scale } = view.UI as IUI;

    scale.changeScale([0, 50, 100], 0, 100, 50);
    const element = anchor.querySelector('.slider__scale') as HTMLElement;
    const scaleDouble = anchor.querySelector(
      '.slider__scale_double'
    ) as HTMLInputElement;

    expect(element).toBeTruthy();
    expect(scaleDouble).toBeTruthy();
  });
});
