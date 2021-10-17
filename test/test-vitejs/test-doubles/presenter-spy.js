export default class PresenterSpy {
  static STUB_VALUE = 'value';

  value;
  invokeCount = 0;

  constructor() {
    this.value = PresenterSpy.STUB_VALUE;
  }

  async someMethod(value) {
    this.value = value;
    ++this.invokeCount;
  }
}