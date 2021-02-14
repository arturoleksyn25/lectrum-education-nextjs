// Core
import { all } from 'redux-saga/effects';

// Workers
import { watchAsteroids } from '../bus/asteroids/saga/watchers';

export function* rootSaga() {
  yield all([watchAsteroids()]);
}
