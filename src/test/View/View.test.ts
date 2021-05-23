import { JSDOM } from 'jsdom';
import { Config } from 'Helpers/interface';
import Constants from 'Helpers/enums';
import View from 'Ts/View/View';

const { FROM, SINGLE, TO } = Constants;

const dom = new JSDOM(
  '<html><body><div id="azx2" class="anchor" style="width: 100px; height: 20px;"></div></body></html>'
);
const { document } = dom.window;

const anchor = document.querySelector('#azx2') as HTMLElement;

const singleConfig: Config = {
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
};

const intervalConfig: Config = {
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

describe('calcPercentage', () => {
  afterEach(() => {
    anchor.innerHTML = '';
  });

  test('get calcPercentage', () => {
    const view = new View(intervalConfig, anchor);

    expect(view.calcPercentage(0.0001)).toBeTruthy();
  });
});

describe('Create element', () => {
  afterEach(() => {
    anchor.innerHTML = '';
  });

  test('create handle', () => {
    const view = new View(singleConfig, anchor);
    view.moveElement(23, SINGLE);
    const handle = anchor.querySelector(
      '.slider__handle_single'
    ) as HTMLElement;

    expect(handle).toBeTruthy();
  });

  test('create bar', () => {
    const view = new View(singleConfig, anchor);
    view.changeBar(23);
    const bar = anchor.querySelector('.slider__bar') as HTMLElement;

    expect(bar).toBeTruthy();
  });

  test('create label', () => {
    const view = new View(singleConfig, anchor);
    view.changeLabelValue('23');
    const label = anchor.querySelector('.slider__label') as HTMLElement;

    expect(label).toBeTruthy();
  });

  test('create input', () => {
    const view = new View(singleConfig, anchor);
    view.changeValue('23');
    const input = anchor.querySelector('.slider__wrapper-input') as HTMLElement;

    expect(input).toBeTruthy();
  });
});
