export default class ViewUpdater {
  #proxyMap;

  constructor (presenter, view) {
    this.#proxyMap = new WeakMap();
    return this.#makeProxy(presenter.viewModel, view);
  }

  #makeProxy(viewModel, view) {
    const self = this;

    return new Proxy(viewModel, {
      set(target, property, value, receiver) {
        if (Reflect.get(target, property) === value)
          return true;

        const result = Reflect.set(target, property, value, receiver);
        view.update();
        return result;
      },
      get(target, property) {
        const value = Reflect.get(target, property);
        const isObject = typeof value === 'object' && value !== null;

        if (!isObject)
          return value;

        if (self.#proxyMap.has(value))
          return self.#proxyMap.get(value);

        const newProxy = self.#makeProxy(value, view);
        self.#proxyMap.set(value, newProxy);
        return newProxy;
      }
    });
  }
}