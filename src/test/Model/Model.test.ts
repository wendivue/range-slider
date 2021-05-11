import { Config } from 'Helpers/interface';
import Constants from 'Helpers/enums';
import Model from 'Ts/Model/Model';

const { FROM, TO, MIN, TYPE, VERTICAL, DOUBLE, SINGLE } = Constants;

const config: Config = {
  single: 20,
  from: 20,
  to: 50,
  step: 100,
  percentFrom: 0,
  percentTo: 0,
  percentSingle: 0,
  min: 30,
  max: 1000,
  type: 'double',
  isInput: true,
  isRange: true,
  isLabel: true,
  isVertical: false,
};

let model = new Model(config);

describe('Get value', () => {
  test('should convert percent to value', () => {
    expect(model.getValue(30)).toBe(321);
    expect(model.getValue(65)).toBe(661);
  });

  test('negative number', () => {
    expect(model.getValue(-2)).toBe(30);
  });

  test('value > max ', () => {
    expect(model.getValue(99999)).toBe(1000);
  });
});

describe('Get percentage', () => {
  test('should adjust the value', () => {
    config.percentTo = 70;

    expect(model.getPercentage(33, FROM)).toBe(30);
    expect(model.getPercentage(38, FROM)).toBe(40);
  });

  test('negative number', () => {
    expect(model.getPercentage(-20, FROM)).toBe(0);
  });

  test('percentage > max', () => {
    expect(model.getPercentage(999, TO)).toBe(100);
  });

  test('percentage(from) > to', () => {
    config.percentTo = 70;

    expect(model.getPercentage(80, FROM)).toBe(70);
  });

  test('percentage(to) < from', () => {
    config.percentFrom = 30;

    expect(model.getPercentage(20, TO)).toBe(30);
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
    expect(model.get(MIN)).toBe(30);
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
  test('value > 0.5', () => {
    expect(model.validateStep(0.3)).toBe(0.5);
  });

  test('value > max', () => {
    expect(model.validateStep(600)).toBe(500);
  });
});

describe('Config', () => {
  test('get config', () => {
    expect(model.getConfig()).toBe(config);
  });
});
