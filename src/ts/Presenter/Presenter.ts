import Constants from 'Helpers/enums';
import { Config } from 'Helpers/interface';
import { IModel } from '../Model/IModel';
import { IView, IUI } from '../View/IView';

const {
  SINGLE,
  FROM,
  TO,
  MIN,
  MAX,
  TYPE,
  INPUT,
  RANGE,
  LABEL,
  STEP,
  PERCENT_FROM,
  PERCENT_TO,
  PERCENT_SINGLE,
  SCALE,
  DOUBLE,
} = Constants;

class Presenter {
  constructor(private model: IModel, private view: IView) {
    this.init();
  }

  public getConfig(): Config {
    return this.model.getConfig();
  }

  public subscribe(callback: Function): void {
    this.model.subscribe(callback);
  }

  public unsubscribe(callback: Function): void {
    this.model.unsubscribe(callback);
  }

  private init(): void {
    if (this.model.get(TYPE) === SINGLE) {
      this.initConfigValue(this.model.get(SINGLE), SINGLE);
    } else {
      this.initConfigValue(this.model.get(FROM), FROM);
      this.initConfigValue(this.model.get(TO), TO);
    }

    this.updateView();

    this.view.subscribe((data: Config) => this.model.counting(data));
    this.model.subscribe((data: Config) => this.view.setConfig(data));
    this.model.subscribe(() => this.updateView());
  }

  private updateView(): void {
    const elementType = this.model.get(TYPE);
    const { handle, bar, scale, label, input, range } = this.view.UI as IUI;

    if (elementType === DOUBLE) {
      handle.moveElement(this.model.get(PERCENT_FROM), FROM);
      handle.moveElement(this.model.get(PERCENT_TO), TO);
    } else if (elementType === SINGLE) {
      handle.moveElement(this.model.get(PERCENT_SINGLE), elementType);
    }

    if (elementType === SINGLE) {
      bar.changeBar(this.model.get(PERCENT_SINGLE));
    } else {
      bar.changeBar(this.model.get(PERCENT_FROM), this.model.get(PERCENT_TO));
    }

    if (this.model.get(LABEL)) {
      if (elementType === SINGLE) {
        label.changeLabelValue(this.model.get(SINGLE).toString());
      } else {
        label.changeLabelValue(
          this.model.get(FROM).toString(),
          this.model.get(TO).toString()
        );
      }
    }

    if (this.model.get(INPUT)) {
      if (elementType === SINGLE) {
        input.changeValue(this.model.get(SINGLE).toString());
      } else {
        input.changeValue(
          this.model.get(FROM).toString(),
          this.model.get(TO).toString()
        );
      }
    }

    if (this.model.get(RANGE)) {
      range.changeValue(
        this.model.get(MIN).toString(),
        this.model.get(MAX).toString()
      );
    }

    if (this.model.get(SCALE)) {
      scale.changeScale(
        this.model.createStep(),
        this.model.get(MIN),
        this.model.get(MAX),
        this.model.get(STEP)
      );
    }
  }

  private initConfigValue(value: number, elementType: Constants): void {
    const percentage: number = this.model.getPercentageInput(value);

    if (elementType === FROM) {
      this.model.add(percentage, PERCENT_FROM);
    } else if (elementType === TO) {
      this.model.add(percentage, PERCENT_TO);
    } else if (elementType === SINGLE) {
      this.model.add(percentage, PERCENT_SINGLE);
    }
  }
}

export default Presenter;
