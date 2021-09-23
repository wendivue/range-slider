import { JSDOM } from 'jsdom';
import { IConfig } from 'Helpers/interface';
import Constants from 'Helpers/enums';
import View from 'Ts/View/View';

const { FROM, SINGLE, TO } = Constants;

const dom = new JSDOM(
  '<html><body><div id="azx2" class="anchor" style="width: 100px; height: 20px;"></div></body></html>'
);
const { document } = dom.window;

const anchor = document.querySelector<HTMLElement>('#azx2');

if (!anchor) throw new Error('#slider3 - не найдено');

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
  isInput: true,
  isRange: true,
  isLabel: true,
  isVertical: false,
  isScale: true,
};

const intervalConfig: IConfig = {
  single: 20,
  from: 20,
  to: 50,
  step: 100,
  percentFrom: 2,
  percentTo: 5,
  percentSingle: 0,
  min: 30,
  max: 1000,
  type: 'double',
  isInput: true,
  isRange: true,
  isLabel: true,
  isVertical: false,
  isScale: true,
};

const configUpdate: IConfig = {
  single: 0,
  from: 0,
  to: 100,
  step: 50,
  percentFrom: 0,
  percentTo: 100,
  percentSingle: 0,
  min: 0,
  max: 100,
  type: 'double',
  isInput: true,
  isRange: true,
  isLabel: true,
  isVertical: false,
  isScale: false,
};

const configSingleUpdate: IConfig = {
  single: 50,
  from: 0,
  to: 100,
  step: 50,
  percentFrom: 0,
  percentTo: 100,
  percentSingle: 50,
  min: 0,
  max: 100,
  type: 'single',
  isInput: true,
  isRange: true,
  isLabel: true,
  isVertical: false,
  isScale: false,
};

describe('Create element', () => {
  afterEach(() => {
    anchor.innerHTML = '';
  });

  test('should create handle', () => {
    const view = new View(singleConfig, anchor);
    const { handle } = view.UI;
    if (!handle) throw new Error('handle - не найдено');

    handle.moveElement(23, SINGLE);
    const element = anchor.querySelector<HTMLElement>('.slider__handle_single');

    expect(element).toBeTruthy();
  });

  test('should create bar', () => {
    const view = new View(singleConfig, anchor);
    const { bar } = view.UI;
    if (!bar) throw new Error('bar - не найдено');

    bar.changeBar(23);
    const element = anchor.querySelector<HTMLElement>('.slider__bar');

    expect(element).toBeTruthy();
  });

  test('should create label', () => {
    const view = new View(singleConfig, anchor);
    const { label } = view.UI;
    if (!label) throw new Error('label - не найдено');

    label.changeLabelValue('23');
    const element = anchor.querySelector<HTMLElement>('.slider__label');

    expect(element).toBeTruthy();
  });

  test('should create input', () => {
    const view = new View(singleConfig, anchor);
    const { input } = view.UI;
    if (!input) throw new Error('input - не найдено');

    input.changeValue('23');
    const element = anchor.querySelector<HTMLElement>('.slider__input-wrapper');

    expect(element).toBeTruthy();
  });

  test('should create scale single', () => {
    const view = new View(singleConfig, anchor);
    const { scale } = view.UI;
    if (!scale) throw new Error('scale - не найдено');

    scale.changeScale([0, 50, 100], 0, 100, 50);
    const element = anchor.querySelector<HTMLElement>('.slider__scale');
    const scaleSingle = anchor.querySelector<HTMLInputElement>('.slider__scale_single');

    expect(element).toBeTruthy();
    expect(scaleSingle).toBeTruthy();
  });

  test('should create scale double', () => {
    const view = new View(intervalConfig, anchor);
    const { scale } = view.UI;
    if (!scale) throw new Error('scale - не найдено');

    scale.changeScale([0, 50, 100], 0, 100, 50);
    const element = anchor.querySelector<HTMLElement>('.slider__scale');
    const scaleDouble = anchor.querySelector<HTMLInputElement>('.slider__scale_double');

    expect(element).toBeTruthy();
    expect(scaleDouble).toBeTruthy();
  });
});

describe('Config', () => {
  afterEach(() => {
    anchor.innerHTML = '';
  });

  test('when set from=10 should return 10', () => {
    const view = new View(intervalConfig, anchor);

    view.setConfig({ from: 10 });

    expect(view.config.from).toBe(10);
  });
});

describe('calcPercentage', () => {
  afterEach(() => {
    anchor.innerHTML = '';
    intervalConfig.isVertical = false;
  });

  test('when left=100 should return calculate percentage', () => {
    const view = new View(intervalConfig, anchor);
    const slider = anchor.querySelector<HTMLElement>('.slider__main-wrapper');

    Object.defineProperty(slider, 'offsetWidth', { value: 580 });

    expect(view.calcPercentage(100)).toBe(17.24137931034483);
  });

  test('when left=100 & isVertical = true should return calculate percentage', () => {
    intervalConfig.isVertical = true;
    const view = new View(intervalConfig, anchor);
    const slider = anchor.querySelector<HTMLElement>('.slider__main-wrapper');

    Object.defineProperty(slider, 'offsetHeight', { value: 710 });

    expect(view.calcPercentage(100)).toBe(14.084507042253522);
  });
});

describe('check range type', () => {
  const view = new View(intervalConfig, anchor);

  afterEach(() => {
    anchor.innerHTML = '';
  });

  test('when percentage 2 should return FROM', () => {
    expect(view.validateRangeType(2, FROM)).toBe(FROM);
  });

  test('when percentage 4 should return TO', () => {
    expect(view.validateRangeType(4, FROM)).toBe(TO);
  });

  test('when SINGLE  should always return SINGLE', () => {
    expect(view.validateRangeType(2, SINGLE)).toBe(SINGLE);
  });
});

describe('updateView', () => {
  afterEach(() => {
    anchor.innerHTML = '';
  });

  test('should update View type=double', () => {
    const view = new View(intervalConfig, anchor);
    const arrayStep = [0, 50, 100];
    const configStep = { ...configUpdate, arrayStep };
    const handleFrom = document.querySelector<HTMLElement>('.slider__handle_from');
    const handleTo = document.querySelector<HTMLElement>('.slider__handle_to');
    const inputFrom = document.querySelector<HTMLInputElement>('.input__from');
    const inputTo = document.querySelector<HTMLInputElement>('.input__to');
    const rangeMin = anchor.querySelector<HTMLInputElement>('.slider__range-min');
    const rangeMax = anchor.querySelector<HTMLInputElement>('.slider__range-max');

    if (!handleFrom) throw new Error('handleFrom - не найдено');
    if (!handleTo) throw new Error('handleTo - не найдено');
    if (!inputFrom) throw new Error('inputFrom - не найдено');
    if (!inputTo) throw new Error('inputTo - не найдено');
    if (!rangeMin) throw new Error('rangeMin - не найдено');
    if (!rangeMax) throw new Error('rangeMax - не найдено');

    view.updateView(configStep);

    expect(inputFrom.value).toMatch(/0/);
    expect(inputTo.value).toMatch(/100/);
    expect(handleFrom.style.left).toMatch(/0%/);
    expect(handleTo.style.left).toMatch(/100%/);
    expect(rangeMin.value).toMatch(/0/);
    expect(rangeMax.value).toMatch(/100/);
  });

  test('should update View type=single', () => {
    const view = new View(singleConfig, anchor);
    const arrayStep = [0, 50, 100];
    const configStep = { ...configSingleUpdate, arrayStep };
    const handleSingle = document.querySelector<HTMLElement>('.slider__handle_single');
    const inputSingle = document.querySelector<HTMLInputElement>('.input__single');
    const rangeMin = anchor.querySelector<HTMLInputElement>('.slider__range-min');
    const rangeMax = anchor.querySelector<HTMLInputElement>('.slider__range-max');

    if (!handleSingle) throw new Error('handleSingle - не найдено');
    if (!inputSingle) throw new Error('inputSingle - не найдено');
    if (!rangeMin) throw new Error('rangeMin - не найдено');
    if (!rangeMax) throw new Error('rangeMax - не найдено');

    view.updateView(configStep);

    expect(handleSingle.style.left).toMatch(/50%/);
    expect(inputSingle.value).toMatch(/50/);
    expect(rangeMin.value).toMatch(/0/);
    expect(rangeMax.value).toMatch(/100/);
  });
});
