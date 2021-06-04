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

const handleFrom = anchor.querySelector('.slider__handle_from') as HTMLElement;
const handleTo = anchor.querySelector('.slider__handle_to') as HTMLElement;
const isLabel = true;

describe('IntervalLabel', () => {
  beforeEach(() => {
    const label = new IntervalLabel(anchor, isLabel);
    label.changeLabelValue('10', '30');
  });

  afterEach(() => {
    handleFrom.innerHTML = '';
    handleTo.innerHTML = '';
  });

  test('should change text', () => {
    const labelFrom = document.querySelector(
      '.slider__label-text_from'
    ) as HTMLInputElement;
    const labelTo = document.querySelector(
      '.slider__label-text_to'
    ) as HTMLInputElement;

    expect(labelFrom.textContent).toMatch(/10/);
    expect(labelTo.textContent).toMatch(/30/);
  });
});
