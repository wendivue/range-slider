import { EventCallback, IConfig, IConfigWithArrayStep } from 'Helpers/interface';
import { IModel } from 'Ts/Model/IModel';
import { IView } from 'Ts/View/IView';

import { IPresenter } from './IPresenter';

class Presenter implements IPresenter {
  constructor(private model: IModel, private view: IView) {
    this.init();
  }

  public getConfig(): IConfig {
    return this.model.getConfig();
  }

  public subscribe(callback: EventCallback): void {
    this.model.subscribe(callback);
  }

  public unsubscribe(callback: EventCallback): void {
    this.model.unsubscribe(callback);
  }

  private init(): void {
    this.model.initConfigValue();
    this.view.updateView(this.model.getConfigWithArrayStep());

    this.view.subscribe((data: IConfig) => this.model.counting(data));
    this.model.subscribe((data: IConfig) => this.view.setConfig(data));
    this.model.subscribe((data: IConfigWithArrayStep) => this.view.updateView(data));
  }
}

export default Presenter;
