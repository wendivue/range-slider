import { JSDOM } from 'jsdom';

import IntervalLabel from 'Ts/View/UI/Label/IntervalLabel';

const dom = new JSDOM('<html><body><div class="anchor"></div></body></html>');
const { document } = dom.window;

const anchor = document.querySelector<HTMLElement>('.anchor');
const handleTemplate = `
  <div class="slider__handle slider__handle_from"></div>
  <div class="slider__handle slider__handle_to"></div>
`;

if (!anchor) throw new Error('anchor - не найдено');

anchor.insertAdjacentHTML('afterbegin', handleTemplate);

const handleFrom = anchor.querySelector<HTMLElement>('.slider__handle_from');
const handleTo = anchor.querySelector<HTMLElement>('.slider__handle_to');
const hasLabels = true;

if (!handleFrom) throw new Error('handleFrom - не найдено');
if (!handleTo) throw new Error('handleTo - не найдено');

describe('IntervalLabel', () => {
  beforeEach(() => {
    const label = new IntervalLabel(anchor, hasLabels);
    label.changeLabelValue('10', '30');
  });

  afterEach(() => {
    handleFrom.innerHTML = '';
    handleTo.innerHTML = '';
  });

  test('should change text', () => {
    const labelFrom = document.querySelector<HTMLInputElement>('.slider__label-text_from');
    const labelTo = document.querySelector<HTMLInputElement>('.slider__label-text_to');

    if (!labelFrom) throw new Error('labelFrom - не найдено');
    if (!labelTo) throw new Error('labelTo - не найдено');

    expect(labelFrom.textContent).toMatch(/10/);
    expect(labelTo.textContent).toMatch(/30/);
  });
});
