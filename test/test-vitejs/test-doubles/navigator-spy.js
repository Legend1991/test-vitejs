export default class NavigatorSpy {
  log = [];
  invokedCount = 0;

  async goToAbout(...args) {
    this.log.push(`[Navigator # goToAbout] args: ${JSON.stringify(args)}`);
    this.invokedCount++;
  }
}