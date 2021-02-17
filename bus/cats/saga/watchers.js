// Core
import { takeEvery, all, call } from 'redux-saga/effects';

// Types
import { types } from '../types';

// Workers
import { loadCats } from './workers/loadCats';

function* watchLoadCats () {
  yield takeEvery(types.LOAD_CATS_ASYNC, loadCats);
}

export function* watchCats () {
  yield all([call(watchLoadCats)]);
}
