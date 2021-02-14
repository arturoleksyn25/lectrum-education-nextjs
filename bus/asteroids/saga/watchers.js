// Core
import { takeEvery, all, call } from 'redux-saga/effects';

// Types
import { types } from '../types';

// Workers
import { fetchAsteroids } from './workers/fetchAsteroids';

function* watchFetchAsteroids () {
  yield takeEvery(types.FETCH_ASTEROIDS_ASYNC, fetchAsteroids);
}

export function* watchAsteroids () {
  yield all([call(watchFetchAsteroids)]);
}
