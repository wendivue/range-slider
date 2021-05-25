import { JSDOM } from 'jsdom';
import Template from 'Ts/View/UI/Template/Template';
import Constants from 'Helpers/enums';

const { SINGLE } = Constants;

const dom = new JSDOM('<html><body><div class="anchor"></div></body></html>');
const { document } = dom.window;

const anchor = document.querySelector('.anchor') as HTMLElement;

describe('Template', () => {
  beforeEach(() => new Template(anchor, true, SINGLE));

  afterEach(() => {
    anchor.innerHTML = '';
  });

  test('create modifier vertical', () => {
    const element = document.querySelector(
      '.slider__main-wrapper_vertical'
    ) as HTMLElement;

    expect(element).toBeTruthy();
  });
});
