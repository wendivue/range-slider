import { JSDOM } from 'jsdom';
import SingleLabel from 'Ts/View/UI/Label/SingleLabel';

const dom = new JSDOM('<html><body><div class="anchor"></div></body></html>');
const { document } = dom.window;

const anchor = document.querySelector('.anchor') as HTMLElement;
const handleTemplate = `<div class="slider__handle slider__handle_single"></div>`;

anchor.insertAdjacentHTML('afterbegin', handleTemplate);

const handleSingle = anchor.querySelector('.slider__handle_single');
const isLabel = true;

if (!handleSingle) throw new Error('.slider__handle_single - не найдено');

describe('SingleLabel', () => {
  beforeEach(() => {
    const label = new SingleLabel(anchor, isLabel);
    label.changeLabelValue('10');
  });

  afterEach(() => {
    handleSingle.innerHTML = '';
  });

  test('change text', () => {
    const labelSingle = document.querySelector(
      '.slider__label-text_single'
    ) as HTMLInputElement;

    if (!labelSingle)
      throw new Error('.slider__label-text_single - не найдено');

    expect(labelSingle.textContent).toMatch(/10/);
  });
});
