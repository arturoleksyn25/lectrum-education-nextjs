// Other
import { initializeApollo } from './apollo';

export const initApollo = async (context, executor) => {
  try {
    const apolloClient = initializeApollo({}, context);

    const userAgent = context.req.headers['user-agent'];

    const execute = async (query) => {
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
        console.log('execute err', err.message);
        return undefined;
      }
    };

    await executor(execute);

    return apolloClient.cache.extract();
  } catch (err) {
    console.log('SOME ERROR', err.message);
    return {}
  }
}