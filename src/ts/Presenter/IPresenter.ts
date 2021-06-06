import { EventCallback, IConfig } from 'Helpers/interface';

interface IPresenter {
  getConfig(): IConfig;
  subscribe(callback: EventCallback): void;
  unsubscribe(callback: EventCallback): void;
}

export { IPresenter };
