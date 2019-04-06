import isFunction from 'lodash/isFunction';
import flow from 'lodash/flow';

function handle401Error(method) {
  return async function (...a) {
    try {
      return await method.apply(this, a);
    } catch (e) {
      if (e.status === 401 && method.name !== 'loginUser') {
        window.location = '/logout';
      }
      throw e;
    }
  };
}

function allowCallbackAsFirstArg(method) {
  return function (...a) {
    const [cb, ...restA] = a;
    if (!isFunction(cb)) return method.apply(this, a);
    if (restA.length || method.length === 0) return method.apply(this, restA).then(cb);
    return async (...apiArgs) => {
      const result = await method.apply(this, apiArgs);
      return await cb(result);
    };
  };
}

export default flow([
  handle401Error,
  allowCallbackAsFirstArg
]);
