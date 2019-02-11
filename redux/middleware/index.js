const  mqttMiddleware = (client) => {
    return ({ dispatch, getState }) => {
      return next => (action) => {
        if (typeof action === 'function') {
          return action(dispatch, getState);
        }else if( typeof action === 'object' && action.mqtt !== undefined ){
            return action.mqtt(client, dispatch, getState)
        }
        return next(action);
      };
    };
}

export default mqttMiddleware;