export default class Controller {
  constructor(presenter) {
    // eslint-disable-next-line no-constructor-return
    return new Proxy(presenter, {
      get(target, property) {
        const value = Reflect.get(target, property);
        if (typeof value !== 'function') return undefined;
        return value;
      },
    });
  }
}
