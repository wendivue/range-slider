import { EventCallback } from 'Helpers/interface';

export interface IObservable {
  subscribe(cb: Function): void;
  unsubscribe(cb: Function): void;
  notify(data: { [k: string]: unknown }): void;
}

class Observable implements IObservable {
  private observers: EventCallback[] = [];

  public subscribe(cb: EventCallback): void {
    this.observers.push(cb);
  }

  public unsubscribe(cb: EventCallback): void {
    this.observers = this.observers.filter((observer) => observer !== cb);
  }

  public notify(data: { [k: string]: unknown }): void {
    this.observers.forEach((observer) => observer(data));
  }
}

export default Observable;
