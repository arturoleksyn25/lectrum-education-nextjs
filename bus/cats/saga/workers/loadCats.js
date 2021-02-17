// Core
import { put, call, delay } from 'redux-saga/effects';

// Instruments
import { catsActions } from '../../actions';
import { verifyBrowser } from "helpers/verifyBrowser";
import { verifyEnvironment } from "helpers/verifyEnvironment";
import { developmentLogger, productionLogger } from "helpers/logger";
import handlePostLog from 'helpers/handlePostLog';

export function* loadCats () {
  const {
    isDevelopment,
    isProduction
  } = verifyEnvironment();
  const isBrowser = verifyBrowser();

  const url = 'https://cat-fact.herokuapp.com/facts';
  const logApiUrl = '/api/logs/rest';
  let status = null;

  try {
    if (isDevelopment) {
      developmentLogger.info(`API GET request to ${url} was started...`);
    }

    const response = yield call(fetch, url);
    status = response.status;

    const results = yield call([response, response.json]);

    if (status !== 200) {
      if (isDevelopment) {
        developmentLogger.warn({
          message: `Current status code is: ${status}`
        });
      }

      if (isProduction) {
        productionLogger.warn({
          url,
          method: 'GET',
          status,
          message: `API Error`
        });
        if (isBrowser) {
          yield handlePostLog(logApiUrl, {
            url,
            method: 'GET',
            status,
            message: `API Error`
          })
        }
      }
    }

    yield delay(2000);
    yield put(catsActions.fillCats(results));
  } catch (error) {
    if (isDevelopment) {
      developmentLogger.warn({
        message: `Current status code is: ${status}`
      });
    }

    if (isProduction) {
      productionLogger.warn({
        url,
        method: 'GET',
        status,
        message: `API Error`
      });
      if (isBrowser) {
        yield handlePostLog(logApiUrl, {
          url,
          method: 'GET',
          status,
          message: `API Error`
        })
      }
    }
  } finally {
    if (isDevelopment) {
      developmentLogger.info(`API GET request to ${url} was finished with status ${status}`);
    }
  }
}
