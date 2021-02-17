// Core
import { parseCookies } from 'nookies';

// Other
import { developmentLogger, productionLogger } from './logger';
import { verifyEnvironment } from './verifyEnvironment';

export const serverGraphqlErrorLogger = (query, err, context) => {
  const { isDevelopment } = verifyEnvironment();
  const graphQlDocument = query.query;
  const currentGraphQLDocument = graphQlDocument.definitions[0];
  const operation = 'operation' in currentGraphQLDocument ? currentGraphQLDocument.operation : 'unknown graphQl operation';
  const document = 'name' in currentGraphQLDocument ? currentGraphQLDocument.name && currentGraphQLDocument.name.value : 'unknown graphQl document';
  const message = `GraphQL SSR ${operation}`;

  const responseCode = err.networkError && 'statusCode' in err.networkError
    && err.networkError.statusCode;

  const responseMessage = err.networkError && 'result' in err.networkError
    && err.networkError.result.message;

  const networkErrorType = err.networkError && 'Network Error';
  const graphQlErrorType = Array.isArray(err.graphQLErrors) && err.graphQLErrors.length > 0 && 'GraphQL Error';
  const errorType = networkErrorType || graphQlErrorType;

  const loggerData = new Map();

  loggerData.set('level', 'error');
  loggerData.set('type', errorType);
  loggerData.set('document', document);
  loggerData.set('operation', operation);

  if (responseCode) {
    loggerData.set('responseCode', responseCode);
  }

  if (responseMessage) {
    loggerData.set('responseMessage', responseMessage);
  }

  if (isDevelopment) {
    loggerData.set('message', message);

    const transformedLoggerData = Object.fromEntries(loggerData);

    developmentLogger.log(transformedLoggerData);
  } else {
    const fullMessage = err instanceof Error ? err.message : 'unfortunately we don\'t have a message for this error';
    const stack = err instanceof Error && err.stack;

    loggerData.set('name', `GraphQL SSR ${operation} ${errorType}`);
    loggerData.set('message', fullMessage);
    loggerData.set('producer', 'SSR Server');

    if (stack) {
      loggerData.set('stack', stack);
    }

    if (graphQlErrorType) {
      const graphQlQuery = query.query && query.query.loc.source && query.query.loc.source.body;
      const graphQLValidationsErrors = err.graphQLErrors
        && err.graphQLErrors.length > 0
        && JSON.stringify(err.graphQLErrors);

      if (graphQlQuery) {
        loggerData.set('body', graphQlQuery);
      }

      if (graphQLValidationsErrors) {
        loggerData.set('graphQLValidationsErrors', graphQLValidationsErrors);
      }

      const transformedLoggerData = Object.fromEntries(loggerData);

      productionLogger.log(transformedLoggerData);
    } else if (networkErrorType && context) {
      const cfRequestId = context.req.headers['cf-request-id'];
      const variables = JSON.stringify(query.variables);

      const cookies = parseCookies(context);
      const JWT = cookies['x-jwt-token'];

      if (variables) {
        loggerData.set('variables', variables);
      }

      if (cfRequestId) {
        loggerData.set('cfRequestId', cfRequestId);
      }

      if (JWT) {
        loggerData.set('JWT', JWT);
      }

      const transformedLoggerData = Object.fromEntries(loggerData);

      productionLogger.log(transformedLoggerData);
    }
  }
};
