// Core
import { put, call } from 'redux-saga/effects';

// Instruments
import { asteroidsActions } from '../../actions';

export function* fetchAsteroids () {
  try {
    const response = yield call(fetch, 'http://www.asterank.com/api/asterank?query=%7B%22e%22:%7B%22$lt%22:0.1%7D,%22i%22:%7B%22$lt%22:4%7D,%22a%22:%7B%22$lt%22:1.5%7D%7D&limit=10');

    const results = yield call([response, response.json]);

    if (response.status !== 200) {
      throw new Error(`We can't receive starships 😢`);
    }

    yield put(asteroidsActions.fillAsteroids(results));
  } catch (error) {
    console.log('fetchAsteroidsAsync', error);
  }
}
