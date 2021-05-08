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

    const handle: HTMLElement = document.querySelector(
      '.slider__handle_single'
    );

    expect(view.checkElementType(handle)).toBe(SINGLE);
  });

  describe('Check type interval', () => {
    afterEach(() => {
      anchor.innerHTML = '';
    });

    test('get from & to', () => {
      const view = new View(intervalConfig, anchor);

      const handleFrom: HTMLElement = document.querySelector(
        '.slider__handle_from'
      );
      const handleTo: HTMLElement = document.querySelector(
        '.slider__handle_to'
      );

      expect(view.checkElementType(handleFrom)).toBe(FROM);
      expect(view.checkElementType(handleTo)).toBe(TO);
    });
  });
});
