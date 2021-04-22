import { JSDOM } from 'jsdom';
import IntervalLabel from 'Ts/View/UI/Label/IntervalLabel';

const dom = new JSDOM('<html><body><div class="anchor"></div></body></html>');
const { document } = dom.window;

const anchor = document.querySelector('.anchor') as HTMLElement;
const handleTemplate = `
  <div class="slider__handle slider__handle_from"></div>
  <div class="slider__handle slider__handle_to"></div>
`;

anchor.insertAdjacentHTML('afterbegin', handleTemplate);

const handleFrom = anchor.querySelector('.slider__handle_from');
const handleTo = anchor.querySelector('.slider__handle_to');

describe('IntervalLabel', () => {
  beforeEach(() => {
    const label = new IntervalLabel(anchor);
    label.changeLabelValue('10', '30');
  });

  afterEach(() => {
    handleFrom.innerHTML = '';
    handleTo.innerHTML = '';
  });

  test('change text', () => {
    const labelFrom: HTMLInputElement = document.querySelector(
      '.slider__label-text_from'
    );

    const labelTo: HTMLInputElement = document.querySelector(
      '.slider__label-text_to'
    );

    expect(labelFrom.textContent).toMatch(/10/);
    expect(labelTo.textContent).toMatch(/30/);
  });
});
