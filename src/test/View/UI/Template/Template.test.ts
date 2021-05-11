import { JSDOM } from 'jsdom';
import Template from 'Ts/View/UI/Template/Template';

const dom = new JSDOM('<html><body><div class="anchor"></div></body></html>');
const { document } = dom.window;

const anchor = document.querySelector('.anchor') as HTMLElement;

describe('Template', () => {
  beforeEach(() => new Template(anchor, true));

  afterEach(() => {
    anchor.innerHTML = '';
  });

  test('create modifier vertical', () => {
    const element = document.querySelector(
      '.slider__wrapper_vertical'
    ) as HTMLElement;

    expect(element).toBeTruthy();
  });
});
