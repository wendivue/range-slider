import { JSDOM } from 'jsdom';

import View from 'Ts/View/View';
import Template from 'Ts/View/UI/Template/Template';
import Constants from 'Helpers/enums';
import { IConfig } from 'Helpers/interface';

const { SINGLE } = Constants;

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
  hasInputs: true,
  hasRange: true,
  hasLabels: true,
  isVertical: false,
  hasScale: true,
};

const dom = new JSDOM('<html><body><div class="anchor"></div></body></html>');
const { document } = dom.window;

const anchor = document.querySelector<HTMLElement>('.anchor');

if (!anchor) throw new Error('anchor - не найдено');

const view = new View(singleConfig, anchor);

describe('Template', () => {
  beforeEach(() => new Template(anchor, true, SINGLE, view));

  afterEach(() => {
    anchor.innerHTML = '';
  });

  test('should create modifier vertical', () => {
    const element = document.querySelector<HTMLElement>('.slider__main-wrapper_vertical');

    expect(element).toBeTruthy();
  });
});
