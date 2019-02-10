export const  mqtt = (client) => {
    return ({ dispatch, getState }) => {
      return next => (action) => {
        if (typeof action === 'function') {
          return action(dispatch, getState);
        }
  
        const { promise, ...rest } = action;
        if (!promise) {
          return next(action);
        }
  
        next({ ...rest });
  
        const actionPromise = promise(client, dispatch);
        actionPromise.then(
          result => next({ ...rest, result }),
          error => next({ ...rest, error }),
        ).catch((error) => {
          console.error('CUSTOM MIDDLEWARE ERROR:', error);
          next({ ...rest, error });
        });
  
        return actionPromise;
      };
    };
}
