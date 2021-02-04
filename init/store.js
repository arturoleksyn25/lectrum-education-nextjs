// Core
import { useMemo } from 'react';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  createStore,
  applyMiddleware,
} from 'redux';

// Middleware
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

// Instruments
import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';

let store;

const bindMiddleware = (middleware) => {
  if(process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    middleware.push(
      createLogger({
        duration: true,
        timestamp: true,
        collapsed: true,
        diff: true,
      })
    )
  }

  return composeWithDevTools(applyMiddleware(...middleware));
}

export const initStore = (preloadedState = {}) => {
  const sagaMiddleware = createSagaMiddleware();
  const initedStore = createStore(
    rootReducer,
    preloadedState,
    bindMiddleware([ sagaMiddleware ]),
  );

  initedStore.sagaTask = sagaMiddleware.run(rootSaga);

  return initedStore;
};

export const initializeStore = (preloadedState = {}) => {
  let initializedStore = store || initStore(preloadedState);

  if (preloadedState && store) {
    initializedStore = initStore({
      ...preloadedState,
      ...store.getState(),
    });

    store = undefined;
  }

  if (typeof window === 'undefined') {
    return initializedStore;
  }

  if (!store) {
    store = initializedStore;
  }

  return initializedStore;
};

export const useStore = (initialState = {}) => {
  return useMemo(
    () => initializeStore(initialState), [ initialState ])
};
