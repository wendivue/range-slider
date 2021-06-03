import { IConfig } from 'Helpers/interface';

interface IPresenter {
  getConfig(): IConfig;
  subscribe(callback: Function): void;
  unsubscribe(callback: Function): void;
}

export { IPresenter };
