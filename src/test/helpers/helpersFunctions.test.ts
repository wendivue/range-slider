import { checkConfig } from 'Helpers/helpersFunctions';

const config: any = {
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

describe('Checks config undefined', () => {
  afterEach(() => {
    config.single = 20;
    config.from = 20;
    config.to = 50;
    config.step = 1;
    config.percentFrom = 0;
    config.percentTo = 0;
    config.percentSingle = 0;
    config.min = 0;
    config.max = 1000;
    config.type = 'double';
    config.isInput = true;
    config.isRange = true;
    config.isLabel = true;
    config.isVertical = false;
    config.isScale = false;
  });

  test('single undefined', () => {
    config.single = undefined;
    const options = () => checkConfig(config);

    expect(options).toThrow(Error);
    expect(options).toThrow('single - не найдено');
  });

  test('from undefined', () => {
    config.from = undefined;
    const options = () => checkConfig(config);

    expect(options).toThrow(Error);
    expect(options).toThrow('from - не найдено');
  });

  test('to undefined', () => {
    config.to = undefined;
    const options = () => checkConfig(config);

    expect(options).toThrow(Error);
    expect(options).toThrow('to - не найдено');
  });

  test('step undefined', () => {
    config.step = undefined;
    const options = () => checkConfig(config);

    expect(options).toThrow(Error);
    expect(options).toThrow('step - не найдено');
  });

  test('percentFrom undefined', () => {
    config.percentFrom = undefined;
    const options = () => checkConfig(config);

    expect(options).toThrow(Error);
    expect(options).toThrow('percentFrom - не найдено');
  });

  test('percentTo undefined', () => {
    config.percentTo = undefined;
    const options = () => checkConfig(config);

    expect(options).toThrow(Error);
    expect(options).toThrow('percentTo - не найдено');
  });

  test('percentSingle undefined', () => {
    config.percentSingle = undefined;
    const options = () => checkConfig(config);

    expect(options).toThrow(Error);
    expect(options).toThrow('percentSingle - не найдено');
  });

  test('min undefined', () => {
    config.min = undefined;
    const options = () => checkConfig(config);

    expect(options).toThrow(Error);
    expect(options).toThrow('min - не найдено');
  });

  test('max undefined', () => {
    config.max = undefined;
    const options = () => checkConfig(config);

    expect(options).toThrow(Error);
    expect(options).toThrow('max - не найдено');
  });

  test('type undefined', () => {
    config.type = undefined;
    const options = () => checkConfig(config);

    expect(options).toThrow(Error);
    expect(options).toThrow('type - не найдено');
  });

  test('isInput undefined', () => {
    config.isInput = undefined;
    const options = () => checkConfig(config);

    expect(options).toThrow(Error);
    expect(options).toThrow('isInput - не найдено');
  });

  test('isRange undefined', () => {
    config.isRange = undefined;
    const options = () => checkConfig(config);

    expect(options).toThrow(Error);
    expect(options).toThrow('isRange - не найдено');
  });

  test('isLabel undefined', () => {
    config.isLabel = undefined;
    const options = () => checkConfig(config);

    expect(options).toThrow(Error);
    expect(options).toThrow('isLabel - не найдено');
  });

  test('isVertical undefined', () => {
    config.isVertical = undefined;
    const options = () => checkConfig(config);

    expect(options).toThrow(Error);
    expect(options).toThrow('isVertical - не найдено');
  });

  test('isScale undefined', () => {
    config.isScale = undefined;
    const options = () => checkConfig(config);

    expect(options).toThrow(Error);
    expect(options).toThrow('isScale - не найдено');
  });

  test('isScale undefined', () => {
    config.isScale = undefined;
    const options = () => checkConfig(config);

    expect(options).toThrow(Error);
    expect(options).toThrow('isScale - не найдено');
  });

  test('single NaN', () => {
    config.single = NaN;
    const options = () => checkConfig(config);

    expect(options).toThrow(Error);
    expect(options).toThrow('single NaN');
  });

  test('from NaN', () => {
    config.from = NaN;
    const options = () => checkConfig(config);

    expect(options).toThrow(Error);
    expect(options).toThrow('from NaN');
  });

  test('to NaN', () => {
    config.to = NaN;
    const options = () => checkConfig(config);

    expect(options).toThrow(Error);
    expect(options).toThrow('to NaN');
  });

  test('step NaN', () => {
    config.step = NaN;
    const options = () => checkConfig(config);

    expect(options).toThrow(Error);
    expect(options).toThrow('step NaN');
  });

  test('percentFrom NaN', () => {
    config.percentFrom = NaN;
    const options = () => checkConfig(config);

    expect(options).toThrow(Error);
    expect(options).toThrow('percentFrom NaN');
  });

  test('percentTo NaN', () => {
    config.percentTo = NaN;
    const options = () => checkConfig(config);

    expect(options).toThrow(Error);
    expect(options).toThrow('percentTo NaN');
  });

  test('percentSingle NaN', () => {
    config.percentSingle = NaN;
    const options = () => checkConfig(config);

    expect(options).toThrow(Error);
    expect(options).toThrow('percentSingle NaN');
  });

  test('min NaN', () => {
    config.min = NaN;
    const options = () => checkConfig(config);

    expect(options).toThrow(Error);
    expect(options).toThrow('min NaN');
  });

  test('max NaN', () => {
    config.max = NaN;
    const options = () => checkConfig(config);

    expect(options).toThrow(Error);
    expect(options).toThrow('max NaN');
  });

  test('isInput - не boolean', () => {
    config.isInput = '12';
    const options = () => checkConfig(config);

    expect(options).toThrow(Error);
    expect(options).toThrow('isInput - не boolean');
  });

  test('isRange - не boolean', () => {
    config.isRange = '12';
    const options = () => checkConfig(config);

    expect(options).toThrow(Error);
    expect(options).toThrow('isRange - не boolean');
  });

  test('isLabel - не boolean', () => {
    config.isLabel = '12';
    const options = () => checkConfig(config);

    expect(options).toThrow(Error);
    expect(options).toThrow('isLabel - не boolean');
  });

  test('isVertical - не boolean', () => {
    config.isVertical = '12';
    const options = () => checkConfig(config);

    expect(options).toThrow(Error);
    expect(options).toThrow('isVertical - не boolean');
  });

  test('isScale - не boolean', () => {
    config.isScale = '12';
    const options = () => checkConfig(config);

    expect(options).toThrow(Error);
    expect(options).toThrow('isScale - не boolean');
  });
});
