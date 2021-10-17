export default class ViewUpdater {
  static bind(presenter, view) {
    presenter.viewModel = new Proxy(presenter.viewModel, {
      set(target, property, value, receiver) {
        console.log(`[ViewUpdater # set] value: '${value}'`);

        if (Reflect.get(target, property) === value)
          return true;

        const r = Reflect.set(target, property, value, receiver);
        view.update();
        return r;
      }
    });
  }
}