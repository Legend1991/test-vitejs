export default class NavigatorSpy {
  log = [];
  invokedCount = 0;

  goToAbout(...args) {
    this.log.push(`[Navigator # goToAbout] args: ${JSON.stringify(args)}`);
    this.invokedCount++;
  }
}