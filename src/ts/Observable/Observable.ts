export interface IObservable {
  subscribe(cb: Function): void;
  unsubscribe(cb: Function): void;
  notify(data: { [k: string]: unknown }): void;
}

class Observable implements IObservable {
  private observers: Function[] = [];

  public subscribe(cb: Function): void {
    this.observers.push(cb);
  }

  public unsubscribe(cb: Function): void {
    this.observers = this.observers.filter((observer) => observer !== cb);
  }

  public notify(data: { [k: string]: unknown }): void {
    this.observers.forEach((observer) => observer(data));
  }
}

export default Observable;
