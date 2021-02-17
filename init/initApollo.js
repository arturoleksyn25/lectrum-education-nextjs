// Other
import { initializeApollo } from './apollo';
import { verifyEnvironment } from "helpers/verifyEnvironment";
import { serverGraphqlInformationLogger } from "helpers/serverGraphqlInformationLogger";
import { serverGraphqlErrorLogger } from 'helpers/serverGraphqlErrorLogger';


export const initApollo = async (context, executor) => {
  const { isDevelopment } = verifyEnvironment();
  try {
    const apolloClient = initializeApollo({}, context);

    const userAgent = context.req.headers['user-agent'];

    const execute = async (query) => {
      if (isDevelopment) {
        serverGraphqlInformationLogger(query, {
          isStarted: true,
        });
      }

      try {
        const queryResult = await apolloClient.query({
          ...query,
          context: {
            headers: {
              'user-agent': userAgent,
            },
          },
        });

        return queryResult;
      } catch (err) {
        serverGraphqlErrorLogger(query, err, context);
        return undefined;
      } finally {
        if (isDevelopment) {
          serverGraphqlInformationLogger(query, {
            isFinished: true,
          });
        }
      }
    };

    await executor(execute);

    return apolloClient.cache.extract();
  } catch (err) {
    console.log('SOME ERROR', err.message);
    return {}
  }
}