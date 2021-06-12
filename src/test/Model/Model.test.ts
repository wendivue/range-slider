import { IConfig } from 'Helpers/interface';
import Constants from 'Helpers/enums';
import Model from 'Ts/Model/Model';

const { FROM, TO, MIN, MAX, TYPE, VERTICAL, DOUBLE, SINGLE, STEP } = Constants;

const config: IConfig = {
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

const configBroke: IConfig = {
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

const configFix: IConfig = {
  single: 20,
  from: 49,
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

const configInit: IConfig = {
  single: 20,
  from: 20,
  to: 50,
  step: 1,
  percentFrom: 2,
  percentTo: 5,
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
    config.step = 1;
    model = new Model(config);
  });

  test('should convert percent to value', () => {
    expect(model.getValue(30)).toBe(300);
    expect(model.getValue(65)).toBe(650);
  });

  test('should validate negative number', () => {
    expect(model.getValue(-2)).toBe(0);
  });

  test('when value > max should return max', () => {
    expect(model.getValue(99999)).toBe(1000);
  });

  test('when fractional step should return fractional value', () => {
    model.add(1.5, STEP);

    expect(model.getValue(30.55)).toBe(305.5);
  });
});

describe('Get percentage', () => {
  afterEach(() => {
    config.percentFrom = 0;
    config.percentTo = 0;
    model = new Model(config);
  });

  test('when from=33 should return 33', () => {
    config.percentTo = 70;

    expect(model.getPercentage(33, FROM)).toBe(33);
  });

  test('when percentage > max should return 100', () => {
    expect(model.getPercentage(999, TO)).toBe(100);
  });

  test('when from > to should return to - stepPercent', () => {
    config.percentTo = 69.9;

    expect(model.getPercentage(80, FROM)).toBe(69.80000000000001);
  });

  test('when to < from should return from + stepPercent', () => {
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

  test('when value > 0.5 should return 0.5', () => {
    expect(model.validateStep(0.3)).toBe(0.5);
  });

  test('when step > max should return step <= max - min', () => {
    model.add(990, MIN);
    expect(model.validateStep(600)).toBe(10);
  });
});

describe('Config', () => {
  afterEach(() => {
    model = new Model(config);
  });

  test('should get config', () => {
    expect(model.getConfig()).toBe(config);
  });

  test('when not validate config should fix config', () => {
    model.setConfig(configBroke);

    expect(model.getConfig()).toStrictEqual(configFix);
  });
});

describe('Validate range', () => {
  test('should validate range', () => {
    expect(model.validateRange(22, MIN)).toBe(22);
    expect(model.validateRange(2000, MIN)).toBe(999);
    expect(model.validateRange(10, MAX)).toBe(10);
    expect(model.validateRange(0, MAX)).toBe(1);
  });
});

describe('validate Two Handle Value', () => {
  afterEach(() => {
    model = new Model(config);
  });

  test('when from > to should return to - step', () => {
    expect(model.validateTwoHandleValue(60, FROM)).toBe(49);
    model.add(1000, TO);
    expect(model.validateTwoHandleValue(1100, FROM)).toBe(999);
  });

  test('when to < from should return from + step', () => {
    expect(model.validateTwoHandleValue(4, TO)).toBe(21);
    model.add(0, FROM);
    expect(model.validateTwoHandleValue(-4, TO)).toBe(1);
  });
});

describe('Counting', () => {
  afterEach(() => {
    model = new Model(config);
  });

  test('when value 3 should return percentage 30', () => {
    const callback = jest.fn();

    model.subscribe(callback);

    model.counting({ single: 3, elementType: SINGLE });
    const newConfig = model.getConfig();

    expect(callback).toHaveBeenCalled();
    expect(newConfig.single).toBe(30);
  });

  test('when isInput=true set should set isInput=true', () => {
    const callback = jest.fn();

    model.subscribe(callback);

    model.counting({ single: 3, elementType: SINGLE, isInput: true });
    const newConfig = model.getConfig();

    expect(callback).toHaveBeenCalled();
    expect(newConfig.isInput).toBe(true);
  });

  test('should set min & max', () => {
    const callback = jest.fn();

    model.subscribe(callback);

    model.counting({ min: 10, max: 20 });
    const newConfig = model.getConfig();

    expect(callback).toHaveBeenCalled();
    expect(newConfig.min).toBe(10);
    expect(newConfig.max).toBe(20);
  });
});

describe('getConfigWithArrayStep', () => {
  afterEach(() => {
    model = new Model(config);
  });

  test('should get configStep', () => {
    model.add(50, STEP);
    model.add(100, MAX);
    const arrayStep = [0, 50, 100];
    const configStep = { ...model.getConfig(), arrayStep };

    expect(model.getConfigWithArrayStep()).toStrictEqual(configStep);
  });
});

describe('checkInitConfigValue', () => {
  afterEach(() => {
    model = new Model(config);
  });

  test('should set initConfig', () => {
    model.checkInitConfigValue();

    expect(model.getConfig()).toStrictEqual(configInit);
  });
});
