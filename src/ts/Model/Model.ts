import { Config } from '../helpers/interface';

class Model {
  public config: Config;
  public options: Config;

  constructor(options: Config) {
    this.config = options;
  }

  public add(value: Record<string, any>, prop: string): void {
    const obj = this.config;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (key === prop) value = { [key]: value };
      }
    }

    this.config = { ...this.config, ...value };
  }

  public get(prop: string): number {
    const obj: any = this.config;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (key === prop) return obj[key];
      }
    }
  }
}

export default Model;
