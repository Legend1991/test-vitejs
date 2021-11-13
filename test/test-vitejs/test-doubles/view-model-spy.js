export default class ViewModelSpy {
  log = [];

  constructor(log) {
    this.log = log;
  }

  track(presenter) {
    const { log } = this;

    presenter.viewModel = new Proxy(presenter.viewModel, {
      set(target, property, value, receiver) {
        const v = typeof value === 'string'
          ? `"${value}"` : value;
        log.push(`[ViewModel # ${property}] set: ${v}`);
        return Reflect.set(target, property, value, receiver);
      },
    });
  }
}
