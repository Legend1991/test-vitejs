import ViewUpdater from "../../../src/test-vitejs/view-updater.js";

export default class ViewSpy {
  static ANOTHER_EVENT = {target: {value: 'another value'}};
  static STUB_EVENT = {target: {value: 'new value'}};

  presenter;
  mappedValue = null;
  updateCount = 0;

  constructor(presenter) {
    this.presenter = new ViewUpdater(presenter, this);
  }

  update() {
    ++this.updateCount;
    this.render();
  }

  extractValue(event) {
    return event?.target?.value;
  }

  render() {
    this.mappedValue = this.presenter.value;
  }

  async fireUserInput(event) {
    return this.presenter.someMethod(event);
  }
}