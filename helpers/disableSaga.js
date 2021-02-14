// Core
import { END } from 'redux-saga';

export const disableSaga = async (store) => {
  const { dispatch } = store;

  dispatch(END);

  await store.sagaTask.toPromise();
};
