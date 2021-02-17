// Other
import { developmentLogger } from './logger';

export const serverGraphqlInformationLogger = (query, { isStarted, isFinished }) => {
  const graphQlDocument = query.query;
  const currentGraphQLDocument = graphQlDocument.definitions[0];
  const operation = 'operation' in currentGraphQLDocument ? currentGraphQLDocument.operation : 'unknown graphQl operation';
  const document = 'name' in currentGraphQLDocument ? currentGraphQLDocument.name && currentGraphQLDocument.name.value : 'unknown graphQl document';
  const prefix = (isStarted && 'was started.') || (isFinished && 'was finished.');
  const action = JSON.stringify({document, operation});
  const message = `GraphQL ${operation} ${action} ${prefix}`;

  developmentLogger.log({
    level: 'info',
    message,
  });
};
