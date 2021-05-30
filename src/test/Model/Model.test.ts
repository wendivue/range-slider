import { Config } from 'Helpers/interface';
import Constants from 'Helpers/enums';
import Model from 'Ts/Model/Model';

const { FROM, TO, MIN, MAX, TYPE, VERTICAL, DOUBLE, SINGLE, STEP } = Constants;

const config: Config = {
  single: 20,
  from: 20,
  to: 50,
  step: 1,
  percentFrom: 0,
  percentTo: 0,
  percentSingle: 0,
  min: 0,
  max: 1000,
  type: 'double',
  isInput: true,
  isRange: true,
  isLabel: true,
  isVertical: false,
  isScale: false,
};

const configBroke: Config = {
  single: 20,
  from: 80,
  to: 50,
  step: -1,
  percentFrom: 0,
  percentTo: 0,
  percentSingle: 0,
  min: 0,
  max: 1000,
  type: 'double',
  isInput: true,
  isRange: true,
  isLabel: true,
  isVertical: false,
  isScale: false,
};

let model = new Model(config);

describe('Get value', () => {
  afterEach(() => {
    model = new Model(config);
  });

  test('should convert percent to value', () => {
    expect(model.getValue(30)).toBe(300);
    expect(model.getValue(65)).toBe(650);
  });

  test('negative number', () => {
    expect(model.getValue(-2)).toBe(0);
  });

  test('value > max ', () => {
    expect(model.getValue(99999)).toBe(1000);
  });

  test('fractional step', () => {
    model.add(1.5, STEP);

    expect(model.getValue(30)).toBe(300);
  });
});

describe('Get percentage', () => {
  test('should adjust the value', () => {
    config.percentTo = 70;

    expect(model.getPercentage(33, FROM)).toBe(33);
    expect(model.getPercentage(38, FROM)).toBe(38);
  });

  test('negative number', () => {
    expect(model.getPercentage(-20, FROM)).toBe(0);
  });

  test('percentage > max', () => {
    expect(model.getPercentage(999, TO)).toBe(100);
  });

  test('percentage(from) > to', () => {
    config.percentTo = 69.9;

    expect(model.getPercentage(80, FROM)).toBe(69.80000000000001);
  });

  test('percentage(to) < from', () => {
    config.percentFrom = 30.1;

    expect(model.getPercentage(20, TO)).toBe(30.200000000000003);
  });
});

describe('Get percentage(input)', () => {
  test('should convert value to percent', () => {
    expect(model.getPercentageInput(30)).toBe(3);
    expect(model.getPercentageInput(700)).toBe(70);
  });
});

describe('Get value from config', () => {
  test('should get value from config', () => {
    expect(model.get(MIN)).toBe(0);
    expect(model.get(TYPE)).toBe(DOUBLE);
    expect(model.get(VERTICAL)).toBe(false);
  });
});

describe('Set value from config', () => {
  afterEach(() => {
    model = new Model(config);
  });

  test('should get value from config', () => {
    model.add(60, MIN);
    model.add(SINGLE, TYPE);
    model.add(true, VERTICAL);

    expect(model.get(MIN)).toBe(60);
    expect(model.get(TYPE)).toBe(SINGLE);
    expect(model.get(VERTICAL)).toBe(true);
  });
});

describe('Validate step', () => {
  afterEach(() => {
    model = new Model(config);
  });

  test('value > 0.5', () => {
    expect(model.validateStep(0.3)).toBe(0.5);
  });

  test('value > max', () => {
    model.add(990, MIN);
    expect(model.validateStep(600)).toBe(10);
  });
});

describe('Config', () => {
  afterEach(() => {
    model = new Model(config);
  });

  test('get config', () => {
    expect(model.getConfig()).toBe(config);
  });

  test('set config', () => {
    model.setConfig(configBroke);

    expect(model.getConfig()).toStrictEqual(configBroke);
  });
});

describe('Validate range', () => {
  test('validate', () => {
    expect(model.validateRange(22, MIN)).toBe(22);
    expect(model.validateRange(2000, MIN)).toBe(999);
    expect(model.validateRange(10, MAX)).toBe(10);
    expect(model.validateRange(0, MAX)).toBe(2);
  });
});

describe('validate Two Handle Value', () => {
  afterEach(() => {
    model = new Model(config);
  });

  test('from > to', () => {
    expect(model.validateTwoHandleValue(60, FROM)).toBe(49);
    model.add(1000, TO);
    expect(model.validateTwoHandleValue(1100, FROM)).toBe(999);
  });

  test('to < from', () => {
    expect(model.validateTwoHandleValue(4, TO)).toBe(21);
    model.add(0, FROM);
    expect(model.validateTwoHandleValue(-4, TO)).toBe(1);
  });
});
