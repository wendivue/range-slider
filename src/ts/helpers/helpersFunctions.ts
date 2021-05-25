import { Config } from 'Helpers/interface';

function getUniqueID(): number {
  return Math.floor(Math.random() * Date.now());
}

function checkConfig(options: Config): void {
  const {
    single,
    from,
    to,
    step,
    percentFrom,
    percentTo,
    percentSingle,
    min,
    max,
    type,
    isInput,
    isRange,
    isLabel,
    isVertical,
    isScale,
  } = options;

  if (single === undefined) throw new Error('single - не найдено');
  if (from === undefined) throw new Error('from - не найдено');
  if (to === undefined) throw new Error('to - не найдено');
  if (step === undefined) throw new Error('step - не найдено');
  if (percentFrom === undefined) throw new Error('percentFrom - не найдено');
  if (percentTo === undefined) throw new Error('percentTo - не найдено');
  if (percentSingle === undefined)
    throw new Error('percentSingle - не найдено');
  if (min === undefined) throw new Error('min - не найдено');
  if (max === undefined) throw new Error('max - не найдено');
  if (type === undefined) throw new Error('type - не найдено');
  if (isInput === undefined) throw new Error('isInput - не найдено');
  if (isRange === undefined) throw new Error('isRange - не найдено');
  if (isLabel === undefined) throw new Error('isLabel - не найдено');
  if (isVertical === undefined) throw new Error('isVertical - не найдено');
  if (isScale === undefined) throw new Error('isScale - не найдено');

  if (from > to) throw new Error('from > to');
  if (min > max) throw new Error('min > max');
  if (step < 0.5) throw new Error('step > 0.5');

  if (Number.isNaN(single)) throw new Error('single NaN');
  if (Number.isNaN(from)) throw new Error('from NaN');
  if (Number.isNaN(to)) throw new Error('to NaN');
  if (Number.isNaN(step)) throw new Error('step NaN');
  if (Number.isNaN(percentFrom)) throw new Error('percentFrom NaN');
  if (Number.isNaN(percentTo)) throw new Error('percentTo NaN');
  if (Number.isNaN(percentSingle)) throw new Error('percentSingle NaN');
  if (Number.isNaN(min)) throw new Error('min NaN');
  if (Number.isNaN(max)) throw new Error('max NaN');

  if (typeof isInput !== 'boolean') throw new Error('isInput - не boolean');
  if (typeof isRange !== 'boolean') throw new Error('isRange - не boolean');
  if (typeof isLabel !== 'boolean') throw new Error('isLabel - не boolean');
  if (typeof isVertical !== 'boolean')
    throw new Error('isVertical - не boolean');
  if (typeof isScale !== 'boolean') throw new Error('isScale - не boolean');

  if (type !== 'single' && type !== 'double')
    throw new Error('type - не single | double');
}

export { getUniqueID, checkConfig };
