import Observable from 'Ts/Observable/Observable';

describe('Observable', () => {
  const observable = new Observable();

  test('add callback', () => {
    const callback = jest.fn();

    observable.subscribe(callback);
    observable.notify({ date: 'notify' });

    expect(callback).toHaveBeenCalledWith({ date: 'notify' });
  });

  test('delete callback', () => {
    const callback = jest.fn();

    observable.subscribe(callback);
    observable.unsubscribe(callback);
    observable.notify({ date: 'notify' });

    expect(callback).not.toHaveBeenCalled();
  });
});
