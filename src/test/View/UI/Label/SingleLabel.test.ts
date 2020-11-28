import { JSDOM } from 'jsdom';
import SingleLabel from '../../../../ts/View/UI/Label/SingleLabel';

const dom = new JSDOM('<html><body><div class="anchor"></div></body></html>');
const { document } = dom.window;

const anchor = document.querySelector('.anchor') as HTMLElement;
const handleTemplate = `<div class="slider__handle slider__handle--single"></div>`;

anchor.insertAdjacentHTML('afterbegin', handleTemplate);

const handleSingle = anchor.querySelector('.slider__handle--single');

describe('SingleLabel', () => {
  beforeEach(() => {
    const label = new SingleLabel(anchor);
    label.changeLabelValue('10');
  });

  afterEach(() => {
    handleSingle.innerHTML = '';
  });

  test('change text', () => {
    const labelSingle: HTMLInputElement = document.querySelector(
      '.slider__label-text--single'
    );

    expect(labelSingle.textContent).toMatch(/10/);
  });
});
