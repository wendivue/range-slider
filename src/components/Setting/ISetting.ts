import { IConfig } from 'Helpers/interface';
import { IObservable } from 'Ts/Observable/Observable';

interface ISetting extends IObservable {
  update(config: IConfig): void;
}

export { ISetting };
