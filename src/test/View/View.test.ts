import { JSDOM } from 'jsdom';
import View from '../../ts/View/View';
import { Config } from '../../ts/helpers/interface';
import { FROM, SINGLE, TO } from '../../ts/helpers/constants';

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
  persentFrom: 0,
  persentTo: 0,
  persentSingle: 0,
  min: 30,
  max: 1000,
  type: 'single',
  input: true,
  range: true,
  label: true,
  vertical: false,
};

const intervalConfig: Config = {
  single: 20,
  from: 20,
  to: 50,
  step: 100,
  persentFrom: 0,
  persentTo: 0,
  persentSingle: 0,
  min: 30,
  max: 1000,
  type: 'double',
  input: true,
  range: true,
  label: true,
  vertical: false,
};

describe('Check type single', () => {
  afterEach(() => {
    anchor.innerHTML = '';
  });

  test('get single', () => {
    const view = new View(singleConfig, anchor);

    const handle: HTMLElement = document.querySelector(
      '.slider__handle--single'
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
        '.slider__handle--from'
      );
      const handleTo: HTMLElement = document.querySelector(
        '.slider__handle--to'
      );

      expect(view.checkElementType(handleFrom)).toBe(FROM);
      expect(view.checkElementType(handleTo)).toBe(TO);
    });
  });
});
