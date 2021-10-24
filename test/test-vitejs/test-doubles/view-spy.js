import ViewUpdater from "../../../src/test-vitejs/view-updater.js";

export default class ViewSpy {
  updateCount;

  constructor(presenter) {
  	this.updateCount = 0;
    presenter.viewModel = new ViewUpdater(presenter, this);
  }

  update() {
    ++this.updateCount;
  }
}