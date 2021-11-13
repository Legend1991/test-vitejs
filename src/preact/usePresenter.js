import { useEffect, useState, useMemo } from 'react';

import Controller from '../test-vitejs/controller';
import ViewUpdater from '../test-vitejs/view-updater';

export default function usePresenter({ makePresenter }) {
  const [, setCount] = useState(0);

  const presenter = useMemo(makePresenter, []);
  const model = useMemo(() => presenter.viewModel, []);
  const controller = useMemo(() => new Controller(presenter, {
    extractUserInput: (event) => event?.target?.value,
  }), []);

  useEffect(() => {
    presenter.viewModel = new ViewUpdater(presenter, {
      /**
       *  Ugly but necessary hack to implement a kind of reactivity
       *  between View and viewModel inside Presenter
       */
      update: () => setCount((c) => c + 1),
    });
  }, []);

  return { controller, model };
}
