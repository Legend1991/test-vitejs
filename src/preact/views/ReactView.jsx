import React from 'react';

import Controller from '../../test-vitejs/controller';
import ViewUpdater from '../../test-vitejs/view-updater';

export default class ReactView extends React.Component {
  controller = null;
  model = null;

  #presenter = null;
  #mounted = false;

  constructor(props) {
    super(props);
    this.state = {count: 0};

    console.log('[ReactView # constructor]');

    this.#presenter = props.makePresenter();
    this.controller = new Controller(this.#presenter, this);
    this.model = this.#presenter.viewModel;
    this.#presenter.viewModel = new ViewUpdater(this.#presenter, this);
  }

  componentDidMount() {
    this.#mounted = true;
    console.log('[ReactView # componentDidMount]');
  }

  update() {
    if (this.#mounted) {
      console.log('[ReactView # update] count:', this.state.count);
      this.setState(prevState => ({count: prevState.count + 1}));
    }
  }

  componentWillUnmount() {
    this.#mounted = false;
    console.log('[ReactView # componentWillUnmount]');
  }

  extractUserInput(event) {
    return event?.target?.value;
  }
}