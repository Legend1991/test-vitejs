export default class Controller {
  constructor (presenter, view) {
    const methodMap = new WeakMap();

    return new Proxy(presenter, {
        get(target, property) {
          const value = Reflect.get(target, property);

          if (typeof value !== 'function')
            return;

          if (methodMap.has(value))
            return methodMap.get(value);

          const newFunc = new Proxy(value, {
            apply(original, thisArg, args) {
              original.call(presenter, view.extractUserInput(...args));
            }
          });

          methodMap.set(value, newFunc);

          return newFunc;
        }
      }
    );
  }
}