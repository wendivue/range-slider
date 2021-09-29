import { JSDOM } from 'jsdom';
import SingleLabel from 'Ts/View/UI/Label/SingleLabel';

const dom = new JSDOM('<html><body><div class="anchor"></div></body></html>');
const { document } = dom.window;

const anchor = document.querySelector<HTMLElement>('.anchor');
const handleTemplate = `<div class="slider__handle slider__handle_single"></div>`;

if (!anchor) throw new Error('anchor - не найдено');

anchor.insertAdjacentHTML('afterbegin', handleTemplate);

const handleSingle = anchor.querySelector<HTMLElement>('.slider__handle_single');
const hasLabels = true;

if (!handleSingle) throw new Error('handleSingle - не найдено');

describe('SingleLabel', () => {
  beforeEach(() => {
    const label = new SingleLabel(anchor, hasLabels);
    label.changeLabelValue('10');
  });

  afterEach(() => {
    handleSingle.innerHTML = '';
  });

  test('change text', () => {
    const labelSingle = document.querySelector<HTMLInputElement>('.slider__label-text_single');

    if (!labelSingle) throw new Error('labelSingle - не найдено');

    expect(labelSingle.textContent).toMatch(/10/);
  });
});
