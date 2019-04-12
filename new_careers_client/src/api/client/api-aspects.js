import isFunction from 'lodash/isFunction';
import flow from 'lodash/flow';
import HttpError from '../http-error';
import tryParse from '../try-parse';

function handleHttpErrors(method) {
  return function (...a) {
    const result = method.apply(this, a);
    if (result && isFunction(result.then)) {
      return result.then((resp) => {
        if (resp.status && (resp.json || resp.text)) {
          if (!resp.ok) {
            if (resp.status === 401 && method.name !== 'loginUser') {
              window.location = '/logout';
              return;
            }
            throw new HttpError(resp.status);
          }
          return resp.text().then(tryParse);
        }
        return resp;
      });
    }
    return result;
  };
}

// function allowCallbackAsFirstArg(method) {
//   return function (...a) {
//     const [cb, ...restA] = a;
//     if (!isFunction(cb)) return method.apply(this, a);
//     if (restA.length || method.length === 0) return method.apply(this, restA).then(cb);
//     return async (...apiArgs) => {
//       const result = await method.apply(this, apiArgs);
//       return await cb(result);
//     };
//   };
// }

export default flow([
  handleHttpErrors,
  // allowCallbackAsFirstArg
]);
